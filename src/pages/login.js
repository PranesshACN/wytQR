import { createIcons, icons } from 'lucide';

/**
 * Renders the Centralized WytNet / WytPass Authentication Suite
 * 
 * Supports:
 * - Flow A: Direct Email & Password Sign In
 * - Flow B: "Continue with WytPass" (OIDC + PKCE)
 * - User Registration with WytNet Identity
 * - Forgot Password & Reset Token verification
 * - Authenticated session state with canonical sub: wn_usr_<uuid>
 */
export function renderLoginPage(container, authManager, onNavigate, showToast) {
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const initialError = urlParams.get('error');
  const initialTab = urlParams.get('tab') || 'signin';
  const initialToken = urlParams.get('token') || '';

  // Clean URL query parameters from browser address bar
  if (urlParams.has('error') || urlParams.has('tab') || urlParams.has('token')) {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }

  let currentTab = initialTab; // 'signin' | 'signup' | 'forgot' | 'reset'
  let alertMessage = initialError ? { type: 'error', text: decodeURIComponent(initialError) } : null;
  let isLoading = false;

  function render() {
    const isLoggedIn = authManager && authManager.isLoggedIn();
    const user = isLoggedIn ? authManager.getUser() : null;

    // -------------------------------------------------------------
    // LOGGED IN VIEW
    // -------------------------------------------------------------
    if (isLoggedIn) {
      container.innerHTML = `
        <div class="login-page-container">
          <div class="login-card-glass">
            <div class="login-header">
              <div class="sso-logo-badge large">W</div>
              <h2>Authenticated Session</h2>
              <p>Your session is centrally secured by WytNet Identity</p>
            </div>

            <div class="logged-in-profile-box">
              <img src="${user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (user?.sub || 'wyt')}" alt="Avatar" class="profile-large-avatar" />
              <div class="profile-details">
                <h3>${user?.name || 'WytPass Member'}</h3>
                <p>${user?.email || 'member@wytnet.com'}</p>
                <div class="auth-sub-badge" title="WytNet Canonical Subject ID">
                  <i data-lucide="fingerprint" class="w-3 h-3"></i>
                  <span>${user?.sub || 'wn_usr_unknown'}</span>
                </div>
                <div>
                  <span class="badge-status-online"><span class="pulse-dot"></span> WytNet Verified</span>
                </div>
              </div>
            </div>

            <div class="login-actions-row">
              <button id="btn-page-go-studio" class="btn btn-primary btn-large flex-1">
                <i data-lucide="qr-code"></i>
                <span>Enter QR Studio</span>
              </button>
              <button id="btn-page-logout" class="btn btn-danger btn-large">
                <i data-lucide="log-out"></i>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      `;

      createIcons({ icons });

      document.getElementById('btn-page-go-studio')?.addEventListener('click', () => {
        onNavigate('generator');
      });

      document.getElementById('btn-page-logout')?.addEventListener('click', async () => {
        const btn = document.getElementById('btn-page-logout');
        if (btn) btn.disabled = true;
        try {
          await authManager.logout();
          showToast('Signed out of WytNet centralized session', 'info');
        } catch {
          showToast('Signed out locally', 'info');
        }
        currentTab = 'signin';
        alertMessage = null;
        render();
      });

      return;
    }

    // -------------------------------------------------------------
    // UNAUTHENTICATED TABS VIEW
    // -------------------------------------------------------------
    const isSignIn = currentTab === 'signin';
    const isSignUp = currentTab === 'signup';
    const isForgot = currentTab === 'forgot';
    const isReset = currentTab === 'reset';

    container.innerHTML = `
      <div class="login-page-container">
        <div class="login-card-glass">
          <!-- Back to Home navigation -->
          <div class="flex items-center justify-between">
            <a href="#home" class="back-home-link">
              <i data-lucide="arrow-left"></i>
              <span>Back to Home</span>
            </a>
            <div class="auth-identity-pill">
              <i data-lucide="shield-check" class="w-3 h-3"></i>
              <span>WytPass IdP</span>
            </div>
          </div>

          <!-- Header -->
          <div class="login-header">
            <div class="sso-logo-badge large">W</div>
            <h2>${isSignIn ? 'Sign in to WytQR' : isSignUp ? 'Create WytNet Account' : isForgot ? 'Recover Account' : 'Reset Password'}</h2>
            <p>${isSignIn 
              ? 'Centralized authentication powered by WytNet / WytPass IdP.' 
              : isSignUp 
              ? 'Register centrally with WytNet to access high-res QR generation & cloud telemetry.' 
              : isForgot 
              ? 'Enter your registered email address to receive password reset instructions.' 
              : 'Enter your verification token and your new secure password.'}
            </p>
          </div>

          <!-- Alert Banner (if any) -->
          ${alertMessage ? `
            <div class="auth-alert-banner ${alertMessage.type}">
              <i data-lucide="${alertMessage.type === 'error' ? 'alert-circle' : 'check-circle-2'}"></i>
              <span>${alertMessage.text}</span>
            </div>
          ` : ''}

          <!-- View Switcher Tabs (Sign In / Register) -->
          ${(isSignIn || isSignUp) ? `
            <div class="auth-nav-tabs">
              <button type="button" id="tab-btn-signin" class="auth-tab-btn ${isSignIn ? 'active' : ''}">Sign In</button>
              <button type="button" id="tab-btn-signup" class="auth-tab-btn ${isSignUp ? 'active' : ''}">Create Account</button>
            </div>
          ` : ''}

          <!-- TAB 1: SIGN IN VIEW -->
          ${isSignIn ? `
            <!-- Flow B: Continue with WytPass Button (OAuth 2.0 PKCE) -->
            <button id="btn-page-sso-cta" class="btn btn-primary btn-large btn-block btn-sso-cta" ${isLoading ? 'disabled' : ''}>
              <div class="sso-icon">W</div>
              <span>${isLoading ? 'Redirecting to WytPass...' : 'Continue with WytPass'}</span>
            </button>

            <div class="auth-divider">
              <span>OR SIGN IN WITH EMAIL</span>
            </div>

            <!-- Flow A: Direct Email & Password Form -->
            <form id="form-signin" class="email-login-form">
              <div class="form-field">
                <label for="input-signin-email">Email Address</label>
                <div class="input-with-icon">
                  <i data-lucide="mail"></i>
                  <input type="email" id="input-signin-email" placeholder="name@company.com" required autocomplete="email" />
                </div>
              </div>

              <div class="form-field">
                <div class="flex items-center justify-between mb-1">
                  <label for="input-signin-password">Password</label>
                  <button type="button" id="btn-switch-forgot" class="auth-link-btn text-xs">Forgot password?</button>
                </div>
                <div class="input-with-icon">
                  <i data-lucide="lock"></i>
                  <input type="password" id="input-signin-password" placeholder="••••••••" required autocomplete="current-password" />
                </div>
              </div>

              <button type="submit" id="btn-signin-submit" class="btn btn-secondary btn-block" ${isLoading ? 'disabled' : ''}>
                <i data-lucide="${isLoading ? 'loader-2' : 'log-in'}" class="${isLoading ? 'animate-spin-fast' : ''}"></i>
                <span>${isLoading ? 'Verifying with WytNet...' : 'Sign In & Open Studio'}</span>
              </button>
            </form>

            <div class="text-center text-xs text-slate-400 pt-1">
              <span>Don't have an account? </span>
              <button type="button" id="btn-inline-go-signup" class="auth-link-btn font-semibold">Create one with WytNet</button>
            </div>
          ` : ''}

          <!-- TAB 2: REGISTER VIEW -->
          ${isSignUp ? `
            <form id="form-signup" class="email-login-form">
              <div class="form-field">
                <label for="input-signup-name">Full Name</label>
                <div class="input-with-icon">
                  <i data-lucide="user"></i>
                  <input type="text" id="input-signup-name" placeholder="Alex Morgan" required autocomplete="name" />
                </div>
              </div>

              <div class="form-field">
                <label for="input-signup-email">Email Address</label>
                <div class="input-with-icon">
                  <i data-lucide="mail"></i>
                  <input type="email" id="input-signup-email" placeholder="alex@company.com" required autocomplete="email" />
                </div>
              </div>

              <div class="form-field">
                <label for="input-signup-phone">Phone Number <span class="text-xs text-slate-400 font-normal">(Optional)</span></label>
                <div class="input-with-icon">
                  <i data-lucide="phone"></i>
                  <input type="tel" id="input-signup-phone" placeholder="+1 (555) 000-0000" autocomplete="tel" />
                </div>
              </div>

              <div class="form-field">
                <label for="input-signup-password">Password</label>
                <div class="input-with-icon">
                  <i data-lucide="lock"></i>
                  <input type="password" id="input-signup-password" placeholder="Min. 8 characters" minlength="8" required autocomplete="new-password" />
                </div>
              </div>

              <div class="form-field">
                <label for="input-signup-confirm">Confirm Password</label>
                <div class="input-with-icon">
                  <i data-lucide="shield-check"></i>
                  <input type="password" id="input-signup-confirm" placeholder="••••••••" minlength="8" required autocomplete="new-password" />
                </div>
              </div>

              <button type="submit" id="btn-signup-submit" class="btn btn-primary btn-block" ${isLoading ? 'disabled' : ''}>
                <i data-lucide="${isLoading ? 'loader-2' : 'user-plus'}" class="${isLoading ? 'animate-spin-fast' : ''}"></i>
                <span>${isLoading ? 'Creating Account on WytNet...' : 'Create WytNet Account'}</span>
              </button>
            </form>

            <div class="text-center text-xs text-slate-400 pt-1">
              <span>Already registered on WytNet? </span>
              <button type="button" id="btn-inline-go-signin" class="auth-link-btn font-semibold">Sign in here</button>
            </div>
          ` : ''}

          <!-- TAB 3: FORGOT PASSWORD VIEW -->
          ${isForgot ? `
            <form id="form-forgot" class="email-login-form">
              <div class="form-field">
                <label for="input-forgot-email">Registered Email Address</label>
                <div class="input-with-icon">
                  <i data-lucide="mail"></i>
                  <input type="email" id="input-forgot-email" placeholder="name@company.com" required autocomplete="email" />
                </div>
              </div>

              <button type="submit" id="btn-forgot-submit" class="btn btn-primary btn-block" ${isLoading ? 'disabled' : ''}>
                <i data-lucide="${isLoading ? 'loader-2' : 'send'}" class="${isLoading ? 'animate-spin-fast' : ''}"></i>
                <span>${isLoading ? 'Sending Request...' : 'Send Reset Instructions'}</span>
              </button>

              <div class="auth-helper-row pt-2">
                <button type="button" id="btn-forgot-go-reset" class="auth-link-btn text-xs">I have a reset token</button>
                <button type="button" id="btn-forgot-go-signin" class="auth-link-btn text-xs">Back to Sign In</button>
              </div>
            </form>
          ` : ''}

          <!-- TAB 4: RESET PASSWORD VIEW -->
          ${isReset ? `
            <form id="form-reset" class="email-login-form">
              <div class="form-field">
                <label for="input-reset-token">Password Reset Token</label>
                <div class="input-with-icon">
                  <i data-lucide="key"></i>
                  <input type="text" id="input-reset-token" value="${initialToken}" placeholder="Paste reset token here" required />
                </div>
              </div>

              <div class="form-field">
                <label for="input-reset-password">New Password</label>
                <div class="input-with-icon">
                  <i data-lucide="lock"></i>
                  <input type="password" id="input-reset-password" placeholder="Min. 8 characters" minlength="8" required autocomplete="new-password" />
                </div>
              </div>

              <div class="form-field">
                <label for="input-reset-confirm">Confirm New Password</label>
                <div class="input-with-icon">
                  <i data-lucide="shield-check"></i>
                  <input type="password" id="input-reset-confirm" placeholder="••••••••" minlength="8" required autocomplete="new-password" />
                </div>
              </div>

              <button type="submit" id="btn-reset-submit" class="btn btn-primary btn-block" ${isLoading ? 'disabled' : ''}>
                <i data-lucide="${isLoading ? 'loader-2' : 'check'}" class="${isLoading ? 'animate-spin-fast' : ''}"></i>
                <span>${isLoading ? 'Updating Password...' : 'Save New Password'}</span>
              </button>

              <div class="text-center pt-2">
                <button type="button" id="btn-reset-go-signin" class="auth-link-btn text-xs">Back to Sign In</button>
              </div>
            </form>
          ` : ''}

          <!-- Footer Information -->
          <div class="login-footer-info">
            <p>
              <i data-lucide="shield-check"></i> 
              Secured by WytPass Centralized Identity Protocol (RS256 &amp; PKCE S256).
            </p>
          </div>
        </div>
      </div>
    `;

    createIcons({ icons });
    attachEventListeners();
  }

  function attachEventListeners() {
    // Tab switchers
    document.getElementById('tab-btn-signin')?.addEventListener('click', () => {
      currentTab = 'signin';
      alertMessage = null;
      render();
    });

    document.getElementById('tab-btn-signup')?.addEventListener('click', () => {
      currentTab = 'signup';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-switch-forgot')?.addEventListener('click', () => {
      currentTab = 'forgot';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-inline-go-signup')?.addEventListener('click', () => {
      currentTab = 'signup';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-inline-go-signin')?.addEventListener('click', () => {
      currentTab = 'signin';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-forgot-go-reset')?.addEventListener('click', () => {
      currentTab = 'reset';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-forgot-go-signin')?.addEventListener('click', () => {
      currentTab = 'signin';
      alertMessage = null;
      render();
    });

    document.getElementById('btn-reset-go-signin')?.addEventListener('click', () => {
      currentTab = 'signin';
      alertMessage = null;
      render();
    });

    // -------------------------------------------------------------
    // FLOW B: "Continue with WytPass" OAuth 2.0 PKCE CTA
    // -------------------------------------------------------------
    document.getElementById('btn-page-sso-cta')?.addEventListener('click', async () => {
      isLoading = true;
      alertMessage = null;
      render();

      showToast('Initiating PKCE handshake with WytPass Identity Server...', 'info');

      try {
        await authManager.loginWithWytPass();
      } catch (err) {
        isLoading = false;
        alertMessage = { type: 'error', text: err.message || 'Failed to connect to WytPass Identity Server.' };
        render();
      }
    });

    // -------------------------------------------------------------
    // FLOW A: Direct Email & Password Sign In
    // -------------------------------------------------------------
    document.getElementById('form-signin')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('input-signin-email')?.value;
      const password = document.getElementById('input-signin-password')?.value;

      if (!email || !password) return;

      isLoading = true;
      alertMessage = null;
      render();

      try {
        const user = await authManager.loginWithEmail(email, password);
        showToast(`Welcome back, ${user.name || 'Member'}! Signed in with WytNet.`, 'success');
        isLoading = false;
        render();
        // Redirect to QR Studio
        onNavigate('generator');
      } catch (err) {
        isLoading = false;
        alertMessage = { type: 'error', text: err.message || 'Invalid email or password.' };
        render();
      }
    });

    // -------------------------------------------------------------
    // USER REGISTRATION FORM
    // -------------------------------------------------------------
    document.getElementById('form-signup')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('input-signup-name')?.value;
      const email = document.getElementById('input-signup-email')?.value;
      const phone = document.getElementById('input-signup-phone')?.value;
      const password = document.getElementById('input-signup-password')?.value;
      const confirm = document.getElementById('input-signup-confirm')?.value;

      if (password !== confirm) {
        alertMessage = { type: 'error', text: 'Passwords do not match. Please verify and re-enter.' };
        render();
        return;
      }

      isLoading = true;
      alertMessage = null;
      render();

      try {
        const result = await authManager.register({ name, email, password, phone });
        isLoading = false;

        if (result.user) {
          showToast(`Account created! Welcome, ${result.user.name}.`, 'success');
          render();
          onNavigate('generator');
        } else {
          showToast('Account registered successfully! Please sign in.', 'success');
          currentTab = 'signin';
          alertMessage = { type: 'success', text: 'Registration successful! You may now sign in with your WytNet credentials.' };
          render();
        }
      } catch (err) {
        isLoading = false;
        alertMessage = { type: 'error', text: err.message || 'Registration failed.' };
        render();
      }
    });

    // -------------------------------------------------------------
    // FORGOT PASSWORD FORM
    // -------------------------------------------------------------
    document.getElementById('form-forgot')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('input-forgot-email')?.value;
      if (!email) return;

      isLoading = true;
      alertMessage = null;
      render();

      try {
        const result = await authManager.forgotPassword(email);
        isLoading = false;
        currentTab = 'reset';
        alertMessage = { 
          type: 'success', 
          text: result.message || 'If an account exists with this email, instructions and a reset token have been dispatched. Please enter your reset token below.' 
        };
        showToast('Password reset instructions sent', 'success');
        render();
      } catch (err) {
        isLoading = false;
        alertMessage = { type: 'error', text: err.message || 'Unable to process reset request.' };
        render();
      }
    });

    // -------------------------------------------------------------
    // RESET PASSWORD CONFIRMATION FORM
    // -------------------------------------------------------------
    document.getElementById('form-reset')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = document.getElementById('input-reset-token')?.value;
      const newPassword = document.getElementById('input-reset-password')?.value;
      const confirmPassword = document.getElementById('input-reset-confirm')?.value;

      if (newPassword !== confirmPassword) {
        alertMessage = { type: 'error', text: 'New passwords do not match. Please re-enter.' };
        render();
        return;
      }

      isLoading = true;
      alertMessage = null;
      render();

      try {
        const result = await authManager.resetPassword({
          token,
          new_password: newPassword,
          confirm_password: confirmPassword
        });

        isLoading = false;
        currentTab = 'signin';
        alertMessage = { type: 'success', text: result.message || 'Password successfully updated! Please sign in with your new credentials.' };
        showToast('Password updated successfully', 'success');
        render();
      } catch (err) {
        isLoading = false;
        alertMessage = { type: 'error', text: err.message || 'Password reset failed. Invalid or expired token.' };
        render();
      }
    });
  }

  // Initial render
  render();
}
