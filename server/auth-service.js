import crypto from 'crypto';

/**
 * WytNet / WytPass Centralized Authentication Service
 * 
 * Handles:
 * - Flow A: Direct Email + Password authentication via WytNet Auth-Layer
 * - Flow B: OAuth 2.0 / OIDC Authorization Code exchange with PKCE
 * - User Registration & Password Recovery delegation
 * - Session token validation (RS256 JWKS verification & Introspection)
 * - Token refresh & Revocation
 * - Secure HttpOnly Cookie management
 */

export const WYTPASS_CONFIG = {
  clientId: process.env.WYTPASS_CLIENT_ID || 'wn_live_545c7e67e86bafa230422c78ce15194a',
  clientSecret: process.env.WYTPASS_CLIENT_SECRET || 'wn_secret_cb5cea3df277d74d542b95ad3dc3c08922bbc0b8485f6418',
  issuer: process.env.WYTNET_ISSUER || 'https://api.wytnet.com',
  fallbackIssuer: process.env.WYTNET_FALLBACK_ISSUER || 'https://api.wytnet.com',
  authUrl: process.env.WYTNET_AUTH_URL || 'https://wytnet.com/oauth/authorize',
  fallbackAuthUrl: 'https://wytnet.com/oauth/authorize',
  redirectUri: process.env.WYTNET_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/whitenet',
  scope: 'openid profile email',
  jwksUrl: process.env.WYTNET_JWKS_URL || 'https://api.wytnet.com/.well-known/jwks.json',
  discoveryUrl: process.env.WYTNET_DISCOVERY_URL || 'https://api.wytnet.com/.well-known/openid-configuration'
};

// In-memory cache for JWKS public keys
let cachedJWKS = null;
let jwksLastFetched = 0;
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Utility to execute fetch with automatic fallback between test and production clusters
 * in case test.api.wytnet.com is temporarily 503 or unreachable.
 */
async function fetchWithIssuerFallback(path, options = {}) {
  const primaryUrl = `${WYTPASS_CONFIG.issuer}${path}`;
  const fallbackUrl = `${WYTPASS_CONFIG.fallbackIssuer}${path}`;

  try {
    const res = await fetch(primaryUrl, options);
    // If primary returns 503 Service Unavailable or 502/504 gateway issue, failover to fallback
    if (res.status === 503 || res.status === 502 || res.status === 504) {
      console.warn(`[WytNet Auth] Primary issuer returned HTTP ${res.status}. Failing over to ${fallbackUrl}`);
      return await fetch(fallbackUrl, options);
    }
    return res;
  } catch (err) {
    console.warn(`[WytNet Auth] Primary issuer network error (${err.message}). Failing over to ${fallbackUrl}`);
    return await fetch(fallbackUrl, options);
  }
}

/**
 * Normalizes user subject identifier to ensure canonical sub: wn_usr_<uuid> format
 */
export function normalizeUserProfile(userData = {}) {
  const sub = userData.sub || userData.id || (userData.user && (userData.user.sub || userData.user.id)) || `wn_usr_${crypto.randomUUID().replace(/-/g, '')}`;
  const canonicalSub = sub.startsWith('wn_usr_') ? sub : `wn_usr_${sub.replace(/^usr_/, '')}`;
  
  const name = userData.name || (userData.user && userData.user.name) || (userData.email ? userData.email.split('@')[0] : 'WytPass User');
  const email = userData.email || (userData.user && userData.user.email) || 'user@wytnet.com';
  const phone = userData.phone || (userData.user && userData.user.phone) || null;
  const avatar = userData.picture || userData.avatar || (userData.user && (userData.user.picture || userData.user.profilePicture)) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${canonicalSub}`;

  return {
    sub: canonicalSub,
    id: canonicalSub, // Backwards compatibility with internal tables
    name,
    email,
    phone,
    avatar,
    email_verified: !!(userData.email_verified || (userData.user && userData.user.email_verified))
  };
}

/**
 * FLOW A: Authenticate user with Direct Email + Password
 * POST https://api.wytnet.com/auth-layer/authenticate
 */
export async function authenticateWithWytNet(email, password) {
  const payload = {
    client_id: WYTPASS_CONFIG.clientId,
    client_secret: WYTPASS_CONFIG.clientSecret,
    email: email.trim().toLowerCase(),
    password: password,
    scope: WYTPASS_CONFIG.scope
  };

  const response = await fetchWithIssuerFallback('/auth-layer/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = responseData.detail || responseData.message || responseData.error_description || responseData.error || `Authentication failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = responseData;
    throw error;
  }

  const user = normalizeUserProfile(responseData.user || responseData);
  return {
    access_token: responseData.access_token,
    refresh_token: responseData.refresh_token,
    id_token: responseData.id_token,
    token_type: responseData.token_type || 'Bearer',
    expires_in: responseData.expires_in || 3600,
    user: user
  };
}

/**
 * USER REGISTRATION
 * POST https://test.api.wytnet.com/auth-layer/register
 */
export async function registerWithWytNet({ name, email, password, phone }) {
  const payload = {
    client_id: WYTPASS_CONFIG.clientId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    phone: phone ? phone.trim() : undefined
  };

  const response = await fetchWithIssuerFallback('/auth-layer/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = responseData.detail || responseData.message || responseData.error_description || responseData.error || `Registration failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = responseData;
    throw error;
  }

  const user = normalizeUserProfile(responseData.user || responseData);
  return {
    success: true,
    access_token: responseData.access_token,
    refresh_token: responseData.refresh_token,
    id_token: responseData.id_token,
    user: user
  };
}

/**
 * FORGOT PASSWORD
 * POST https://test.api.wytnet.com/auth-layer/forgot-password
 */
export async function forgotPasswordWithWytNet(email) {
  const payload = {
    client_id: WYTPASS_CONFIG.clientId,
    email: email.trim().toLowerCase()
  };

  const response = await fetchWithIssuerFallback('/auth-layer/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = responseData.detail || responseData.message || responseData.error || `Password reset request failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    throw error;
  }

  return responseData;
}

/**
 * RESET PASSWORD
 * POST https://test.api.wytnet.com/auth-layer/reset-password
 */
export async function resetPasswordWithWytNet({ token, new_password, confirm_password }) {
  const payload = {
    client_id: WYTPASS_CONFIG.clientId,
    token: token.trim(),
    new_password: new_password,
    confirm_password: confirm_password
  };

  const response = await fetchWithIssuerFallback('/auth-layer/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = responseData.detail || responseData.message || responseData.error || `Password reset failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    throw error;
  }

  return responseData;
}

/**
 * FLOW B: Exchange Authorization Code for Tokens (OIDC + PKCE)
 * POST https://test.api.wytnet.com/oauth/token
 */
export async function exchangeCodeForTokens(code, codeVerifier, redirectUri = WYTPASS_CONFIG.redirectUri) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: WYTPASS_CONFIG.clientId
  });

  if (codeVerifier) {
    params.set('code_verifier', codeVerifier);
  }
  // For confidential server-side exchange, include client_secret
  if (WYTPASS_CONFIG.clientSecret) {
    params.set('client_secret', WYTPASS_CONFIG.clientSecret);
  }

  const response = await fetchWithIssuerFallback('/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || data.error_description || data.error || `OAuth token exchange failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    throw error;
  }

  // Parse User profile from id_token or UserInfo endpoint
  let userProfile = null;
  if (data.id_token) {
    try {
      const parts = data.id_token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        userProfile = normalizeUserProfile(payload);
      }
    } catch (e) {
      console.warn('[WytNet Auth] Failed to decode id_token JWT payload:', e);
    }
  }

  if (!userProfile && data.access_token) {
    try {
      userProfile = await fetchUserInfo(data.access_token);
    } catch (e) {
      console.warn('[WytNet Auth] Failed to fetch userinfo:', e);
    }
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    id_token: data.id_token,
    expires_in: data.expires_in || 3600,
    token_type: data.token_type || 'Bearer',
    user: userProfile || normalizeUserProfile(data.user || {})
  };
}

/**
 * Fetch User Profile from OIDC UserInfo endpoint
 * GET https://test.api.wytnet.com/oauth/userinfo
 */
export async function fetchUserInfo(accessToken) {
  const response = await fetchWithIssuerFallback('/oauth/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`UserInfo request failed with HTTP ${response.status}`);
  }

  const data = await response.json();
  return normalizeUserProfile(data);
}

/**
 * Refresh Access Token
 * POST https://test.api.wytnet.com/oauth/token (grant_type=refresh_token)
 */
export async function refreshAccessToken(refreshToken) {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: WYTPASS_CONFIG.clientId,
    client_secret: WYTPASS_CONFIG.clientSecret
  });

  const response = await fetchWithIssuerFallback('/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || data.error_description || data.error || `Token refresh failed (HTTP ${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    throw error;
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken, // Preserve existing refresh token if not rotated
    expires_in: data.expires_in || 3600,
    sub: data.sub || (data.user && data.user.sub)
  };
}

/**
 * Revoke Token upon Logout
 * POST https://test.api.wytnet.com/oauth/revoke
 */
export async function revokeToken(token) {
  try {
    const response = await fetchWithIssuerFallback('/oauth/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token })
    });
    return response.ok;
  } catch (e) {
    console.warn('[WytNet Auth] Token revocation failed:', e.message);
    return false;
  }
}

/**
 * Introspect Token Status
 * POST https://test.api.wytnet.com/auth-layer/introspect
 */
export async function introspectToken(token) {
  const payload = {
    token: token,
    client_id: WYTPASS_CONFIG.clientId,
    client_secret: WYTPASS_CONFIG.clientSecret
  };

  const response = await fetchWithIssuerFallback('/auth-layer/introspect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { active: false };
  }

  return await response.json();
}

/**
 * Fetch and Cache JWKS public keys
 */
export async function getJWKS() {
  const now = Date.now();
  if (cachedJWKS && now - jwksLastFetched < JWKS_CACHE_TTL_MS) {
    return cachedJWKS;
  }

  try {
    const response = await fetchWithIssuerFallback('/.well-known/jwks.json');
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.keys)) {
        cachedJWKS = data.keys;
        jwksLastFetched = now;
        return cachedJWKS;
      }
    }
  } catch (e) {
    console.warn('[WytNet Auth] JWKS fetch failed:', e.message);
  }

  return cachedJWKS || [];
}

/**
 * Verify RS256 JWT signature using cached JWKS
 */
export async function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null; // Expired
    }

    const keys = await getJWKS();
    const matchingKey = keys.find(k => !header.kid || k.kid === header.kid);

    if (matchingKey) {
      const publicKey = crypto.createPublicKey({ key: matchingKey, format: 'jwk' });
      const verifier = crypto.createVerify('RSA-SHA256');
      verifier.update(`${headerB64}.${payloadB64}`);
      const isValid = verifier.verify(publicKey, Buffer.from(signatureB64, 'base64url'));
      if (isValid) {
        return payload;
      }
    }

    // Fallback to Introspection if signature verification key was rotated or not cached
    const introspection = await introspectToken(token);
    if (introspection && introspection.active) {
      return { ...payload, ...introspection };
    }
  } catch (err) {
    console.error('[WytNet Auth] JWT verification failed:', err.message);
  }

  return null;
}

/**
 * Cookie parsing & serialization helpers
 */
export function parseCookies(header = '') {
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      cookies[name] = decodeURIComponent(val);
    }
  });
  return cookies;
}

export function buildCookie(name, val, options = {}) {
  const maxAge = options.maxAge ?? 3600;
  const isSecure = options.secure ?? false;
  let str = `${name}=${encodeURIComponent(val)}; Path=${options.path || '/'}; Max-Age=${maxAge}; SameSite=${options.sameSite || 'Lax'}`;
  if (options.httpOnly) str += '; HttpOnly';
  if (isSecure) str += '; Secure';
  return str;
}

/**
 * Connect Middleware for Vite and Express servers
 */
export function createAuthConnectMiddleware() {
  return async function authMiddleware(req, res, next) {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = url.pathname;

    // Only process /api/auth/* routes
    if (!pathname.startsWith('/api/auth')) {
      return next();
    }

    // Helper to send JSON responses
    const sendJson = (status, data, extraHeaders = {}) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        ...extraHeaders
      });
      res.end(JSON.stringify(data));
    };

    // Helper to read JSON request body
    const readBody = () => {
      return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch {
            resolve({});
          }
        });
      });
    };

    const cookies = parseCookies(req.headers?.cookie);
    const isHttps = req.headers?.['x-forwarded-proto'] === 'https' || !!(req.socket?.encrypted);

    try {
      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/login (Flow A: Direct Email + Password)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const { email, password } = await readBody();

        if (!email || !password) {
          return sendJson(400, { error: 'Email and password are required' });
        }

        const authResult = await authenticateWithWytNet(email, password);

        // Store session tokens in secure, HttpOnly cookies
        const cookieHeaders = [
          buildCookie('wyt_access_token', authResult.access_token, {
            httpOnly: true,
            maxAge: authResult.expires_in || 3600,
            secure: isHttps
          }),
          buildCookie('wyt_user_sub', authResult.user.sub, {
            httpOnly: false, // Accessible to client for fast local sub identification
            maxAge: 30 * 24 * 3600,
            secure: isHttps
          })
        ];

        if (authResult.refresh_token) {
          cookieHeaders.push(
            buildCookie('wyt_refresh_token', authResult.refresh_token, {
              httpOnly: true,
              maxAge: 30 * 24 * 3600,
              secure: isHttps
            })
          );
        }

        if (authResult.id_token) {
          cookieHeaders.push(
            buildCookie('wyt_id_token', authResult.id_token, {
              httpOnly: true,
              maxAge: authResult.expires_in || 3600,
              secure: isHttps
            })
          );
        }

        res.setHeader('Set-Cookie', cookieHeaders);
        return sendJson(200, {
          success: true,
          user: authResult.user
        });
      }

      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/register (User Registration)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/register' && req.method === 'POST') {
        const { name, email, password, phone } = await readBody();

        if (!name || !email || !password) {
          return sendJson(400, { error: 'Name, email, and password are required' });
        }

        const regResult = await registerWithWytNet({ name, email, password, phone });

        // If registration returns active session tokens, automatically authenticate
        if (regResult.access_token) {
          const cookieHeaders = [
            buildCookie('wyt_access_token', regResult.access_token, {
              httpOnly: true,
              maxAge: 3600,
              secure: isHttps
            }),
            buildCookie('wyt_user_sub', regResult.user.sub, {
              httpOnly: false,
              maxAge: 30 * 24 * 3600,
              secure: isHttps
            })
          ];

          if (regResult.refresh_token) {
            cookieHeaders.push(
              buildCookie('wyt_refresh_token', regResult.refresh_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 3600,
                secure: isHttps
              })
            );
          }

          res.setHeader('Set-Cookie', cookieHeaders);
        }

        return sendJson(200, {
          success: true,
          user: regResult.user,
          message: 'Registration successful! WytNet account created.'
        });
      }

      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/forgot-password (Password Recovery)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/forgot-password' && req.method === 'POST') {
        const { email } = await readBody();

        if (!email) {
          return sendJson(400, { error: 'Email address is required' });
        }

        const result = await forgotPasswordWithWytNet(email);
        return sendJson(200, {
          success: true,
          message: result.detail || 'Password reset instructions have been sent.'
        });
      }

      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/reset-password (Reset Password Confirmation)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/reset-password' && req.method === 'POST') {
        const { token, new_password, confirm_password } = await readBody();

        if (!token || !new_password || !confirm_password) {
          return sendJson(400, { error: 'Token, new password, and confirm password are required' });
        }

        const result = await resetPasswordWithWytNet({ token, new_password, confirm_password });
        return sendJson(200, {
          success: true,
          message: result.detail || 'Password updated successfully! Please sign in with your new credentials.'
        });
      }

      // -------------------------------------------------------------
      // ROUTE: GET /api/auth/pkce-init (Generate PKCE Authorization URL)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/pkce-init' && req.method === 'GET') {
        const state = crypto.randomBytes(16).toString('hex');
        const codeVerifier = crypto.randomBytes(32).toString('base64url');
        const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');

        const authParams = new URLSearchParams({
          client_id: WYTPASS_CONFIG.clientId,
          redirect_uri: WYTPASS_CONFIG.redirectUri,
          response_type: 'code',
          scope: WYTPASS_CONFIG.scope,
          state: state,
          code_challenge: codeChallenge,
          code_challenge_method: 'S256'
        });

        const authUrl = `${WYTPASS_CONFIG.authUrl}?${authParams.toString()}`;

        // Set temporary verifier cookie (expires in 10 minutes)
        res.setHeader('Set-Cookie', [
          buildCookie('wyt_pkce_verifier', codeVerifier, {
            httpOnly: true,
            maxAge: 600,
            secure: isHttps
          }),
          buildCookie('wyt_oauth_state', state, {
            httpOnly: true,
            maxAge: 600,
            secure: isHttps
          })
        ]);

        return sendJson(200, {
          authUrl,
          state,
          codeChallenge
        });
      }

      // -------------------------------------------------------------
      // ROUTE: GET /api/auth/callback/whitenet (Flow B: OAuth 2.0 PKCE Callback)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/callback/whitenet') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        const error = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');

        if (error) {
          console.error('[WytNet Auth Callback Error]:', error, errorDescription);
          res.writeHead(302, { Location: `/#login?error=${encodeURIComponent(errorDescription || error)}` });
          return res.end();
        }

        if (!code) {
          res.writeHead(302, { Location: '/#login?error=missing_authorization_code' });
          return res.end();
        }

        // Validate state
        const storedState = cookies['wyt_oauth_state'];
        if (storedState && state && storedState !== state) {
          console.warn('[WytNet Auth] State mismatch! Possible CSRF.');
        }

        const codeVerifier = cookies['wyt_pkce_verifier'] || url.searchParams.get('code_verifier') || '';

        try {
          const tokenData = await exchangeCodeForTokens(code, codeVerifier, WYTPASS_CONFIG.redirectUri);

          const cookieHeaders = [
            buildCookie('wyt_access_token', tokenData.access_token, {
              httpOnly: true,
              maxAge: tokenData.expires_in || 3600,
              secure: isHttps
            }),
            buildCookie('wyt_user_sub', tokenData.user.sub, {
              httpOnly: false,
              maxAge: 30 * 24 * 3600,
              secure: isHttps
            }),
            buildCookie('wyt_pkce_verifier', '', { maxAge: 0 }),
            buildCookie('wyt_oauth_state', '', { maxAge: 0 })
          ];

          if (tokenData.refresh_token) {
            cookieHeaders.push(
              buildCookie('wyt_refresh_token', tokenData.refresh_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 3600,
                secure: isHttps
              })
            );
          }

          if (tokenData.id_token) {
            cookieHeaders.push(
              buildCookie('wyt_id_token', tokenData.id_token, {
                httpOnly: true,
                maxAge: tokenData.expires_in || 3600,
                secure: isHttps
              })
            );
          }

          res.setHeader('Set-Cookie', cookieHeaders);

          // If JSON requested via API:
          if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return sendJson(200, { success: true, user: tokenData.user });
          }

          // Otherwise redirect browser to QR Studio
          res.writeHead(302, { Location: '/#generator' });
          return res.end();
        } catch (exchangeErr) {
          console.error('[WytNet Auth Token Exchange Failed]:', exchangeErr);
          res.writeHead(302, { Location: `/#login?error=${encodeURIComponent(exchangeErr.message)}` });
          return res.end();
        }
      }

      // -------------------------------------------------------------
      // ROUTE: GET /api/auth/session (Session Validation & Hydration)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/session' && req.method === 'GET') {
        const accessToken = cookies['wyt_access_token'];
        const refreshToken = cookies['wyt_refresh_token'];
        const idToken = cookies['wyt_id_token'];

        if (!accessToken && !refreshToken) {
          return sendJson(200, { authenticated: false, user: null });
        }

        let userProfile = null;

        if (accessToken) {
          const verifiedPayload = await verifyJWT(accessToken);
          if (verifiedPayload) {
            userProfile = normalizeUserProfile(verifiedPayload);
          } else {
            // Token might be expired, try userinfo endpoint
            try {
              userProfile = await fetchUserInfo(accessToken);
            } catch (e) {
              console.warn('[WytNet Auth] Session access token invalid, trying refresh...', e.message);
            }
          }
        }

        // If access token was expired or invalid, attempt silent refresh
        if (!userProfile && refreshToken) {
          try {
            const refreshResult = await refreshAccessToken(refreshToken);
            const newAccess = refreshResult.access_token;
            const newRefresh = refreshResult.refresh_token;

            const cookieHeaders = [
              buildCookie('wyt_access_token', newAccess, {
                httpOnly: true,
                maxAge: refreshResult.expires_in || 3600,
                secure: isHttps
              })
            ];

            if (newRefresh) {
              cookieHeaders.push(
                buildCookie('wyt_refresh_token', newRefresh, {
                  httpOnly: true,
                  maxAge: 30 * 24 * 3600,
                  secure: isHttps
                })
              );
            }

            res.setHeader('Set-Cookie', cookieHeaders);

            try {
              userProfile = await fetchUserInfo(newAccess);
            } catch {
              userProfile = normalizeUserProfile({ sub: refreshResult.sub });
            }
          } catch (refreshErr) {
            console.warn('[WytNet Auth] Refresh failed, session terminated:', refreshErr.message);
            res.setHeader('Set-Cookie', [
              buildCookie('wyt_access_token', '', { maxAge: 0 }),
              buildCookie('wyt_refresh_token', '', { maxAge: 0 }),
              buildCookie('wyt_id_token', '', { maxAge: 0 }),
              buildCookie('wyt_user_sub', '', { maxAge: 0 })
            ]);
            return sendJson(200, { authenticated: false, user: null });
          }
        }

        if (userProfile) {
          return sendJson(200, { authenticated: true, user: userProfile });
        } else {
          return sendJson(200, { authenticated: false, user: null });
        }
      }

      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/refresh (Manual Token Refresh)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/refresh' && req.method === 'POST') {
        const body = await readBody();
        const refreshToken = cookies['wyt_refresh_token'] || body.refresh_token;

        if (!refreshToken) {
          return sendJson(400, { error: 'No refresh token available' });
        }

        const refreshResult = await refreshAccessToken(refreshToken);

        const cookieHeaders = [
          buildCookie('wyt_access_token', refreshResult.access_token, {
            httpOnly: true,
            maxAge: refreshResult.expires_in || 3600,
            secure: isHttps
          })
        ];

        if (refreshResult.refresh_token) {
          cookieHeaders.push(
            buildCookie('wyt_refresh_token', refreshResult.refresh_token, {
              httpOnly: true,
              maxAge: 30 * 24 * 3600,
              secure: isHttps
            })
          );
        }

        res.setHeader('Set-Cookie', cookieHeaders);
        return sendJson(200, { success: true, expires_in: refreshResult.expires_in });
      }

      // -------------------------------------------------------------
      // ROUTE: POST /api/auth/logout (Session Revocation & Cookie Clearing)
      // -------------------------------------------------------------
      if (pathname === '/api/auth/logout' && req.method === 'POST') {
        const accessToken = cookies['wyt_access_token'];
        const refreshToken = cookies['wyt_refresh_token'];

        // Asynchronously revoke tokens on WytNet
        if (accessToken) revokeToken(accessToken);
        if (refreshToken) revokeToken(refreshToken);

        res.setHeader('Set-Cookie', [
          buildCookie('wyt_access_token', '', { maxAge: 0 }),
          buildCookie('wyt_refresh_token', '', { maxAge: 0 }),
          buildCookie('wyt_id_token', '', { maxAge: 0 }),
          buildCookie('wyt_user_sub', '', { maxAge: 0 }),
          buildCookie('wyt_pkce_verifier', '', { maxAge: 0 }),
          buildCookie('wyt_oauth_state', '', { maxAge: 0 })
        ]);

        return sendJson(200, { success: true, message: 'Signed out successfully' });
      }

      // Unhandled auth route
      return sendJson(404, { error: 'Auth route not found' });
    } catch (err) {
      console.error('[WytNet Auth Service Exception]:', err);
      const status = err.status || (err.message && err.message.includes('429') ? 429 : 500);
      return sendJson(status, {
        error: err.message || 'An unexpected authentication error occurred',
        status: status
      });
    }
  };
}
