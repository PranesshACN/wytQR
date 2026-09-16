import { createIcons, icons } from 'lucide';
import QRCodeStyling from 'qr-code-styling';

export function renderLandingPage(container, onNavigate, onWhitePassLogin, isLoggedIn = false) {
  if (!container) return;

  container.innerHTML = `
    <!-- Landing Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <i data-lucide="sparkles"></i>
          <span>Next-Gen QR Code Design Engine</span>
        </div>
        <h1 class="hero-title">
          Create <span class="gradient-text">Stunning, Custom</span> QR Codes in Seconds
        </h1>
        <p class="hero-description">
          Transform boring black-and-white QR codes into vibrant, branded masterpieces with linear gradients, custom dot shapes, logo overlays, and 4K vector SVG exports.
        </p>

        <div class="hero-cta-buttons">
          <button id="btn-hero-generator" class="btn btn-primary btn-large">
            <i data-lucide="qr-code"></i>
            <span>${isLoggedIn ? 'Go to QR Studio' : 'Get Started'}</span>
          </button>
          <button id="btn-hero-sso" class="btn btn-sso btn-large">
            <div class="sso-icon">W</div>
            <span>${isLoggedIn ? 'Account Active' : 'Sign In with WhitePass'}</span>
          </button>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <strong>4K+</strong>
            <span>High-Res Export</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <strong>100%</strong>
            <span>Vector SVG Support</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <strong>1-Click</strong>
            <span>Batch Zip Generation</span>
          </div>
        </div>
      </div>

      <!-- Hero Interactive Mini QR Demo Widget -->
      <div class="hero-demo-widget">
        <div class="demo-card-frame">
          <div class="demo-card-header">
            <span class="demo-badge">Interactive Live Demo</span>
            <span class="demo-dot"></span>
          </div>

          <div class="demo-canvas-box" id="landing-demo-canvas"></div>

          <div class="demo-input-box">
            <i data-lucide="link-2"></i>
            <input type="text" id="landing-demo-input" value="https://antigravity.google.com" placeholder="Type any website or text..." />
          </div>

          <div class="demo-quick-presets" id="landing-demo-presets">
            <button class="demo-preset-btn active" data-color="#6366f1" data-end="#a855f7" data-shape="rounded">Neon</button>
            <button class="demo-preset-btn" data-color="#f6d365" data-end="#fda085" data-shape="classy">Gold</button>
            <button class="demo-preset-btn" data-color="#10b981" data-end="#06b6d4" data-shape="dots">Mint</button>
            <button class="demo-preset-btn" data-color="#ff0844" data-end="#ffb199" data-shape="extra-rounded">Sunset</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header text-center">
        <h2>Everything You Need for <span class="gradient-text">Pro QR Codes</span></h2>
        <p>Built for creators, businesses, designers, and developers.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="palette"></i></div>
          <h3>Gradients & Custom Shapes</h3>
          <p>Choose from linear gradients, custom dot patterns (rounded, classy, dots, diamond), and eye corner frames.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="image"></i></div>
          <h3>Brand Logo Overlays</h3>
          <p>Embed your company logo or vector icon in the center with automatic error correction scaling.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="file-code"></i></div>
          <h3>Vector SVG & 4K PNG Export</h3>
          <p>Download scalable SVG vector files for printing posters, business cards, merchandise, and digital displays.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="layers"></i></div>
          <h3>Bulk Batch Generator</h3>
          <p>Paste a list of URLs or upload CSV files to generate dozens of customized QR codes at once in a ZIP archive.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="scan"></i></div>
          <h3>Built-in QR Scanner Test</h3>
          <p>Instantly test and decode generated QR codes directly in your browser using camera or file upload verification.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><i data-lucide="shield-check"></i></div>
          <h3>WhitePass SSO Cloud Sync</h3>
          <p>Seamlessly sign in with your WhitePass account to sync your saved QR code history across all devices.</p>
        </div>
      </div>
    </section>

    <!-- Preset Showcase Section -->
    <section class="showcase-section">
      <div class="section-header text-center">
        <h2>Curated <span class="gradient-text">Design Themes</span></h2>
        <p>Switch between handcrafted themes with 1 click in the Studio.</p>
      </div>

      <div class="showcase-grid">
        <div class="showcase-card theme-cyberpunk">
          <div class="showcase-badge">Cyberpunk Neon</div>
          <p>Electric cyan dots with magenta eye frame accents on dark glass.</p>
        </div>
        <div class="showcase-card theme-gold">
          <div class="showcase-badge">Midnight Luxury</div>
          <p>Shimmering gold linear gradient with classy corner eye frames.</p>
        </div>
        <div class="showcase-card theme-sunset">
          <div class="showcase-badge">Sunset Glow</div>
          <p>Vibrant orange to purple gradient with soft rounded dots.</p>
        </div>
        <div class="showcase-card theme-emerald">
          <div class="showcase-badge">Emerald Tech</div>
          <p>Bio-tech mint green matrix dots on deep slate navy.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="cta-banner">
      <div class="cta-banner-content">
        <h2>Ready to Create Your Custom QR Code?</h2>
        <p>Sign in with your WhitePass SSO account to unlock the QR Code Generator Studio & Cloud Sync!</p>
        <div class="cta-actions">
          <button id="btn-cta-launch" class="btn btn-primary btn-large">
            <i data-lucide="sparkles"></i>
            <span>${isLoggedIn ? 'Open QR Studio' : 'Sign In to Start'}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="footer-left">
        <span class="footer-brand">WYT QR Studio</span>
        <p>© 2026 WYT Network. Powered by WhitePass SSO.</p>
      </div>
      <div class="footer-links">
        <a href="#home">Home</a>
        <a href="#login">WhitePass SSO Login</a>
      </div>
    </footer>
  `;

  createIcons({ icons });

  // Attach button event handlers
  document.getElementById('btn-hero-generator')?.addEventListener('click', () => {
    onNavigate(isLoggedIn ? 'generator' : 'login');
  });

  document.getElementById('btn-cta-launch')?.addEventListener('click', () => {
    onNavigate(isLoggedIn ? 'generator' : 'login');
  });

  document.getElementById('btn-hero-sso')?.addEventListener('click', () => {
    onNavigate(isLoggedIn ? 'generator' : 'login');
  });

  // Initialize interactive demo widget
  setupDemoWidget();
}

function setupDemoWidget() {
  const canvasContainer = document.getElementById('landing-demo-canvas');
  const input = document.getElementById('landing-demo-input');
  const presetBtns = document.querySelectorAll('#landing-demo-presets .demo-preset-btn');

  if (!canvasContainer || !input) return;

  try {
    const QRClass = typeof QRCodeStyling === 'function' ? QRCodeStyling : (QRCodeStyling.default || QRCodeStyling);
    const demoQR = new QRClass({
      width: 220,
      height: 220,
      type: 'canvas',
      data: input.value || 'https://antigravity.google.com',
      margin: 6,
      dotsOptions: {
        color: '#6366f1',
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#6366f1' },
            { offset: 1, color: '#a855f7' }
          ]
        }
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#4f46e5', type: 'extra-rounded' },
      cornersDotOptions: { color: '#a855f7', type: 'dot' }
    });

    canvasContainer.innerHTML = '';
    demoQR.append(canvasContainer);

    input.addEventListener('input', (e) => {
      demoQR.update({ data: e.target.value || 'https://antigravity.google.com' });
    });

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const color = btn.dataset.color;
        const endColor = btn.dataset.end;
        const shape = btn.dataset.shape;

        demoQR.update({
          dotsOptions: {
            type: shape,
            gradient: {
              type: 'linear',
              rotation: 45,
              colorStops: [
                { offset: 0, color: color },
                { offset: 1, color: endColor }
              ]
            }
          },
          cornersSquareOptions: { color: color, type: 'extra-rounded' },
          cornersDotOptions: { color: endColor, type: 'dot' }
        });
      });
    });
  } catch (err) {
    console.error('Demo widget initialization error:', err);
  }
}
