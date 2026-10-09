/**
 * WytNet / WytPass Centralized Identity Client SDK
 * 
 * Production-ready authentication client for WytQR SPA.
 * Fully decoupled from local passwords & credential storage.
 * All authentication, registration, recovery, and sessions are centrally managed by WytNet.
 * 
 * Security Guard: client_secret is NEVER present or referenced here.
 */

const LOCAL_SESSION_KEY = 'wyt_user_profile_v2';

export const WYTPASS_CONFIG = {
  clientId: 'wn_live_545c7e67e86bafa230422c78ce15194a',
  authUrl: 'https://wytnet.com/oauth/authorize',
  fallbackAuthUrl: 'https://wytnet.com/oauth/authorize',
  redirectUri: 'http://localhost:3000/api/auth/callback/whitenet',
  scope: 'openid profile email'
};

// ============================================================================
// PKCE (RFC 7636) Cryptographic Utilities using Browser Web Crypto API
// ============================================================================

/**
 * Generates high-entropy cryptographic code verifier
 */
function generateCodeVerifier(length = 64) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  let verifier = '';
  for (let i = 0; i < length; i++) {
    verifier += possible[randomValues[i] % possible.length];
  }
  return verifier;
}

/**
 * Generates S256 Code Challenge from Code Verifier: BASE64URL(SHA256(verifier))
 */
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  // Base64URL encoding
  let str = '';
  const bytes = new Uint8Array(digest);
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Random state generator for CSRF mitigation
 */
function generateRandomState() {
  const randomValues = new Uint8Array(16);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues, b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// AuthManager Class
// ============================================================================

export class AuthManager {
  constructor() {
    this.user = this.loadCachedUser();
    this.listeners = new Set();
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChanged(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.user);
      } catch (e) {
        console.error('Error in auth state listener:', e);
      }
    }
  }

  loadCachedUser() {
    try {
      const data = localStorage.getItem(LOCAL_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  saveCachedUser(user) {
    this.user = user;
    try {
      if (user) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_SESSION_KEY);
      }
    } catch (e) {
      console.warn('Failed to cache user session:', e);
    }
    this.notifyListeners();
  }

  isLoggedIn() {
    return !!(this.user && this.user.sub);
  }

  getUser() {
    return this.user;
  }

  getUserSub() {
    return this.user ? this.user.sub : null;
  }

  /**
   * Validate and hydrate user session from backend HttpOnly cookies
   */
  async checkSession() {
    try {
      const res = await fetch('/api/auth/session', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          this.saveCachedUser(data.user);
          return data.user;
        }
      }
      
      // If server reports not authenticated, clear local cache
      this.saveCachedUser(null);
      return null;
    } catch (err) {
      console.warn('Session verification check failed:', err);
      // Retain existing cached user temporarily in case of offline/network hiccup
      return this.user;
    }
  }

  /**
   * FLOW A: Direct Email + Password Authentication
   * Forwards credentials to backend which delegates verification to WytNet Auth-Layer
   */
  async loginWithEmail(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many authentication attempts. Please wait a moment and try again.');
        }
        throw new Error(data.error || data.detail || 'Authentication failed. Please verify your credentials.');
      }

      this.saveCachedUser(data.user);
      return data.user;
    } catch (err) {
      console.error('Email login error:', err);
      throw err;
    }
  }

  /**
   * FLOW B: "Continue with WytPass" (OAuth 2.0 / OIDC + PKCE)
   * Generates PKCE code challenge and redirects user to WytNet Centralized Authorize URL
   */
  async loginWithWytPass() {
    try {
      const codeVerifier = generateCodeVerifier(64);
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateRandomState();

      // Persist code verifier and state in session storage and cookie for callback verification
      sessionStorage.setItem('wyt_pkce_verifier', codeVerifier);
      sessionStorage.setItem('wyt_oauth_state', state);

      // Also set verifier cookie so backend callback handler (/api/auth/callback/whitenet) has it
      document.cookie = `wyt_pkce_verifier=${encodeURIComponent(codeVerifier)}; path=/; max-age=600; SameSite=Lax`;
      document.cookie = `wyt_oauth_state=${encodeURIComponent(state)}; path=/; max-age=600; SameSite=Lax`;

      const params = new URLSearchParams({
        client_id: WYTPASS_CONFIG.clientId,
        redirect_uri: WYTPASS_CONFIG.redirectUri,
        response_type: 'code',
        scope: WYTPASS_CONFIG.scope,
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      });

      const authorizeUrl = `${WYTPASS_CONFIG.authUrl}?${params.toString()}`;
      window.location.href = authorizeUrl;
    } catch (err) {
      console.error('Failed to initiate WytPass PKCE flow:', err);
      throw err;
    }
  }

  /**
   * USER REGISTRATION: Delegate account creation to WytNet
   */
  async register({ name, email, password, phone }) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, phone })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many registration attempts. Please try again shortly.');
        }
        throw new Error(data.error || data.detail || 'Registration failed. Please check your details.');
      }

      if (data.user) {
        this.saveCachedUser(data.user);
      }

      return data;
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  }

  /**
   * FORGOT PASSWORD: Request password reset link / token from WytNet
   */
  async forgotPassword(email) {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment before trying again.');
        }
        throw new Error(data.error || data.detail || 'Unable to process password reset request.');
      }

      return data;
    } catch (err) {
      console.error('Forgot password error:', err);
      throw err;
    }
  }

  /**
   * RESET PASSWORD: Confirm new password with reset token on WytNet
   */
  async resetPassword({ token, new_password, confirm_password }) {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token, new_password, confirm_password })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again shortly.');
        }
        throw new Error(data.error || data.detail || 'Password reset failed. Invalid or expired token.');
      }

      return data;
    } catch (err) {
      console.error('Reset password error:', err);
      throw err;
    }
  }

  /**
   * REFRESH TOKEN: Manually refresh tokens via backend
   */
  async refreshToken() {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * LOGOUT: Revoke tokens on WytNet & clear HttpOnly cookies + local cache
   */
  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.warn('Logout network call error:', err);
    } finally {
      this.saveCachedUser(null);
      sessionStorage.removeItem('wyt_pkce_verifier');
      sessionStorage.removeItem('wyt_oauth_state');
    }
  }
}
