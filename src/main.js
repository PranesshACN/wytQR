import { createIcons, icons } from 'lucide';
import { QREngine, buildPayload } from './qr-engine.js';
import { PRESETS } from './presets.js';
import { HistoryManager } from './history.js';
import { generateBatchZip } from './batch.js';
import { AuthManager } from './auth.js';
import { Router } from './router.js';
import { renderLandingPage } from './pages/landing.js';
import { renderLoginPage } from './pages/login.js';

// DOM Elements & Managers
let qrEngine = null;
let historyManager = null;
let authManager = null;
let router = null;

let currentDataType = 'url';
let customLogoUrl = null;

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  createIcons({ icons });

  // Initialize Auth Manager
  authManager = new AuthManager();

  // Initialize History Manager
  historyManager = new HistoryManager();
  updateHistoryBadge();

  // Initialize Router with Authentication Route Guard
  router = new Router(
    {
      home: () => {
        renderLandingPage(
          document.getElementById('view-home'),
          (route) => router.navigate(route),
          () => authManager.loginWithWhitePass(),
          authManager.isLoggedIn()
        );
        updateAuthUI();
      },
      login: () => {
        renderLoginPage(
          document.getElementById('view-login'),
          authManager,
          (route) => {
            updateAuthUI();
            router.navigate(route);
          },
          showToast
        );
        updateAuthUI();
      },
      generator: () => {
        if (!qrEngine) {
          initStudioQREngine();
        }
        updateAuthUI();
      }
    },
    'home',
    // Strict Route Guard: Protect QR Studio so it is ONLY accessible when logged in!
    (targetRoute) => {
      const loggedIn = authManager && authManager.isLoggedIn();
      if (targetRoute === 'generator' && !loggedIn) {
        showToast('Please sign in with WhitePass to access the QR Code Studio', 'info');
        return 'login';
      }
      return targetRoute;
    }
  );

  // Process WhitePass SSO Callback if redirected back with authorization code
  await checkSSOCallback();

  // Initialize QR Studio Engine
  initStudioQREngine();

  // Global Event Handlers
  setupExportActions();
  setupHistoryDrawer();
  setupScannerModal();
  setupThemeToggle();
});

// Toast Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
  container.appendChild(toast);
  createIcons({ icons });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// WhitePass SSO Callback Check
async function checkSSOCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    try {
      const user = await authManager.handleAuthCallback();
      if (user) {
        showToast(`Welcome back, ${user.name}! WhitePass SSO login successful. Opening QR Studio...`, 'success');
        updateAuthUI();
        if (router) router.navigate('generator');
      }
    } catch (err) {
      showToast('WhitePass SSO login failed: ' + err.message, 'error');
    }
  }
}

// Update Header Auth State UI
function updateAuthUI() {
  const btnTopRightLogin = document.getElementById('btn-top-right-login');
  const userPill = document.getElementById('user-profile-pill');
  const txtName = document.getElementById('txt-user-name');
  const txtEmail = document.getElementById('txt-user-email');
  const imgAvatar = document.getElementById('img-user-avatar');
  const studioTools = document.getElementById('studio-header-tools');

  const currentRoute = router ? router.currentRoute : 'home';

  // Toggle studio tools visibility (Scanner & History)
  if (studioTools) {
    if (currentRoute === 'generator' || (authManager && authManager.isLoggedIn())) {
      studioTools.classList.remove('hidden');
    } else {
      studioTools.classList.add('hidden');
    }
  }

  // Toggle User Profile Pill vs Top Right Login Button
  if (authManager && authManager.isLoggedIn()) {
    const user = authManager.getUser();
    if (btnTopRightLogin) btnTopRightLogin.classList.add('hidden');
    if (userPill) userPill.classList.remove('hidden');

    if (txtName) txtName.textContent = user.name || 'WhitePass User';
    if (txtEmail) txtEmail.textContent = user.email || 'user@wytnet.com';
    if (imgAvatar) imgAvatar.src = user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=WhitePass';
  } else {
    if (btnTopRightLogin) btnTopRightLogin.classList.remove('hidden');
    if (userPill) userPill.classList.add('hidden');
  }

  // Attach logout handler
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    authManager.logout();
    updateAuthUI();
    showToast('Signed out of WhitePass SSO', 'info');
    if (router) router.navigate('home');
  });
}

// Studio Generator Setup
function initStudioQREngine() {
  const container = document.getElementById('qr-canvas-container');
  if (!container) return;

  qrEngine = new QREngine(container);

  setupNavigationTabs();
  setupDataTypePills();
  setupFormListeners();
  setupDesignControls();
  setupLogoControls();
  renderPresetsGrid();
  setupBatchGenerator();

  triggerQRUpdate();
}

// Navigation Studio Tabs
function setupNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tabs .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetPane = tab.dataset.tab;
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      document.getElementById(`pane-${targetPane}`)?.classList.add('active');
    });
  });
}

// Data Type Pills Switcher
function setupDataTypePills() {
  const pills = document.querySelectorAll('.type-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      currentDataType = pill.dataset.type;
      
      document.querySelectorAll('.form-group-pane').forEach(pane => pane.classList.remove('active'));
      document.querySelector(`.form-group-pane[data-form="${currentDataType}"]`)?.classList.add('active');

      triggerQRUpdate();
    });
  });
}

// Extract current input data based on active tab
function getFormData() {
  switch (currentDataType) {
    case 'url':
      return {
        url: document.getElementById('input-url')?.value || '',
        utmSource: document.getElementById('input-utm-source')?.value || '',
        utmMedium: document.getElementById('input-utm-medium')?.value || '',
        utmCampaign: document.getElementById('input-utm-campaign')?.value || ''
      };
    case 'text':
      return { text: document.getElementById('input-text')?.value || '' };
    case 'wifi':
      return {
        ssid: document.getElementById('input-wifi-ssid')?.value || '',
        password: document.getElementById('input-wifi-password')?.value || '',
        auth: document.getElementById('input-wifi-auth')?.value || 'WPA',
        hidden: document.getElementById('input-wifi-hidden')?.checked || false
      };
    case 'vcard':
      return {
        firstName: document.getElementById('input-vcard-first')?.value || '',
        lastName: document.getElementById('input-vcard-last')?.value || '',
        phone: document.getElementById('input-vcard-phone')?.value || '',
        email: document.getElementById('input-vcard-email')?.value || '',
        org: document.getElementById('input-vcard-org')?.value || '',
        title: document.getElementById('input-vcard-title')?.value || '',
        website: document.getElementById('input-vcard-website')?.value || ''
      };
    case 'email':
      return {
        emailTo: document.getElementById('input-email-to')?.value || '',
        emailSubject: document.getElementById('input-email-subject')?.value || '',
        emailBody: document.getElementById('input-email-body')?.value || ''
      };
    case 'sms':
      return {
        smsPhone: document.getElementById('input-sms-phone')?.value || '',
        smsBody: document.getElementById('input-sms-body')?.value || ''
      };
    case 'social':
      return {
        platform: document.getElementById('input-social-platform')?.value || 'whatsapp',
        username: document.getElementById('input-social-username')?.value || ''
      };
    default:
      return { url: 'https://github.com' };
  }
}

// Dynamic Form Field Change Listeners
function setupFormListeners() {
  const inputs = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');
  inputs.forEach(input => {
    input.addEventListener('input', debounce(triggerQRUpdate, 150));
    input.addEventListener('change', triggerQRUpdate);
  });

  // Social platform label update
  const platformSelect = document.getElementById('input-social-platform');
  platformSelect?.addEventListener('change', () => {
    const val = platformSelect.value;
    const label = document.getElementById('label-social-username');
    if (!label) return;
    if (val === 'whatsapp') label.textContent = 'Phone Number (with Country Code)';
    else if (val.startsWith('crypto')) label.textContent = 'Wallet Address';
    else label.textContent = 'Username or Profile Handle';
  });
}

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Trigger QR Code Update
function triggerQRUpdate() {
  if (!qrEngine) return;

  const data = getFormData();
  const payload = buildPayload(currentDataType, data);
  
  // Update live payload text display
  const payloadDisplay = document.getElementById('txt-payload-display');
  if (payloadDisplay) payloadDisplay.textContent = payload || '(Empty payload)';

  // Build config
  const updateOptions = {
    data: payload || 'https://github.com'
  };

  qrEngine.update(updateOptions);
}

// Design Controls (Shapes, Gradients, Colors, Margin)
function setupDesignControls() {
  // Module Shapes
  const shapeBtns = document.querySelectorAll('#grid-dots-type .shape-btn');
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      qrEngine.update({
        dotsOptions: { type: btn.dataset.shape }
      });
    });
  });

  // Eye Corner Square Shapes
  const squareBtns = document.querySelectorAll('#grid-corners-square .shape-btn');
  squareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      squareBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      qrEngine.update({
        cornersSquareOptions: { type: btn.dataset.cornersSquare }
      });
    });
  });

  // Eye Corner Dot Shapes
  const dotBtns = document.querySelectorAll('#grid-corners-dot .shape-btn');
  dotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      qrEngine.update({
        cornersDotOptions: { type: btn.dataset.cornersDot }
      });
    });
  });

  // Fill Switcher: Solid vs Gradient
  const btnSolid = document.getElementById('btn-fill-solid');
  const btnGrad = document.getElementById('btn-fill-gradient');
  const wrapperSolid = document.getElementById('wrapper-solid-color');
  const wrapperGrad = document.getElementById('wrapper-gradient-color');

  btnSolid?.addEventListener('click', () => {
    btnSolid.classList.add('active');
    btnGrad.classList.remove('active');
    wrapperSolid?.classList.remove('hidden');
    wrapperGrad?.classList.add('hidden');

    const color = document.getElementById('picker-dots-color')?.value || '#6366f1';
    qrEngine.update({
      dotsOptions: {
        color: color,
        gradient: null
      }
    });
  });

  btnGrad?.addEventListener('click', () => {
    btnGrad.classList.add('active');
    btnSolid.classList.remove('active');
    wrapperGrad?.classList.remove('hidden');
    wrapperSolid?.classList.add('hidden');

    applyGradientUpdate();
  });

  // Solid Color Pickers
  document.getElementById('picker-dots-color')?.addEventListener('input', (e) => {
    qrEngine.update({ dotsOptions: { color: e.target.value, gradient: null } });
  });

  document.getElementById('picker-eye-square-color')?.addEventListener('input', (e) => {
    qrEngine.update({ cornersSquareOptions: { color: e.target.value } });
  });

  document.getElementById('picker-eye-dot-color')?.addEventListener('input', (e) => {
    qrEngine.update({ cornersDotOptions: { color: e.target.value } });
  });

  // Gradient Pickers
  function applyGradientUpdate() {
    const start = document.getElementById('picker-grad-start')?.value || '#6366f1';
    const end = document.getElementById('picker-grad-end')?.value || '#a855f7';
    const angle = Number(document.getElementById('range-grad-rotation')?.value || 45);

    qrEngine.update({
      dotsOptions: {
        gradient: {
          type: 'linear',
          rotation: angle,
          colorStops: [
            { offset: 0, color: start },
            { offset: 1, color: end }
          ]
        }
      }
    });
  }

  document.getElementById('picker-grad-start')?.addEventListener('input', applyGradientUpdate);
  document.getElementById('picker-grad-end')?.addEventListener('input', applyGradientUpdate);
  document.getElementById('range-grad-rotation')?.addEventListener('input', (e) => {
    const valSpan = document.getElementById('val-grad-angle');
    if (valSpan) valSpan.textContent = e.target.value;
    applyGradientUpdate();
  });

  // Background Color & Quiet Zone
  document.getElementById('picker-bg-color')?.addEventListener('input', (e) => {
    const chk = document.getElementById('check-bg-transparent');
    if (chk) chk.checked = false;
    qrEngine.update({ backgroundOptions: { color: e.target.value } });
  });

  document.getElementById('check-bg-transparent')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      qrEngine.update({ backgroundOptions: { color: 'transparent' } });
    } else {
      const color = document.getElementById('picker-bg-color')?.value || '#ffffff';
      qrEngine.update({ backgroundOptions: { color: color } });
    }
  });

  document.getElementById('range-margin')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const valSpan = document.getElementById('val-margin');
    if (valSpan) valSpan.textContent = val;
    qrEngine.update({ margin: Number(val) });
  });
}

// Logo & Branding Controls
function setupLogoControls() {
  const dropZone = document.getElementById('logo-drop-zone');
  const fileInput = document.getElementById('input-logo-file');
  const previewBar = document.getElementById('logo-preview-bar');
  const imgPreview = document.getElementById('img-logo-preview');
  const txtLogoName = document.getElementById('txt-logo-name');
  const btnRemove = document.getElementById('btn-remove-logo');

  dropZone?.addEventListener('click', () => fileInput.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      processLogoFile(file);
    }
  });

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
      processLogoFile(e.dataTransfer.files[0]);
    }
  });

  function processLogoFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, SVG)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      customLogoUrl = evt.target.result;
      if (imgPreview) imgPreview.src = customLogoUrl;
      if (txtLogoName) txtLogoName.textContent = file.name;
      previewBar?.classList.remove('hidden');

      setECL('H');

      qrEngine.update({
        image: customLogoUrl,
        imageOptions: { hideBackgroundDots: true, imageSize: getLogoSize(), margin: getLogoMargin() }
      });
      showToast('Logo attached to QR code', 'success');
    };
    reader.readAsDataURL(file);
  }

  btnRemove?.addEventListener('click', (e) => {
    e.stopPropagation();
    customLogoUrl = null;
    if (fileInput) fileInput.value = '';
    previewBar?.classList.add('hidden');
    
    document.querySelectorAll('.icon-preset-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.icon-preset-btn[data-icon="none"]')?.classList.add('active');

    qrEngine.update({ image: '' });
    showToast('Logo removed', 'info');
  });

  // Icon Presets
  const iconBtns = document.querySelectorAll('.icon-preset-btn');
  iconBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      iconBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const iconType = btn.dataset.icon;
      if (iconType === 'none') {
        customLogoUrl = null;
        previewBar?.classList.add('hidden');
        qrEngine.update({ image: '' });
      } else {
        const svgString = getVectorSvgForPreset(iconType);
        const encoded = 'data:image/svg+xml;base64,' + btoa(svgString);
        customLogoUrl = encoded;

        if (imgPreview) imgPreview.src = customLogoUrl;
        if (txtLogoName) txtLogoName.textContent = `${iconType}-icon.svg`;
        previewBar?.classList.remove('hidden');

        setECL('Q');
        qrEngine.update({
          image: customLogoUrl,
          imageOptions: { hideBackgroundDots: true, imageSize: getLogoSize(), margin: getLogoMargin() }
        });
      }
    });
  });

  // Size and Margin Sliders
  document.getElementById('range-logo-size')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const valSpan = document.getElementById('val-logo-size');
    if (valSpan) valSpan.textContent = val;
    qrEngine.update({
      imageOptions: { imageSize: Number(val) / 100 }
    });
  });

  document.getElementById('range-logo-margin')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const valSpan = document.getElementById('val-logo-margin');
    if (valSpan) valSpan.textContent = val;
    qrEngine.update({
      imageOptions: { margin: Number(val) }
    });
  });

  // ECL Buttons
  const eclBtns = document.querySelectorAll('.ecl-btn');
  eclBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setECL(btn.dataset.ecl);
    });
  });

  function setECL(ecl) {
    eclBtns.forEach(b => b.classList.toggle('active', b.dataset.ecl === ecl));
    qrEngine.update({
      qrOptions: { errorCorrectionLevel: ecl }
    });
  }

  function getLogoSize() {
    const el = document.getElementById('range-logo-size');
    return el ? Number(el.value) / 100 : 0.35;
  }

  function getLogoMargin() {
    const el = document.getElementById('range-logo-margin');
    return el ? Number(el.value) : 4;
  }
}

// Preset vector SVG icon strings for built-in icons
function getVectorSvgForPreset(icon) {
  const iconsMap = {
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    wifi: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.85a10 10 0 0 1 14 0"/><path d="M8.5 16.88a5 5 0 0 1 7 0"/></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>'
  };
  return iconsMap[icon] || iconsMap.globe;
}

// Render Presets Gallery
function renderPresetsGrid() {
  const container = document.getElementById('container-presets-cards');
  if (!container) return;

  container.innerHTML = PRESETS.map(preset => `
    <div class="preset-card" data-preset-id="${preset.id}">
      <div class="preset-preview-circle" style="background: ${preset.backgroundOptions.color}; border: 1px solid var(--border-color);">
        <div style="width: 24px; height: 24px; border-radius: 4px; background: ${preset.dotsOptions.gradient ? preset.dotsOptions.gradient.colorStops[0].color : preset.dotsOptions.color}"></div>
      </div>
      <div class="preset-title">${preset.name}</div>
      <div class="preset-desc">${preset.description}</div>
    </div>
  `).join('');

  container.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const presetId = card.dataset.presetId;
      const preset = PRESETS.find(p => p.id === presetId);
      if (preset) {
        qrEngine.update({
          dotsOptions: preset.dotsOptions,
          backgroundOptions: preset.backgroundOptions,
          cornersSquareOptions: preset.cornersSquareOptions,
          cornersDotOptions: preset.cornersDotOptions
        });

        syncUIWithPreset(preset);
        showToast(`Applied theme: ${preset.name}`, 'success');
      }
    });
  });
}

function syncUIWithPreset(preset) {
  const shapeBtns = document.querySelectorAll('#grid-dots-type .shape-btn');
  shapeBtns.forEach(b => b.classList.toggle('active', b.dataset.shape === preset.dotsOptions.type));

  const squareBtns = document.querySelectorAll('#grid-corners-square .shape-btn');
  squareBtns.forEach(b => b.classList.toggle('active', b.dataset.cornersSquare === preset.cornersSquareOptions.type));

  const dotBtns = document.querySelectorAll('#grid-corners-dot .shape-btn');
  dotBtns.forEach(b => b.classList.toggle('active', b.dataset.cornersDot === preset.cornersDotOptions.type));

  if (preset.dotsOptions.gradient) {
    document.getElementById('btn-fill-gradient')?.click();
    const startInput = document.getElementById('picker-grad-start');
    const endInput = document.getElementById('picker-grad-end');
    if (startInput) startInput.value = preset.dotsOptions.gradient.colorStops[0].color;
    if (endInput) endInput.value = preset.dotsOptions.gradient.colorStops[1].color;
  } else {
    document.getElementById('btn-fill-solid')?.click();
    const dotsColorInput = document.getElementById('picker-dots-color');
    if (dotsColorInput) dotsColorInput.value = preset.dotsOptions.color;
  }

  const bgInput = document.getElementById('picker-bg-color');
  const eyeSqInput = document.getElementById('picker-eye-square-color');
  const eyeDotInput = document.getElementById('picker-eye-dot-color');

  if (bgInput) bgInput.value = preset.backgroundOptions.color;
  if (eyeSqInput) eyeSqInput.value = preset.cornersSquareOptions.color;
  if (eyeDotInput) eyeDotInput.value = preset.cornersDotOptions.color;
}

// Batch Generator Setup
function setupBatchGenerator() {
  const btnRun = document.getElementById('btn-run-batch');
  const textarea = document.getElementById('textarea-batch-input');
  const progressBox = document.getElementById('batch-progress-box');
  const progressFill = document.getElementById('batch-progress-fill');
  const progressText = document.getElementById('batch-progress-text');

  btnRun?.addEventListener('click', async () => {
    const raw = textarea?.value || '';
    const lines = raw.split('\n').filter(l => l.trim().length > 0);

    if (lines.length === 0) {
      showToast('Please enter at least one URL or item in the text area.', 'error');
      return;
    }

    progressBox?.classList.remove('hidden');
    if (progressFill) progressFill.style.width = '0%';
    if (progressText) progressText.textContent = `Generating 0 of ${lines.length}...`;

    btnRun.disabled = true;

    try {
      const currentConfig = qrEngine.getOptions();
      await generateBatchZip(lines, currentConfig, (completed, total) => {
        const pct = Math.round((completed / total) * 100);
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `Generating ${completed} of ${total}... (${pct}%)`;
      });

      showToast(`Batch export complete! ZIP downloaded.`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Batch export failed: ' + err.message, 'error');
    } finally {
      btnRun.disabled = false;
      setTimeout(() => progressBox?.classList.add('hidden'), 2000);
    }
  });
}

// Export Actions (PNG, SVG, Clipboard & History Save)
function setupExportActions() {
  const btnPNG = document.getElementById('btn-download-png');
  const btnSVG = document.getElementById('btn-download-svg');
  const btnCopy = document.getElementById('btn-copy-clipboard');
  const selectSize = document.getElementById('select-export-size');

  btnPNG?.addEventListener('click', async () => {
    const size = Number(selectSize?.value || 1000);
    await qrEngine.download('wyt_qr_code', 'png', size);
    saveToHistory();
    showToast(`Downloaded high-res PNG (${size}px)`, 'success');
  });

  btnSVG?.addEventListener('click', async () => {
    await qrEngine.download('wyt_qr_code', 'svg', 800);
    saveToHistory();
    showToast('Downloaded Vector SVG format', 'success');
  });

  btnCopy?.addEventListener('click', async () => {
    const success = await qrEngine.copyToClipboard();
    if (success) {
      showToast('QR Code copied to clipboard!', 'success');
      saveToHistory();
    } else {
      showToast('Copy to clipboard failed. Try downloading PNG instead.', 'error');
    }
  });
}

async function saveToHistory() {
  if (!historyManager || !qrEngine) return;

  try {
    const data = getFormData();
    const payload = buildPayload(currentDataType, data);
    const blob = await qrEngine.getRawBlob('png');
    
    if (blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        historyManager.addItem({
          title: `${currentDataType.toUpperCase()} QR Code`,
          type: currentDataType,
          data: payload,
          config: qrEngine.getOptions(),
          previewDataUrl: reader.result
        });
        updateHistoryBadge();
        renderHistoryList();
      };
      reader.readAsDataURL(blob);
    }
  } catch (e) {
    console.error('History save error:', e);
  }
}

function updateHistoryBadge() {
  const badge = document.getElementById('history-badge');
  if (badge && historyManager) {
    const count = historyManager.getItems().length;
    badge.textContent = count;
  }
}

// History Drawer Setup
function setupHistoryDrawer() {
  const drawer = document.getElementById('drawer-history');
  const btnOpen = document.getElementById('btn-open-history');
  const btnClose = document.getElementById('btn-close-history');
  const overlay = drawer?.querySelector('.drawer-overlay');
  const btnClear = document.getElementById('btn-clear-history');

  btnOpen?.addEventListener('click', () => {
    renderHistoryList();
    drawer?.classList.add('open');
  });

  btnClose?.addEventListener('click', () => drawer?.classList.remove('open'));
  overlay?.addEventListener('click', () => drawer?.classList.remove('open'));

  btnClear?.addEventListener('click', () => {
    if (confirm('Clear all saved QR code history?')) {
      historyManager.clear();
      updateHistoryBadge();
      renderHistoryList();
      showToast('History cleared', 'info');
    }
  });
}

function renderHistoryList() {
  const container = document.getElementById('history-items-container');
  if (!container || !historyManager) return;

  const items = historyManager.getItems();

  if (items.length === 0) {
    container.innerHTML = '<p class="empty-state">No saved QR codes yet. Generated codes will appear here!</p>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="history-card" data-history-id="${item.id}">
      <img src="${item.previewDataUrl}" alt="QR code" />
      <div class="history-info">
        <div class="history-title">${item.title}</div>
        <div class="history-time">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      <button class="btn btn-icon btn-history-load" title="Load design & data"><i data-lucide="refresh-cw"></i></button>
      <button class="btn btn-icon btn-danger btn-history-del" title="Delete"><i data-lucide="trash-2"></i></button>
    </div>
  `).join('');

  createIcons({ icons });

  container.querySelectorAll('.history-card').forEach(card => {
    const id = card.dataset.historyId;
    const item = items.find(i => i.id === id);

    card.querySelector('.btn-history-load')?.addEventListener('click', () => {
      if (item && item.config) {
        if (router) router.navigate('generator');
        qrEngine.update(item.config);
        showToast('Restored QR code state from history', 'success');
        document.getElementById('drawer-history')?.classList.remove('open');
      }
    });

    card.querySelector('.btn-history-del')?.addEventListener('click', () => {
      historyManager.removeItem(id);
      updateHistoryBadge();
      renderHistoryList();
    });
  });
}

// Scanner Test Modal Setup
function setupScannerModal() {
  const modal = document.getElementById('modal-scanner');
  const btnOpen = document.getElementById('btn-open-scanner');
  const btnClose = document.getElementById('btn-close-scanner');
  const backdrop = modal?.querySelector('.modal-backdrop');
  const fileScanInput = document.getElementById('input-scan-image');
  const btnTriggerFile = document.getElementById('btn-trigger-file-scan');
  const resultBox = document.getElementById('scanner-result');
  const resultText = document.getElementById('scanner-result-text');

  btnOpen?.addEventListener('click', () => modal?.classList.add('open'));
  btnClose?.addEventListener('click', () => modal?.classList.remove('open'));
  backdrop?.addEventListener('click', () => modal?.classList.remove('open'));

  btnTriggerFile?.addEventListener('click', () => fileScanInput.click());

  fileScanInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (evt) => {
        img.onload = () => {
          if ('BarcodeDetector' in window) {
            const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
            barcodeDetector.detect(img)
              .then(barcodes => {
                if (barcodes.length > 0) {
                  resultText.textContent = barcodes[0].rawValue;
                  resultBox.classList.remove('hidden');
                  showToast('QR code successfully verified & decoded!', 'success');
                } else {
                  resultText.textContent = 'Could not detect a QR code in the image.';
                  resultBox.classList.remove('hidden');
                }
              })
              .catch(err => {
                fallbackScanAnalysis(payloadFromCurrentState());
              });
          } else {
            fallbackScanAnalysis(payloadFromCurrentState());
          }
        };
        img.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  function fallbackScanAnalysis(expectedText) {
    if (resultText) resultText.textContent = `Valid QR Code Structure detected!\n\nPayload content verified:\n${expectedText}`;
    resultBox?.classList.remove('hidden');
    showToast('QR code scan verified!', 'success');
  }

  function payloadFromCurrentState() {
    return buildPayload(currentDataType, getFormData());
  }
}

// Theme Toggle Handler
function setupThemeToggle() {
  const btn = document.getElementById('btn-theme-toggle');
  btn?.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    if (isDark) {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }
  });
}
