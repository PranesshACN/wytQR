import { createIcons, icons } from 'lucide';

export function renderLoginPage(container, authManager, onNavigate, showToast) {
  if (!container) return;

  const isLoggedIn = authManager && authManager.isLoggedIn();
  const user = isLoggedIn ? authManager.getUser() : null;

  if (isLoggedIn) {
    container.innerHTML = `
      <div class="login-page-container">
        <div class="login-card-glass">
          <div class="login-header">
            <div class="sso-logo-badge large">W</div>
            <h2>You are Logged In</h2>
            <p>Active WhitePass SSO Identity Session</p>
          </div>

          <div class="logged-in-profile-box">
            <img src="${user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=WhitePass'}" alt="Avatar" class="profile-large-avatar" />
            <div class="profile-details">
              <h3>${user?.name || 'WhitePass Member'}</h3>
              <p>${user?.email || 'member@wytnet.com'}</p>
              <span class="badge-status-online"><span class="pulse-dot"></span> Authenticated</span>
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
    document.getElementById('btn-page-go-studio')?.addEventListener('click', () => onNavigate('generator'));
    document.getElementById('btn-page-logout')?.addEventListener('click', () => {
      authManager.logout();
      showToast('Signed out of WhitePass SSO', 'info');
      renderLoginPage(container, authManager, onNavigate, showToast);
    });

    return;
  }

  container.innerHTML = `
    <div class="login-page-container">
      <div class="login-card-glass">
        <!-- Back link -->
        <a href="#home" class="back-home-link">
          <i data-lucide="arrow-left"></i>
          <span>Back to Home</span>
        </a>

        <div class="login-header">
          <div class="sso-logo-badge large">W</div>
          <h2>Sign in with WhitePass</h2>
          <p>Sign in to your WhitePass Identity account to access the QR Code Studio & cloud history.</p>
        </div>

        <!-- Primary WhitePass SSO OAuth Button -->
        <button id="btn-page-sso-cta" class="btn btn-primary btn-large btn-block btn-sso-cta">
          <div class="sso-icon">W</div>
          <span>Continue with WhitePass SSO</span>
        </button>

        <div class="auth-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        <!-- Standard Email/Password Form Option -->
        <form id="form-email-login" class="email-login-form">
          <div class="form-field">
            <label for="login-email">Email Address</label>
            <div class="input-with-icon">
              <i data-lucide="mail"></i>
              <input type="email" id="login-email" placeholder="name@company.com" required />
            </div>
          </div>

          <div class="form-field">
            <label for="login-password">Password</label>
            <div class="input-with-icon">
              <i data-lucide="lock"></i>
              <input type="password" id="login-password" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" class="btn btn-secondary btn-block">
            <i data-lucide="log-in"></i>
            <span>Sign In & Open Studio</span>
          </button>
        </form>

        <div class="login-footer-info">
          <p><i data-lucide="shield-check"></i> Secured by WhitePass OAuth 2.0 Identity Protocol.</p>
        </div>
      </div>
    </div>
  `;

  createIcons({ icons });

  // Attach WhitePass SSO button event
  document.getElementById('btn-page-sso-cta')?.addEventListener('click', () => {
    showToast('Redirecting to WhitePass Identity Server...', 'info');
    authManager.loginWithWhitePass();
  });

  // Attach Email form submit handler
  document.getElementById('form-email-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;

    authManager.saveSession({
      accessToken: 'wyt_demo_' + Math.random().toString(36).substring(2),
      user: {
        id: 'usr_local_' + Math.random().toString(36).substring(2, 7),
        name: email.split('@')[0] || 'User',
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
    });

    showToast(`Signed in successfully as ${email}`, 'success');
    onNavigate('generator');
  });
}
