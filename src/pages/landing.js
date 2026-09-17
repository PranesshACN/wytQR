import { createIcons, icons } from 'lucide';
import QRCodeStyling from 'qr-code-styling';

export function renderLandingPage(container, onNavigate, onWhitePassLogin, isLoggedIn = false) {
  if (!container) return;

  container.innerHTML = `
    <div class="landing-wrapper dark:bg-[#070a12] dark:text-slate-100 bg-[#faf8ff] text-slate-900 font-body-md antialiased selection:bg-primary-fixed selection:text-primary overflow-x-hidden min-h-screen">
      
      <!-- Ambient Glow Elements -->
      <div class="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[840px] h-[340px] bg-gradient-to-tr dark:from-indigo-600/20 dark:to-purple-500/10 from-primary-fixed/50 to-surface-container-high/60 blur-[130px] -z-10 rounded-full"></div>

      <!-- HERO SECTION -->
      <section class="relative pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex flex-col items-center text-center max-w-4xl mx-auto">
            <!-- Announcement Pill -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-slate-900/80 dark:border-slate-800 dark:text-indigo-400 bg-surface-container border border-outline-variant/60 mb-6 shadow-sm">
              <span class="inline-block w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
              <span class="text-label-sm font-label-sm font-semibold uppercase tracking-wider">NEW: Dynamic AI Design &amp; Scan Tracking 2.0</span>
              <span class="material-symbols-outlined text-[14px] dark:text-slate-400 text-slate-500">arrow_forward</span>
            </div>

            <!-- Bold Headline -->
            <h1 class="text-display-lg-mobile sm:text-display-lg font-display-lg dark:text-white text-slate-900 tracking-tight mb-6">
              Smart, Dynamic <br class="hidden sm:inline"/>
              <span class="bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 from-primary via-primary-container to-secondary-container bg-clip-text text-transparent">QR Codes That</span> <br class="hidden sm:inline"/>
              Never Expire.
            </h1>

            <!-- Supporting Copy -->
            <p class="text-body-lg font-body-lg dark:text-slate-400 text-slate-600 max-w-2xl mb-8 leading-relaxed">
              Architect, deploy, and reroute intelligent vector QR campaigns on the fly. Update destination targets post-print, embed enterprise visual identity, and monitor scan telemetry in real-time.
            </p>

            <!-- Primary & Secondary CTA Cluster -->
            <div class="flex flex-wrap items-center justify-center gap-4 mb-12 w-full sm:w-auto">
              <button id="btn-hero-launch" class="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary text-white font-headline-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary-container transition-all">
                <span class="material-symbols-outlined text-[20px]">qr_code</span>
                <span>${isLoggedIn ? 'Launch Live Studio' : 'Get Started Free'}</span>
              </button>
              <a href="#analytics" id="btn-hero-analytics" class="w-full sm:w-auto px-8 py-3.5 rounded-lg dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-white bg-white hover:bg-surface-container-low border border-slate-300 text-slate-800 font-label-md font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
                <span class="material-symbols-outlined text-[18px] text-primary">insights</span>
                <span>View Analytics Demo</span>
              </a>
            </div>

            <!-- Metrics Strip -->
            <div class="grid grid-cols-3 gap-8 pt-8 border-t dark:border-slate-800 border-slate-200 w-full max-w-2xl justify-items-center">
              <div>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 font-bold">10M+</div>
                <div class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-primary">trending_up</span> Scans Monthly
                </div>
              </div>
              <div>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 font-bold">99.99%</div>
                <div class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-primary">verified</span> Uptime SLA
                </div>
              </div>
              <div>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 font-bold">GDPR</div>
                <div class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-[14px] text-primary">shield</span> Zero-PII Strict
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CLIENT TRUST STRIP -->
      <section class="border-y dark:border-slate-800/80 dark:bg-[#070a12]/80 border-slate-200/80 bg-white/70 py-10">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <p class="text-center text-label-sm font-label-sm dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-8 font-semibold">
            Trusted by over 45,000+ modern teams &amp; marketing agencies globally
          </p>
          <div class="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-12 opacity-85 hover:opacity-100 transition-all duration-300">
            <div class="flex items-center gap-2 dark:text-white text-slate-800 font-headline-md font-bold tracking-tighter text-xl">
              <span class="material-symbols-outlined text-primary text-[26px]">credit_card</span> Stripe
            </div>
            <div class="flex items-center gap-2 dark:text-white text-slate-800 font-headline-md font-bold tracking-tight text-xl">
              <span class="material-symbols-outlined text-primary-container text-[26px]">travel</span> airbnb
            </div>
            <div class="flex items-center gap-2 dark:text-white text-slate-800 font-headline-md font-bold tracking-tight text-xl">
              <span class="material-symbols-outlined text-primary text-[26px]">graphic_eq</span> Spotify
            </div>
            <div class="flex items-center gap-2 dark:text-white text-slate-800 font-headline-md font-bold tracking-tight text-xl">
              <span class="material-symbols-outlined text-primary-container text-[26px]">storefront</span> shopify
            </div>
            <div class="flex items-center gap-2 dark:text-white text-slate-800 font-headline-md font-bold tracking-widest text-xl">
              <span class="material-symbols-outlined text-primary text-[26px]">local_taxi</span> Uber
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE CORE CAPABILITIES / BENTO VALUE PILLARS -->
      <section class="py-24 relative" id="features">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <!-- Section Header -->
          <div class="max-w-3xl mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Architectural Edge</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2 mb-4">Precision Engineering For High-Yield Print &amp; Digital Media</h2>
            <p class="text-body-lg font-body-lg dark:text-slate-400 text-slate-600">
              Say goodbye to dead static links. ScanPulse provides granular control over the physical-to-digital bridge with programmatic routing and analytics.
            </p>
          </div>
          <!-- Bento Grid Layout -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            <!-- Pillar 1: Dynamic Redirection (7 cols) -->
            <div class="md:col-span-7 glass-panel rounded-2xl p-8 flex flex-col justify-between dark:bg-[#0d1424]/75 dark:border-white/10 dark:hover:border-indigo-500/50 bg-white border border-slate-200 relative overflow-hidden group hover:border-primary hover:shadow-lg transition-all">
              <div class="relative z-10">
                <div class="w-12 h-12 rounded-xl dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400 bg-primary-fixed border border-primary/20 text-primary flex items-center justify-center mb-6">
                  <span class="material-symbols-outlined text-[28px]">alt_route</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Dynamic URL Redirection</h3>
                <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600 max-w-lg mb-6">
                  Already printed 50,000 retail boxes or exhibition stands? Swap your landing destination instantly from your dashboard without ever replacing physical collateral.
                </p>
              </div>
              <!-- Interactive Micro Mockup -->
              <div class="dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl p-4 border border-slate-200 relative z-10 font-code-sm text-code-sm">
                <div class="flex items-center justify-between pb-2 dark:border-white/10 border-slate-200 mb-3 text-label-sm">
                  <span class="dark:text-slate-400 text-slate-500 font-medium">Active Route</span>
                  <span class="text-emerald-500 font-semibold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> 200 OK — Latency 14ms</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="px-2 py-0.5 rounded bg-primary-fixed text-primary text-xs font-semibold">GET</span>
                  <span class="dark:text-slate-500 text-slate-400 line-through text-xs sm:text-sm">scanpulse.io/v/spring-sale-24</span>
                  <span class="material-symbols-outlined text-[16px] text-primary">arrow_forward</span>
                  <span class="text-primary font-semibold text-xs sm:text-sm">scanpulse.io/v/summer-vip-access</span>
                </div>
              </div>
              <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            <!-- Pillar 2: Real-Time Scan Analytics (5 cols) -->
            <div class="md:col-span-5 glass-panel rounded-2xl p-8 flex flex-col justify-between dark:bg-[#0d1424]/75 dark:border-white/10 dark:hover:border-indigo-500/50 bg-white border border-slate-200 relative overflow-hidden group hover:border-primary hover:shadow-lg transition-all">
              <div>
                <div class="w-12 h-12 rounded-xl dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400 bg-primary-fixed border border-primary/20 text-primary flex items-center justify-center mb-6">
                  <span class="material-symbols-outlined text-[28px]">monitoring</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Live Scanned Telemetry</h3>
                <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600 mb-6">
                  Track scan timestamps, operating systems (iOS/Android), exact geographic cities, and referral channels with zero privacy infringements.
                </p>
              </div>
              <div class="dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl p-4 border border-slate-200">
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-label-sm dark:text-slate-400 text-slate-500 font-medium">Real-Time Scan Surge</div>
                    <div class="text-headline-md font-headline-md dark:text-white text-slate-900 mt-0.5 font-bold">+438.4%</div>
                  </div>
                  <div class="flex items-end gap-1.5 h-10">
                    <div class="w-2 bg-primary/20 rounded-t h-3"></div>
                    <div class="w-2 bg-primary/35 rounded-t h-5"></div>
                    <div class="w-2 bg-primary/50 rounded-t h-7"></div>
                    <div class="w-2 bg-primary rounded-t h-10"></div>
                    <div class="w-2 bg-primary-container rounded-t h-8"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pillar 3: Bespoke Visual Identity (5 cols) -->
            <div class="md:col-span-5 glass-panel rounded-2xl p-8 flex flex-col justify-between dark:bg-[#0d1424]/75 dark:border-white/10 dark:hover:border-indigo-500/50 bg-white border border-slate-200 relative overflow-hidden group hover:border-primary hover:shadow-lg transition-all">
              <div>
                <div class="w-12 h-12 rounded-xl dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400 bg-secondary-fixed border border-secondary/20 text-secondary flex items-center justify-center mb-6">
                  <span class="material-symbols-outlined text-[28px]">palette</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Bespoke Visual Identity</h3>
                <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600 mb-6">
                  Embed enterprise emblems, set dual-gradient dots, design custom corner finder eyes, and deliver on custom branded subdomains like <code class="text-primary font-code-sm dark:bg-slate-800 bg-primary-fixed/40 px-1 py-0.5 rounded">go.brand.co</code>.
                </p>
              </div>
              <div class="flex items-center gap-3 p-3 dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl border border-slate-200">
                <div class="w-10 h-10 rounded-lg dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 flex items-center justify-center text-primary shadow-sm">
                  <span class="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <div class="text-label-md font-medium dark:text-white text-slate-900">SSL Signed Branded Domains</div>
                  <div class="text-body-sm dark:text-slate-400 text-slate-500 font-code-sm">qr.acme-corp.com/*</div>
                </div>
              </div>
            </div>

            <!-- Pillar 4: Enterprise Guardrails (7 cols) -->
            <div class="md:col-span-7 glass-panel rounded-2xl p-8 flex flex-col justify-between dark:bg-[#0d1424]/75 dark:border-white/10 dark:hover:border-indigo-500/50 bg-white border border-slate-200 relative overflow-hidden group hover:border-primary hover:shadow-lg transition-all">
              <div>
                <div class="w-12 h-12 rounded-xl dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400 bg-primary-fixed border border-primary/20 text-primary flex items-center justify-center mb-6">
                  <span class="material-symbols-outlined text-[28px]">security</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Enterprise Governance &amp; Scalability</h3>
                <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600 max-w-xl mb-6">
                  Generate 100,000 unique serialized QR matrices via REST API or CSV bulk engine. Apply passcodes, scan caps, and automatic expiry dates to confidential internal documents.
                </p>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="p-3 dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl border border-slate-200 text-center">
                  <span class="material-symbols-outlined text-primary text-[20px] mb-1">database</span>
                  <div class="text-label-sm font-semibold dark:text-white text-slate-900">Bulk CSV Batch</div>
                </div>
                <div class="p-3 dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl border border-slate-200 text-center">
                  <span class="material-symbols-outlined text-primary text-[20px] mb-1">key</span>
                  <div class="text-label-sm font-semibold dark:text-white text-slate-900">Password Lock</div>
                </div>
                <div class="p-3 dark:bg-[#070a12] dark:border-white/10 bg-surface-container-low rounded-xl border border-slate-200 text-center">
                  <span class="material-symbols-outlined text-primary text-[20px] mb-1">timer_off</span>
                  <div class="text-label-sm font-semibold dark:text-white text-slate-900">Auto-Expiration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- VISUAL ANALYTICS PREVIEW SECTION -->
      <section class="py-24 dark:bg-[#070a12]/80 bg-surface-container-low/60 border-t dark:border-slate-800 border-slate-200/80 relative" id="analytics">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Real-Time Intelligence</span>
              <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2">Comprehensive Scan Telemetry Dashboard</h2>
            </div>
            <div class="mt-4 md:mt-0 flex items-center gap-3">
              <span class="text-label-sm dark:text-slate-400 text-slate-500 font-medium">Live streaming from:</span>
              <span class="px-3 py-1 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 text-label-sm font-semibold flex items-center gap-1.5 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 4,821 active nodes
              </span>
            </div>
          </div>

          <!-- Dashboard Mock Frame -->
          <div class="glass-panel dark:bg-[#0d1424]/90 dark:border-white/10 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl">
            <!-- Header Ribbon inside Dashboard -->
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b dark:border-white/10 border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg dark:bg-indigo-500/20 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined">campaign</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-headline-md font-headline-md dark:text-white text-slate-900 font-bold">Summer Music Festival 2025</h4>
                    <span class="px-2 py-0.5 rounded text-xs dark:bg-emerald-500/20 dark:text-emerald-300 bg-emerald-100 text-emerald-800 font-code-sm font-semibold">CAMPAIGN ACTIVE</span>
                  </div>
                  <span class="text-body-sm dark:text-slate-400 text-slate-500 font-code-sm">ID: SP-9942-US-WEST • Created 4 days ago</span>
                </div>
              </div>
              <div class="flex items-center gap-2 font-code-sm">
                <button class="px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:text-slate-300 dark:border-white/10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-label-sm border border-slate-200 flex items-center gap-1 transition-colors">
                  <span class="material-symbols-outlined text-[16px]">calendar_today</span> Last 30 Days
                </button>
                <button class="px-3 py-1.5 rounded-lg bg-primary text-white text-label-sm font-semibold flex items-center gap-1 shadow-sm hover:bg-primary-container transition-colors">
                  <span class="material-symbols-outlined text-[16px]">file_download</span> Export CSV
                </button>
              </div>
            </div>

            <!-- Metric Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <div class="dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">Total Gross Scans</span>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-1 font-bold">284,910</div>
                <div class="text-label-sm text-emerald-500 flex items-center gap-1 mt-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">arrow_upward</span> +24.8% vs last week
                </div>
              </div>
              <div class="dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">Unique Visitors</span>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-1 font-bold">219,430</div>
                <div class="text-label-sm text-primary flex items-center gap-1 mt-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">group</span> 77.01% unique index
                </div>
              </div>
              <div class="dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">Conversion / Action Rate</span>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-1 font-bold">38.4%</div>
                <div class="text-label-sm text-primary flex items-center gap-1 mt-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">ads_click</span> Ticket checkout starts
                </div>
              </div>
              <div class="dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">Peak Velocity Hour</span>
                <div class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-1 font-bold">20:00 - 22:30</div>
                <div class="text-label-sm dark:text-slate-400 text-slate-500 flex items-center gap-1 mt-1 font-medium">
                  <span class="material-symbols-outlined text-[14px]">schedule</span> Evening gate entry
                </div>
              </div>
            </div>

            <!-- Dual Chart / Telemetry View -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <!-- Velocity Graph Simulation (7 cols) -->
              <div class="lg:col-span-7 dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-label-md font-semibold dark:text-white text-slate-900">Hourly Scan Distribution</span>
                  <span class="text-label-sm dark:text-slate-400 text-slate-500 font-code-sm">Normalized UTC</span>
                </div>
                <!-- Bars -->
                <div class="h-44 w-full flex items-end justify-between gap-1.5 pt-4">
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[15%]"></div>
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[10%]"></div>
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[18%]"></div>
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[32%]"></div>
                  <div class="flex-1 dark:bg-indigo-500/50 hover:bg-indigo-500 bg-primary-fixed/80 rounded-t transition-all h-[45%]"></div>
                  <div class="flex-1 dark:bg-indigo-500/70 hover:bg-indigo-500 bg-primary-fixed rounded-t transition-all h-[60%]"></div>
                  <div class="flex-1 bg-primary-container/70 hover:bg-primary rounded-t transition-all h-[80%]"></div>
                  <div class="flex-1 bg-primary rounded-t shadow-sm transition-all h-[100%]"></div>
                  <div class="flex-1 bg-primary-container rounded-t transition-all h-[75%]"></div>
                  <div class="flex-1 bg-primary-fixed-dim rounded-t transition-all h-[55%]"></div>
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[30%]"></div>
                  <div class="flex-1 dark:bg-slate-800 dark:hover:bg-indigo-500/40 bg-slate-200 hover:bg-primary-fixed rounded-t transition-all h-[20%]"></div>
                </div>
                <div class="flex justify-between text-code-sm dark:text-slate-400 text-slate-500 border-t dark:border-white/10 border-slate-200 pt-2 mt-2">
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span class="text-primary font-bold">20:00 (Peak)</span>
                  <span>23:59</span>
                </div>
              </div>

              <!-- Geolocation Breakdown (5 cols) -->
              <div class="lg:col-span-5 dark:bg-[#070a12]/70 dark:border-white/10 bg-slate-50 rounded-xl p-5 border border-slate-200/80">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-label-md font-semibold dark:text-white text-slate-900">Top Scan Geo Hotspots</span>
                  <span class="text-label-sm text-primary font-semibold">Live GPS</span>
                </div>
                <div class="space-y-3 font-code-sm text-body-sm">
                  <div>
                    <div class="flex justify-between dark:text-slate-300 text-slate-800 mb-1 font-medium">
                      <span>1. Los Angeles, USA</span>
                      <span class="font-bold dark:text-white text-slate-900">114,320 (40.1%)</span>
                    </div>
                    <div class="w-full h-2 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
                      <div class="bg-primary h-full rounded-full" style="width: 40.1%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between dark:text-slate-300 text-slate-800 mb-1 font-medium">
                      <span>2. London, United Kingdom</span>
                      <span class="font-bold dark:text-white text-slate-900">62,450 (21.9%)</span>
                    </div>
                    <div class="w-full h-2 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
                      <div class="bg-primary-container h-full rounded-full" style="width: 21.9%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between dark:text-slate-300 text-slate-800 mb-1 font-medium">
                      <span>3. Berlin, Germany</span>
                      <span class="font-bold dark:text-white text-slate-900">48,100 (16.8%)</span>
                    </div>
                    <div class="w-full h-2 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
                      <div class="bg-secondary h-full rounded-full" style="width: 16.8%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between dark:text-slate-300 text-slate-800 mb-1 font-medium">
                      <span>4. Tokyo, Japan</span>
                      <span class="font-bold dark:text-white text-slate-900">34,920 (12.2%)</span>
                    </div>
                    <div class="w-full h-2 dark:bg-slate-800 bg-slate-200 rounded-full overflow-hidden">
                      <div class="bg-secondary-fixed-dim h-full rounded-full" style="width: 12.2%"></div>
                    </div>
                  </div>
                </div>

                <!-- Device Distribution Mini Strip -->
                <div class="mt-4 pt-3 border-t dark:border-white/10 border-slate-200 flex items-center justify-between text-label-sm dark:text-slate-400 text-slate-600">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] dark:text-slate-400 text-slate-500">phone_iphone</span> iOS 64%</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] dark:text-slate-400 text-slate-500">android</span> Android 33%</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] dark:text-slate-400 text-slate-500">laptop_mac</span> Other 3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- INDUSTRY SOLUTIONS / USE CASES GRID -->
      <section class="py-24" id="solutions">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Industry Deployments</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2 mb-4">Engineered For Physical-First Verticals</h2>
            <p class="text-body-lg font-body-lg dark:text-slate-400 text-slate-600">
              From fast-moving consumer packaged goods to multi-hall conference ticketing, ScanPulse bridges physical touchpoints to digital conversions.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-panel rounded-xl p-6 dark:bg-[#0d1424]/75 dark:border-white/10 bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-lg dark:bg-indigo-500/10 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-2">Retail &amp; Packaging</h3>
                <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 mb-4 leading-relaxed">
                  Embed on labels and secondary cartons for instant warranty activation, batch authentication, and single-tap reorders.
                </p>
              </div>
              <div class="text-label-sm text-primary font-semibold flex items-center gap-1 mt-2">
                Explore Retail Suite <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            <div class="glass-panel rounded-xl p-6 dark:bg-[#0d1424]/75 dark:border-white/10 bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-lg dark:bg-indigo-500/10 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined">restaurant_menu</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-2">Hospitality &amp; Dining</h3>
                <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 mb-4 leading-relaxed">
                  Deliver zero-friction mobile digital menus with instant time-of-day breakfast/dinner switches without reprinting table acrylics.
                </p>
              </div>
              <div class="text-label-sm text-primary font-semibold flex items-center gap-1 mt-2">
                Explore Dining Suite <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            <div class="glass-panel rounded-xl p-6 dark:bg-[#0d1424]/75 dark:border-white/10 bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-lg dark:bg-purple-500/10 dark:text-purple-400 bg-secondary-fixed text-secondary flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined">confirmation_number</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-2">Events &amp; Ticketing</h3>
                <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 mb-4 leading-relaxed">
                  Encrypted 1-time scanning passes, attendee badge synchronization, and instant programmatic conference schedule updates.
                </p>
              </div>
              <div class="text-label-sm text-primary font-semibold flex items-center gap-1 mt-2">
                Explore Event Engine <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            <div class="glass-panel rounded-xl p-6 dark:bg-[#0d1424]/75 dark:border-white/10 bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-lg dark:bg-indigo-500/10 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined">view_carousel</span>
                </div>
                <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-2">Outdoor &amp; Billboards</h3>
                <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 mb-4 leading-relaxed">
                  Ultra-high density vector EPS/SVG files optimized for massive LED billboards and subway posters readable from 30+ feet.
                </p>
              </div>
              <div class="text-label-sm text-primary font-semibold flex items-center gap-1 mt-2">
                Explore Large Formats <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP-BY-STEP WORKFLOW -->
      <section class="py-24 dark:bg-[#070a12]/80 bg-surface-container-low/50 border-y dark:border-slate-800 border-slate-200/80">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Frictionless Lifecycle</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2 mb-4">Create, Customize, Print &amp; Track in 3 Simple Steps</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm hover:shadow-md transition-shadow">
              <div class="text-headline-lg font-headline-lg font-bold dark:text-slate-600 text-slate-300 mb-4">01</div>
              <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Target Payload Setup</h3>
              <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600">
                Input URLs, contact cards, PDFs, or app store links. Bind them to a custom short domain that guarantees longevity even if servers change.
              </p>
            </div>

            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm hover:shadow-md transition-shadow">
              <div class="text-headline-lg font-headline-lg font-bold text-primary mb-4">02</div>
              <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Precision Design Lab</h3>
              <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600">
                Infuse corporate color gradients, fine-tune error correction margins (up to 30%), insert SVG logos, and specify high-contrast finder eyes.
              </p>
            </div>

            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm hover:shadow-md transition-shadow">
              <div class="text-headline-lg font-headline-lg font-bold text-primary-container mb-4">03</div>
              <h3 class="text-headline-md font-headline-md dark:text-white text-slate-900 mb-3">Reroute &amp; Optimize</h3>
              <p class="text-body-md font-body-md dark:text-slate-400 text-slate-600">
                Download print-ready CMYK PDFs or vector SVGs. As scans pour in, optimize URLs and analyze geographic cohorts in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- TRANSPARENT PRICING SECTION -->
      <section class="py-24 relative" id="pricing">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Predictable Investment</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2 mb-4">Simple, Transparent Pricing For Any Scale</h2>
            <p class="text-body-lg font-body-lg dark:text-slate-400 text-slate-600">
              Unlimited scans on all dynamic codes. No hidden scan throttles or surprise invoices.
            </p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <!-- Tier 1: Free Starter -->
            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span class="text-label-md font-label-md dark:text-slate-400 text-slate-500 uppercase font-semibold">Starter Studio</span>
                <div class="text-display-lg font-display-lg dark:text-white text-slate-900 mt-3 mb-1">$0</div>
                <p class="text-body-sm dark:text-slate-400 text-slate-600 mb-6">Perfect for small projects, creators, and testing dynamic routing.</p>
                <ul class="space-y-3 pt-6 border-t dark:border-white/10 border-slate-200 text-body-sm dark:text-slate-300 text-slate-700">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> 5 Dynamic QR Codes
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Unlimited Static QR Codes
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Unlimited Scans (No throttling)
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Standard PNG / JPG Exports
                  </li>
                </ul>
              </div>
              <button id="btn-pricing-free" class="w-full mt-8 py-3 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-white/10 bg-surface-container hover:bg-surface-container-high text-slate-900 font-label-md font-semibold transition-colors border border-slate-300">
                Get Started Free
              </button>
            </div>

            <!-- Tier 2: Pro Marketer (Featured) -->
            <div class="glass-card-interactive rounded-2xl p-8 border-2 border-primary dark:bg-[#0d1424] dark:border-indigo-500 relative flex flex-col justify-between shadow-xl ring-4 ring-primary/5">
              <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-label-sm font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular Choice
              </div>
              <div>
                <span class="text-label-md font-label-md text-primary font-semibold uppercase">Pro Marketer</span>
                <div class="flex items-baseline gap-1 mt-3 mb-1">
                  <span class="text-display-lg font-display-lg dark:text-white text-slate-900">$12</span>
                  <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">/ month billed annually</span>
                </div>
                <p class="text-body-sm dark:text-slate-400 text-slate-600 mb-6">For growth marketers, agencies, and regional retail brands.</p>
                <ul class="space-y-3 pt-6 border-t dark:border-white/10 border-slate-100 text-body-sm dark:text-slate-300 text-slate-700">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> 100 Dynamic QR Codes
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Unlimited Vector SVG &amp; EPS Exports
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Custom Logo &amp; Brand Colors
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Real-Time Geo &amp; Device Analytics
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> 1 Custom Branded Domain (<code class="font-code-sm text-xs text-primary dark:bg-slate-800 bg-primary-fixed/40 px-1 py-0.5 rounded">qr.brand.com</code>)
                  </li>
                </ul>
              </div>
              <button id="btn-pricing-pro" class="w-full mt-8 py-3 rounded-lg bg-primary text-white hover:bg-primary-container font-headline-md text-label-md font-label-md font-semibold shadow-md shadow-primary/25 transition-all">
                Start 14-Day Free Pro Trial
              </button>
            </div>

            <!-- Tier 3: Enterprise Team -->
            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span class="text-label-md font-label-md dark:text-slate-400 text-slate-500 uppercase font-semibold">Enterprise Hub</span>
                <div class="flex items-baseline gap-1 mt-3 mb-1">
                  <span class="text-display-lg font-display-lg dark:text-white text-slate-900">$49</span>
                  <span class="text-body-sm dark:text-slate-400 text-slate-500 font-medium">/ month billed annually</span>
                </div>
                <p class="text-body-sm dark:text-slate-400 text-slate-600 mb-6">Unconstrained API access, bulk generation, and enterprise SLA.</p>
                <ul class="space-y-3 pt-6 border-t dark:border-white/10 border-slate-200 text-body-sm dark:text-slate-300 text-slate-700">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Unlimited Dynamic QR Codes
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Batch Engine (100k via CSV or API)
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> Dedicated Custom Subdomains &amp; SSO
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> SOC2 Type II &amp; GDPR Guarantee
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">check_circle</span> 99.99% Guaranteed Uptime SLA
                  </li>
                </ul>
              </div>
              <button id="btn-pricing-enterprise" class="w-full mt-8 py-3 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-white/10 bg-surface-container hover:bg-surface-container-high text-slate-900 font-label-md font-semibold transition-colors border border-slate-300">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- SOCIAL PROOF & REVIEWS -->
      <section class="py-24 dark:bg-[#070a12]/80 bg-surface-container-low/50 border-t dark:border-slate-800 border-slate-200/80">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Endorsements</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2">Loved by Modern Marketing &amp; Operations Leads</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div class="flex items-center gap-1 text-amber-500 mb-4">
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                </div>
                <p class="text-body-md font-body-md dark:text-slate-300 text-slate-700 mb-6 italic">
                  "We printed half a million beverage cans with ScanPulse QR matrices. When our promotional tour sponsor changed last minute, we swapped URLs in 30 seconds. Literal lifesaver."
                </p>
              </div>
              <div class="flex items-center gap-3 pt-4 border-t dark:border-white/10 border-slate-100">
                <div class="w-10 h-10 rounded-full dark:bg-indigo-500/20 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center font-bold text-label-md">
                  MR
                </div>
                <div>
                  <div class="text-label-md font-medium dark:text-white text-slate-900">Marcus Reyes</div>
                  <div class="text-body-sm dark:text-slate-400 text-slate-500">VP of Marketing, WaveBeverages</div>
                </div>
              </div>
            </div>

            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div class="flex items-center gap-1 text-amber-500 mb-4">
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                </div>
                <p class="text-body-md font-body-md dark:text-slate-300 text-slate-700 mb-6 italic">
                  "The vector SVG export precision is pristine. Our billboard designers usually complain about distorted pixelated QR generators, but ScanPulse codes are vector flawless."
                </p>
              </div>
              <div class="flex items-center gap-3 pt-4 border-t dark:border-white/10 border-slate-100">
                <div class="w-10 h-10 rounded-full dark:bg-purple-500/20 dark:text-purple-400 bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-label-md">
                  SL
                </div>
                <div>
                  <div class="text-label-md font-medium dark:text-white text-slate-900">Sophia Lindqvist</div>
                  <div class="text-body-sm dark:text-slate-400 text-slate-500">Creative Director, Nord Agency</div>
                </div>
              </div>
            </div>

            <div class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div class="flex items-center gap-1 text-amber-500 mb-4">
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                  <span class="material-symbols-outlined text-[18px]">star</span>
                </div>
                <p class="text-body-md font-body-md dark:text-slate-300 text-slate-700 mb-6 italic">
                  "Having actual zero-PII compliance and 99.99% uptime guarantees gave our enterprise security council total peace of mind for internal logistics."
                </p>
              </div>
              <div class="flex items-center gap-3 pt-4 border-t dark:border-white/10 border-slate-100">
                <div class="w-10 h-10 rounded-full dark:bg-slate-800 dark:text-slate-200 bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-label-md">
                  DK
                </div>
                <div>
                  <div class="text-label-md font-medium dark:text-white text-slate-900">David Kowalski</div>
                  <div class="text-body-sm dark:text-slate-400 text-slate-500">Lead Systems Architect, FinFlow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FREQUENTLY ASKED QUESTIONS (FAQ) -->
      <section class="py-24">
        <div class="max-w-4xl mx-auto px-6 md:px-8">
          <div class="text-center mb-16">
            <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Inquiries Answered</span>
            <h2 class="text-headline-lg font-headline-lg dark:text-white text-slate-900 mt-2 mb-4">Frequently Asked Questions</h2>
            <p class="text-body-lg font-body-lg dark:text-slate-400 text-slate-600">
              Everything you need to know about dynamic redirects, vector longevity, and print quality.
            </p>
          </div>
          <div class="space-y-4">
            <details class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-xl p-5 border border-slate-200 group [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm" open>
              <summary class="flex items-center justify-between font-headline-md text-headline-md dark:text-white text-slate-900 list-none font-semibold">
                <span>What happens if I need to change my QR code's destination URL after printing?</span>
                <span class="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <p class="mt-4 text-body-md font-body-md dark:text-slate-300 text-slate-600 leading-relaxed">
                With ScanPulse dynamic QR codes, you never need to reprint your physical assets. Your printed QR code encodes a secure, lightning-fast dynamic short URL. From your ScanPulse dashboard, simply change the destination link to any new web page, document, or app store payload whenever you choose. The change takes effect globally in under 1 second.
              </p>
            </details>

            <details class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-xl p-5 border border-slate-200 group [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
              <summary class="flex items-center justify-between font-headline-md text-headline-md dark:text-white text-slate-900 list-none font-semibold">
                <span>Can a dynamic QR code ever expire?</span>
                <span class="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <p class="mt-4 text-body-md font-body-md dark:text-slate-300 text-slate-600 leading-relaxed">
                No. Free and paid ScanPulse dynamic codes remain active indefinitely. We never expire codes unexpectedly or place artificial scan caps that disable links mid-campaign.
              </p>
            </details>

            <details class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-xl p-5 border border-slate-200 group [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
              <summary class="flex items-center justify-between font-headline-md text-headline-md dark:text-white text-slate-900 list-none font-semibold">
                <span>Which vector formats are provided for large format printing?</span>
                <span class="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <p class="mt-4 text-body-md font-body-md dark:text-slate-300 text-slate-600 leading-relaxed">
                We provide razor-sharp Vector SVG and CMYK-ready PDF exports alongside 300 DPI high-resolution PNGs. Vector SVGs can be blown up infinitely to building billboard scale without any pixelation or scanning degradation.
              </p>
            </details>

            <details class="glass-panel dark:bg-[#0d1424]/75 dark:border-white/10 bg-white rounded-xl p-5 border border-slate-200 group [&amp;_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
              <summary class="flex items-center justify-between font-headline-md text-headline-md dark:text-white text-slate-900 list-none font-semibold">
                <span>Can we connect our corporate custom domain?</span>
                <span class="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <p class="mt-4 text-body-md font-body-md dark:text-slate-300 text-slate-600 leading-relaxed">
                Yes. On Pro and Enterprise plans, you can connect your own branded domain or subdomain (e.g. <code class="font-code-sm text-primary dark:bg-slate-800 bg-primary-fixed/40 px-1 py-0.5 rounded">scan.yourcompany.com</code>). All SSL certificates are auto-generated and renewed via our edge network at zero extra cost.
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- HIGH-IMPACT CALL TO ACTION BANNER -->
      <section class="py-20 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 md:px-8">
          <div class="relative rounded-3xl p-10 md:p-16 border dark:border-indigo-500/30 border-primary/20 bg-gradient-to-br dark:from-indigo-950/60 dark:via-[#0d1424] dark:to-[#070a12] from-primary-fixed/60 via-surface-container to-white overflow-hidden shadow-xl">
            <div class="absolute -right-16 -top-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -left-16 -bottom-16 w-80 h-80 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 max-w-2xl">
              <span class="text-label-sm font-label-sm text-primary uppercase font-semibold tracking-widest">Instant Setup • Zero Credit Card</span>
              <h2 class="text-headline-lg sm:text-headline-xl font-headline-lg sm:font-headline-xl dark:text-white text-slate-900 mt-3 mb-5 leading-tight font-bold">
                Ready to Orchestrate Your Physical-to-Digital Bridge?
              </h2>
              <p class="text-body-lg font-body-lg dark:text-slate-300 text-slate-600 mb-8">
                Join over 45,000 businesses generating reliable, brand-aligned dynamic QR assets with live telemetry.
              </p>
              <div class="flex flex-wrap items-center gap-4">
                <button id="btn-banner-launch" class="px-8 py-3.5 rounded-lg bg-primary text-white font-headline-md text-label-md font-semibold shadow-lg shadow-primary/25 hover:bg-primary-container transition-all">
                  Generate Free Dynamic QR
                </button>
                <a href="#pricing" class="px-8 py-3.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-white bg-white hover:bg-surface-container-low text-slate-800 font-label-md font-medium border border-slate-300 shadow-sm transition-colors">
                  Compare All Tiers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="dark:bg-[#070a12] dark:border-slate-800 bg-white border-t border-slate-200/80">
        <div class="w-full max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div class="md:col-span-2">
              <a class="flex items-center gap-2 mb-4" href="#home">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary via-primary-container to-secondary-container flex items-center justify-center text-white font-bold shadow-sm">
                  <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
                </div>
                <span class="text-headline-md font-headline-md font-bold dark:text-white text-slate-900">ScanPulse</span>
              </a>
              <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-600 max-w-sm mb-6 leading-relaxed">
                Enterprise-grade dynamic QR orchestration. Architect, deploy, reroute, and analyze mission-critical barcode assets worldwide.
              </p>
              <div class="flex items-center gap-2 text-label-sm text-emerald-500 font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All Global Routing Nodes Operational (99.99%)
              </div>
            </div>

            <div>
              <div class="text-label-md font-label-md dark:text-white text-slate-900 font-semibold uppercase tracking-wider mb-4">Product</div>
              <ul class="space-y-2.5 text-body-sm font-body-sm dark:text-slate-400 text-slate-600">
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#features">Features</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#solutions">Solutions</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#analytics">Analytics</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#pricing">Pricing</a></li>
              </ul>
            </div>

            <div>
              <div class="text-label-md font-label-md dark:text-white text-slate-900 font-semibold uppercase tracking-wider mb-4">Developers</div>
              <ul class="space-y-2.5 text-body-sm font-body-sm dark:text-slate-400 text-slate-600">
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#workspace">Live Studio</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#analytics">Telemetry Status</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#features">Vector Engine</a></li>
              </ul>
            </div>

            <div>
              <div class="text-label-md font-label-md dark:text-white text-slate-900 font-semibold uppercase tracking-wider mb-4">Governance</div>
              <ul class="space-y-2.5 text-body-sm font-body-sm dark:text-slate-400 text-slate-600">
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#login">WhitePass SSO</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#features">SOC2 &amp; GDPR</a></li>
                <li><a class="dark:hover:text-indigo-400 hover:text-primary transition-colors" href="#pricing">Enterprise SLA</a></li>
              </ul>
            </div>
          </div>

          <div class="pt-8 border-t dark:border-slate-800 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-body-sm font-body-sm dark:text-slate-400 text-slate-500">
              © 2026 ScanPulse / WYT QR. All rights reserved. Enterprise-grade dynamic QR orchestration.
            </p>
            <div class="flex items-center gap-4 dark:text-slate-400 text-slate-500 text-body-sm">
              <span class="text-label-sm">ISO/IEC 27001 Certified</span>
              <span>•</span>
              <span class="text-label-sm">Edge CDN 18ms SLA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Attach navigation & authentication event handlers
  const navigateToAuthOrStudio = () => {
    onNavigate(isLoggedIn ? 'generator' : 'login');
  };

  document.getElementById('btn-landing-launch')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-hero-launch')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-banner-launch')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-free')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-pro')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-enterprise')?.addEventListener('click', navigateToAuthOrStudio);

  // Initialize Interactive QR Sandbox Widget
  setupInteractiveSandbox();
}

function setupInteractiveSandbox() {
  const canvasContainer = document.getElementById('landing-sandbox-canvas');
  const qrInput = document.getElementById('qr-input');
  const typeBtns = document.querySelectorAll('.sandbox-type-btn');
  const patternBtns = document.querySelectorAll('.sandbox-pattern-btn');
  const colorBtns = document.querySelectorAll('.sandbox-color-btn');
  const hexLabel = document.getElementById('txt-accent-hex');
  const inputLabel = document.getElementById('lbl-qr-input');

  if (!canvasContainer || !qrInput) return;

  let currentDotsShape = 'square';
  let currentColor = '#4f46e5';

  try {
    const QRClass = typeof QRCodeStyling === 'function' ? QRCodeStyling : (QRCodeStyling.default || QRCodeStyling);
    
    const demoQR = new QRClass({
      width: 176,
      height: 176,
      type: 'canvas',
      data: qrInput.value || 'https://scanpulse.io/s/launch-campaign-2025',
      margin: 4,
      dotsOptions: {
        color: currentColor,
        type: currentDotsShape
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#131b2e', type: 'square' },
      cornersDotOptions: { color: currentColor, type: 'dot' }
    });

    canvasContainer.innerHTML = '';
    demoQR.append(canvasContainer);

    // Typing in destination field
    qrInput.addEventListener('input', (e) => {
      demoQR.update({ data: e.target.value || 'https://scanpulse.io' });
    });

    // Switching payload content type tabs
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'font-semibold', 'shadow-sm', 'active-type');
          b.classList.add('dark:bg-slate-800/60', 'dark:hover:bg-slate-700', 'dark:text-slate-300', 'bg-surface-container', 'hover:bg-surface-container-high', 'text-slate-700');
        });
        btn.classList.remove('dark:bg-slate-800/60', 'dark:hover:bg-slate-700', 'dark:text-slate-300', 'bg-surface-container', 'hover:bg-surface-container-high', 'text-slate-700');
        btn.classList.add('bg-primary', 'text-white', 'font-semibold', 'shadow-sm', 'active-type');

        const val = btn.dataset.val;
        const type = btn.dataset.type;
        qrInput.value = val;
        
        if (inputLabel) {
          inputLabel.textContent = type === 'url' ? 'Destination URL' :
                                  type === 'wifi' ? 'Wi-Fi Network Spec' :
                                  type === 'vcard' ? 'vCard Payload' :
                                  type === 'socials' ? 'Social Link' : 'Email Address';
        }

        demoQR.update({ data: val });
      });
    });

    // Pattern Dots Selector
    patternBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        patternBtns.forEach(b => {
          b.classList.remove('border-primary', 'bg-primary/10', 'text-primary', 'active');
          b.classList.add('dark:border-white/10', 'dark:bg-slate-800/60', 'dark:text-slate-300', 'border-slate-200', 'bg-slate-50', 'text-slate-600');
        });
        btn.classList.remove('dark:border-white/10', 'dark:bg-slate-800/60', 'dark:text-slate-300', 'border-slate-200', 'bg-slate-50', 'text-slate-600');
        btn.classList.add('border-primary', 'bg-primary/10', 'text-primary', 'active');

        currentDotsShape = btn.dataset.shape || 'square';
        demoQR.update({
          dotsOptions: {
            color: currentColor,
            type: currentDotsShape
          }
        });
      });
    });

    // Color Swatches
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-[#0d1424]', 'active'));
        btn.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-[#0d1424]', 'active');

        currentColor = btn.dataset.color || '#4f46e5';
        if (hexLabel) hexLabel.textContent = currentColor.toUpperCase();

        demoQR.update({
          dotsOptions: {
            color: currentColor,
            type: currentDotsShape,
            gradient: null
          },
          cornersDotOptions: { color: currentColor, type: 'dot' }
        });
      });
    });

    // PNG Export
    document.getElementById('btn-sandbox-png')?.addEventListener('click', () => {
      demoQR.download({ name: 'scanpulse-qr-code', extension: 'png' });
    });

    // SVG Export
    document.getElementById('btn-sandbox-svg')?.addEventListener('click', () => {
      demoQR.download({ name: 'scanpulse-qr-code', extension: 'svg' });
    });

    // Copy Shortlink
    document.getElementById('btn-sandbox-copy')?.addEventListener('click', async () => {
      const copyBtn = document.getElementById('btn-sandbox-copy');
      try {
        await navigator.clipboard.writeText(qrInput.value);
        if (copyBtn) {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span> Copied to Clipboard!';
          copyBtn.classList.remove('bg-primary');
          copyBtn.classList.add('bg-emerald-600', 'text-white');
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('bg-emerald-600');
            copyBtn.classList.add('bg-primary');
          }, 2000);
        }
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });

  } catch (err) {
    console.error('ScanPulse sandbox error:', err);
  }
}
