import { createIcons, icons } from 'lucide';

export function renderLandingPage(container, onNavigate, onWhitePassLogin, isLoggedIn = false) {
  if (!container) return;

  container.innerHTML = `
    <div class="landing-wrapper dark:bg-[#070a12] dark:text-slate-100 bg-[#faf8ff] text-slate-900 font-body-md antialiased selection:bg-primary-fixed selection:text-primary overflow-x-hidden min-h-screen">
      
      <!-- HERO SECTION -->
      <section class="relative pt-6 pb-8 md:pt-12 md:pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <!-- Ambient subtle background glow -->
        <div class="absolute -top-12 -left-12 w-64 h-64 dark:bg-indigo-500/10 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-24 -right-12 w-48 h-48 dark:bg-purple-500/10 bg-secondary-fixed/50 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="relative flex flex-col items-center text-center max-w-4xl mx-auto gap-4">
          <!-- Live Status Capsule Pill -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-slate-900/80 dark:border-slate-800 dark:text-indigo-400 bg-surface-container border border-outline-variant/40 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="font-label-sm text-[11px] font-semibold tracking-wide uppercase">
              NEW: Dynamic AI Design &amp; Scan Tracking 2.0
            </span>
            <span class="material-symbols-outlined text-[14px] dark:text-slate-400 text-slate-500">arrow_forward</span>
          </div>

          <!-- Mobile / Desktop Headline -->
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight dark:text-white text-slate-900">
            Smart, Dynamic QR Codes That <br class="hidden sm:inline"/>
            <span class="bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 from-primary via-primary-container to-secondary-container bg-clip-text text-transparent">Never Expire.</span>
          </h1>

          <!-- Mobile / Desktop Subtitle -->
          <p class="text-base sm:text-lg dark:text-slate-400 text-slate-600 max-w-2xl leading-relaxed">
            Architect, deploy, and reroute intelligent vector QR campaigns on the fly. Update destination targets post-print, embed enterprise visual identity, and monitor scan telemetry in real-time.
          </p>

          <!-- Primary & Secondary CTAs -->
          <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-3 pt-2">
            <button id="btn-hero-launch" class="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-white font-headline-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] hover:bg-primary-container transition-all">
              <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>${isLoggedIn ? 'Launch Live Studio' : 'Get Started Free'}</span>
            </button>
            <a href="#telemetry" id="btn-hero-analytics" class="w-full sm:w-auto h-12 px-8 rounded-xl dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-white bg-white hover:bg-surface-container-low text-slate-800 border border-slate-300 font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
              <span class="material-symbols-outlined text-[20px] text-primary">query_stats</span>
              <span>View Analytics Demo</span>
            </a>
          </div>

          <!-- Key Stats Tri-Column Card -->
          <div class="w-full max-w-2xl mt-4 grid grid-cols-3 gap-2 p-4 dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div class="flex flex-col items-center text-center p-1 border-r dark:border-slate-800 border-slate-200">
              <span class="font-headline-md text-xl sm:text-2xl font-bold text-primary">10M+</span>
              <span class="font-label-sm text-[11px] dark:text-slate-400 text-slate-600 leading-tight mt-0.5">Scans Monthly</span>
            </div>
            <div class="flex flex-col items-center text-center p-1 border-r dark:border-slate-800 border-slate-200">
              <span class="font-headline-md text-xl sm:text-2xl font-bold dark:text-white text-slate-900">99.99%</span>
              <span class="font-label-sm text-[11px] dark:text-slate-400 text-slate-600 leading-tight mt-0.5">Uptime SLA</span>
            </div>
            <div class="flex flex-col items-center text-center p-1">
              <span class="font-headline-md text-xl sm:text-2xl font-bold text-emerald-500">Zero-PII</span>
              <span class="font-label-sm text-[11px] dark:text-slate-400 text-slate-600 leading-tight mt-0.5">GDPR Strict</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CLIENT TRUST STRIP -->
      <section class="py-8 px-4 sm:px-6 md:px-8 border-y dark:border-slate-800/80 dark:bg-[#070a12]/80 border-slate-200/80 bg-white/70">
        <div class="max-w-7xl mx-auto">
          <p class="text-center font-label-sm text-[11px] font-bold dark:text-slate-400 text-slate-500 tracking-wider uppercase mb-6">
            Trusted By Over 45,000+ Modern Global Teams &amp; Agencies
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center opacity-85 hover:opacity-100 transition-all">
            <div class="flex items-center justify-center py-2.5 px-2 rounded-lg dark:bg-slate-900/60 dark:border-slate-800 bg-surface-container-low border border-slate-200/60">
              <span class="font-headline-md text-base font-extrabold tracking-tighter dark:text-white text-slate-800 flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[20px]">credit_card</span> Stripe</span>
            </div>
            <div class="flex items-center justify-center py-2.5 px-2 rounded-lg dark:bg-slate-900/60 dark:border-slate-800 bg-surface-container-low border border-slate-200/60">
              <span class="font-headline-md text-base font-bold tracking-tight dark:text-white text-slate-800 flex items-center gap-1.5"><span class="material-symbols-outlined text-primary-container text-[20px]">travel</span> airbnb</span>
            </div>
            <div class="flex items-center justify-center py-2.5 px-2 rounded-lg dark:bg-slate-900/60 dark:border-slate-800 bg-surface-container-low border border-slate-200/60">
              <span class="font-headline-md text-base font-extrabold tracking-tight dark:text-white text-slate-800 flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[20px]">graphic_eq</span> Spotify</span>
            </div>
            <div class="flex items-center justify-center py-2.5 px-2 rounded-lg dark:bg-slate-900/60 dark:border-slate-800 bg-surface-container-low border border-slate-200/60">
              <span class="font-headline-md text-base font-bold tracking-tight dark:text-white text-slate-800 flex items-center gap-1.5"><span class="material-symbols-outlined text-primary-container text-[20px]">storefront</span> shopify</span>
            </div>
            <div class="flex items-center justify-center py-2.5 px-2 rounded-lg dark:bg-slate-900/60 dark:border-slate-800 bg-surface-container-low border border-slate-200/60 col-span-2 sm:col-span-1">
              <span class="font-headline-md text-base font-black tracking-widest dark:text-white text-slate-800 flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[20px]">local_taxi</span> Uber</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ARCHITECTURAL EDGE / FEATURE CARDS -->
      <section class="px-4 sm:px-6 md:px-8 py-16 max-w-7xl mx-auto scroll-mt-16" id="features">
        <div class="flex flex-col gap-2 mb-10">
          <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Enterprise Precision</span>
          <h2 class="text-2xl sm:text-4xl font-bold dark:text-white text-slate-900">Architectural Edge Built for Zero Downtime</h2>
          <p class="text-base dark:text-slate-400 text-slate-600">Every ScanPulse target executes through low-latency edge CDN nodes with full audit security.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1: Dynamic URL Redirection -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between">
                <div class="w-10 h-10 rounded-xl dark:bg-indigo-500/10 dark:text-indigo-400 bg-primary-fixed text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">alt_route</span>
                </div>
                <span class="px-2.5 py-1 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 font-code-sm text-[11px] font-semibold border border-emerald-200">
                  200 OK • 14ms
                </span>
              </div>
              <h3 class="text-xl font-bold dark:text-white text-slate-900 mt-4">Post-Print Dynamic Redirection</h3>
              <p class="text-sm dark:text-slate-400 text-slate-600 mt-2 leading-relaxed">
                Printed 50,000 product boxes with the wrong landing page? Reroute destination payloads in milliseconds without changing physical packaging.
              </p>
            </div>
            <div class="mt-4 p-3 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-slate-900 text-slate-100 font-code-sm text-xs flex flex-col gap-1 border border-slate-800">
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-emerald-400 font-bold">GET</span>
                <span>https://scanpulse.io/u/a9f82d</span>
              </div>
              <div class="flex items-center gap-1.5 text-indigo-300 pl-3">
                <span class="material-symbols-outlined text-[14px]">subdirectory_arrow_right</span>
                <span class="truncate">https://acme.com/summer-vip-access</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Live Scanned Telemetry -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between">
                <div class="w-10 h-10 rounded-xl dark:bg-purple-500/10 dark:text-purple-400 bg-secondary-fixed text-secondary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">monitoring</span>
                </div>
                <span class="px-2.5 py-1 rounded-full dark:bg-indigo-500/10 dark:text-indigo-400 bg-surface-container-high text-primary font-label-sm text-[11px] font-bold">
                  +438.4% Scan Surge
                </span>
              </div>
              <h3 class="text-xl font-bold dark:text-white text-slate-900 mt-4">Real-Time Scan Telemetry</h3>
              <p class="text-sm dark:text-slate-400 text-slate-600 mt-2 leading-relaxed">
                Capture device OS, browser fingerprint, localized geolocation, and timestamp velocity instantly with zero private user tracking.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t dark:border-slate-800 border-slate-200 flex items-end justify-between h-14 gap-1.5 px-2">
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[20%]"></div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[35%]"></div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[30%]"></div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[55%]"></div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[70%]"></div>
              <div class="w-full bg-primary-container rounded-t h-[95%] relative">
                <span class="absolute -top-5 left-1/2 -translate-x-1/2 font-code-sm text-[9px] font-bold text-primary">Peak</span>
              </div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[60%]"></div>
              <div class="w-full dark:bg-slate-800 bg-surface-container-high rounded-t h-[80%]"></div>
            </div>
          </div>

          <!-- Card 3: Custom Subdomains & Branding -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between">
                <div class="w-10 h-10 rounded-xl dark:bg-cyan-500/10 dark:text-cyan-400 bg-tertiary-fixed text-tertiary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">palette</span>
                </div>
                <span class="px-2.5 py-1 rounded-full dark:bg-slate-800 dark:text-slate-300 bg-surface-container text-slate-700 font-code-sm text-[11px] font-medium">
                  qr.acme-corp.com
                </span>
              </div>
              <h3 class="text-xl font-bold dark:text-white text-slate-900 mt-4">Custom Subdomains &amp; Vector Branding</h3>
              <p class="text-sm dark:text-slate-400 text-slate-600 mt-2 leading-relaxed">
                Retain complete brand equity. Bind your enterprise domain with automated SSL certificates and generate compliant high-density vectors.
              </p>
            </div>
          </div>

          <!-- Card 4: Enterprise Governance & Scale -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between">
                <div class="w-10 h-10 rounded-xl dark:bg-indigo-500/10 dark:text-indigo-400 bg-surface-container-high text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">shield</span>
                </div>
                <span class="px-2.5 py-1 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 bg-emerald-50 text-emerald-700 font-label-sm text-[11px] font-bold">
                  SOC2 Type II
                </span>
              </div>
              <h3 class="text-xl font-bold dark:text-white text-slate-900 mt-4">Enterprise Governance &amp; Scale</h3>
              <p class="text-sm dark:text-slate-400 text-slate-600 mt-2 leading-relaxed">
                Automate bulk campaign deployment via REST API. Control team permissions, schedule auto-expirations, and apply passcode gating.
              </p>
            </div>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span class="px-2.5 py-1 rounded-md dark:bg-slate-800 dark:text-slate-300 bg-surface-container-low text-slate-700 font-label-sm text-xs">Bulk CSV Batch</span>
              <span class="px-2.5 py-1 rounded-md dark:bg-slate-800 dark:text-slate-300 bg-surface-container-low text-slate-700 font-label-sm text-xs">Password Lock</span>
              <span class="px-2.5 py-1 rounded-md dark:bg-slate-800 dark:text-slate-300 bg-surface-container-low text-slate-700 font-label-sm text-xs">Auto-Expiration</span>
            </div>
          </div>
        </div>
      </section>

      <!-- TELEMETRY DASHBOARD CARD -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-7xl mx-auto scroll-mt-16" id="telemetry">
        <div class="dark:bg-[#0d1424]/90 dark:border-slate-800 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b dark:border-slate-800 border-slate-200">
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <span class="font-label-sm text-[10px] font-bold text-primary tracking-wider uppercase">Live Telemetry Node</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">Summer Music Festival 2025</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-code-sm text-[10px] font-bold">
              ACTIVE
            </span>
          </div>
          
          <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3.5 rounded-xl dark:bg-slate-900/80 dark:border-slate-800 bg-surface-container-low border border-slate-200">
              <span class="text-xs dark:text-slate-400 text-slate-600">Total Scans</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-lg sm:text-xl font-bold dark:text-white text-slate-900">284,910</span>
                <span class="text-xs text-emerald-500 font-bold">+24.8%</span>
              </div>
            </div>
            <div class="p-3.5 rounded-xl dark:bg-slate-900/80 dark:border-slate-800 bg-surface-container-low border border-slate-200">
              <span class="text-xs dark:text-slate-400 text-slate-600">Unique Visitors</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-lg sm:text-xl font-bold dark:text-white text-slate-900">219,430</span>
                <span class="text-xs text-primary font-bold">77.0%</span>
              </div>
            </div>
            <div class="p-3.5 rounded-xl dark:bg-slate-900/80 dark:border-slate-800 bg-surface-container-low border border-slate-200">
              <span class="text-xs dark:text-slate-400 text-slate-600">Conversion Rate</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-lg sm:text-xl font-bold dark:text-white text-slate-900">38.4%</span>
                <span class="text-xs text-emerald-500 font-bold">+3.2%</span>
              </div>
            </div>
            <div class="p-3.5 rounded-xl dark:bg-slate-900/80 dark:border-slate-800 bg-surface-container-low border border-slate-200">
              <span class="text-xs dark:text-slate-400 text-slate-600">Peak Velocity</span>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-sm font-bold dark:text-white text-slate-900">20:00 - 22:30</span>
              </div>
            </div>
          </div>

          <!-- Hotspots Geo Breakdown -->
          <div class="mt-4 pt-4 border-t dark:border-slate-800 border-slate-200">
            <span class="text-sm font-semibold dark:text-white text-slate-900 block mb-3">Top Scan Hotspots</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-primary">location_on</span> Los Angeles, United States
                </span>
                <span class="font-code-sm font-bold text-primary">40.1%</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-slate-400">location_on</span> London, United Kingdom
                </span>
                <span class="font-code-sm font-bold dark:text-white text-slate-900">21.9%</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-slate-400">location_on</span> Berlin, Germany
                </span>
                <span class="font-code-sm font-bold dark:text-white text-slate-900">16.8%</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <span class="material-symbols-outlined text-[16px] text-slate-400">location_on</span> Tokyo, Japan
                </span>
                <span class="font-code-sm font-bold dark:text-white text-slate-900">12.2%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- INDUSTRY DEPLOYMENTS VERTICALS -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-7xl mx-auto" id="solutions">
        <div class="flex flex-col gap-1.5 mb-8">
          <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Applied Infrastructure</span>
          <h2 class="text-2xl sm:text-4xl font-bold dark:text-white text-slate-900">Built For High-Stakes Physical Deployments</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Vertical 1 -->
          <div class="p-5 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-9 h-9 rounded-lg dark:bg-slate-800 dark:text-indigo-400 bg-surface-container-high text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <h3 class="text-base font-bold dark:text-white text-slate-900 mt-3">Retail &amp; Smart Packaging</h3>
              <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
                Deliver localized digital warranties, batch authenticity verification, and unboxing tutorials from serialized CPG packages.
              </p>
            </div>
          </div>
          <!-- Vertical 2 -->
          <div class="p-5 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-9 h-9 rounded-lg dark:bg-slate-800 dark:text-indigo-400 bg-surface-container-high text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <h3 class="text-base font-bold dark:text-white text-slate-900 mt-3">Hospitality &amp; Dining</h3>
              <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
                Reroute breakfast, lunch, and late-night digital menus dynamically without printing replacement table cards.
              </p>
            </div>
          </div>
          <!-- Vertical 3 -->
          <div class="p-5 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-9 h-9 rounded-lg dark:bg-slate-800 dark:text-indigo-400 bg-surface-container-high text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">confirmation_number</span>
              </div>
              <h3 class="text-base font-bold dark:text-white text-slate-900 mt-3">Events &amp; Dynamic Passes</h3>
              <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
                Deploy self-updating wristband codes for instant stage schedule updates, VIP credentials, and venue map changes.
              </p>
            </div>
          </div>
          <!-- Vertical 4 -->
          <div class="p-5 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-9 h-9 rounded-lg dark:bg-slate-800 dark:text-indigo-400 bg-surface-container-high text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
              </div>
              <h3 class="text-base font-bold dark:text-white text-slate-900 mt-3">OOH Advertising &amp; Billboards</h3>
              <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
                Measure physical ad impression scan conversions by city transit node, daytime hour, and smartphone operating system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3-STEP PIPELINE -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-7xl mx-auto">
        <div class="p-6 rounded-2xl dark:bg-[#0d1424]/60 dark:border-slate-800 bg-surface-container-low border border-slate-200">
          <div class="flex flex-col gap-1 mb-6">
            <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Simple Workflow</span>
            <h2 class="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">3-Step Campaign Pipeline</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-start gap-3 p-4 rounded-xl dark:bg-[#070a12] dark:border-slate-800 bg-white border border-slate-200">
              <span class="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center shrink-0">01</span>
              <div>
                <h3 class="font-bold text-base dark:text-white text-slate-900">Target Payload Setup</h3>
                <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">Input your target destination or bind to a custom branded domain with zero code.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-xl dark:bg-[#070a12] dark:border-slate-800 bg-white border border-slate-200">
              <span class="w-8 h-8 rounded-lg bg-secondary text-white font-bold flex items-center justify-center shrink-0">02</span>
              <div>
                <h3 class="font-bold text-base dark:text-white text-slate-900">Precision Design Lab</h3>
                <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">Integrate brand gradients, embedded SVG marks, and test ISO scan viability scoring.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-xl dark:bg-[#070a12] dark:border-slate-800 bg-white border border-slate-200">
              <span class="w-8 h-8 rounded-lg bg-tertiary text-white font-bold flex items-center justify-center shrink-0">03</span>
              <div>
                <h3 class="font-bold text-base dark:text-white text-slate-900">Reroute &amp; Optimize</h3>
                <p class="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">Change destination URLs anytime while monitoring real-time telemetry spikes and visitor counts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TRANSPARENT PRICING -->
      <section class="px-4 sm:px-6 md:px-8 py-16 max-w-7xl mx-auto scroll-mt-16" id="pricing">
        <div class="text-center flex flex-col items-center gap-2 mb-12">
          <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Predictable Value</span>
          <h2 class="text-2xl sm:text-4xl font-bold dark:text-white text-slate-900">Transparent Scale Pricing</h2>
          <p class="text-sm sm:text-base dark:text-slate-400 text-slate-600 max-w-md">Start free. Upgrade as campaign scan volume demands global low-latency nodes.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Plan 1 -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-baseline justify-between">
                <div>
                  <h3 class="text-xl font-bold dark:text-white text-slate-900">Starter Studio</h3>
                  <p class="text-xs dark:text-slate-400 text-slate-600">For personal testing &amp; simple prints</p>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold dark:text-white text-slate-900">$0</span>
                  <span class="text-xs dark:text-slate-400 text-slate-600">/forever</span>
                </div>
              </div>
              <ul class="mt-6 space-y-3 border-t dark:border-slate-800 border-slate-200 pt-4 text-xs dark:text-slate-300 text-slate-700">
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> 3 Dynamic QR Codes (Never Expire)
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> 1,000 Scans / month
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> Standard High-Res PNG Exports
                </li>
              </ul>
            </div>
            <button id="btn-pricing-free" class="w-full h-11 mt-6 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white bg-surface-container-low text-slate-800 font-semibold border border-slate-200 transition-all">
              Get Started Free
            </button>
          </div>

          <!-- Plan 2 (Pro) -->
          <div class="relative p-6 rounded-2xl dark:bg-[#0d1424] bg-white border-2 border-primary shadow-xl">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white font-label-sm text-[11px] font-bold uppercase tracking-wider shadow-sm">
              Most Popular Choice
            </div>
            <div>
              <div class="flex items-baseline justify-between mt-1">
                <div>
                  <h3 class="text-xl font-bold dark:text-white text-slate-900">Pro Marketer</h3>
                  <p class="text-xs dark:text-slate-400 text-slate-600">For dynamic omnichannel campaigns</p>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold text-primary">$12</span>
                  <span class="text-xs dark:text-slate-400 text-slate-600">/mo</span>
                </div>
              </div>
              <ul class="mt-6 space-y-3 border-t dark:border-slate-800 border-slate-200 pt-4 text-xs dark:text-slate-300 text-slate-700">
                <li class="flex items-center gap-2 font-semibold">
                  <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span> 50 Dynamic QR Codes
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span> Unlimited Scans &amp; Live Reroutes
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span> Full Telemetry (City &amp; Device OS)
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span> Print-Ready Vector SVG &amp; EPS
                </li>
              </ul>
            </div>
            <button id="btn-pricing-pro" class="w-full h-11 mt-6 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all">
              Start 14-Day Free Trial
            </button>
          </div>

          <!-- Plan 3 (Enterprise) -->
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-baseline justify-between">
                <div>
                  <h3 class="text-xl font-bold dark:text-white text-slate-900">Enterprise Hub</h3>
                  <p class="text-xs dark:text-slate-400 text-slate-600">Custom subdomains &amp; SLA guarantee</p>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold dark:text-white text-slate-900">$49</span>
                  <span class="text-xs dark:text-slate-400 text-slate-600">/mo</span>
                </div>
              </div>
              <ul class="mt-6 space-y-3 border-t dark:border-slate-800 border-slate-200 pt-4 text-xs dark:text-slate-300 text-slate-700">
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> Unlimited Dynamic Codes &amp; REST API
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> Custom Vanity Subdomains (SSL included)
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> 99.99% Uptime SLA + SOC2 Compliance
                </li>
              </ul>
            </div>
            <button id="btn-pricing-enterprise" class="w-full h-11 mt-6 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white bg-surface-container-low text-slate-800 font-semibold border border-slate-200 transition-all">
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-7xl mx-auto">
        <div class="flex flex-col gap-1 mb-8">
          <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Customer Feedback</span>
          <h2 class="text-2xl sm:text-4xl font-bold dark:text-white text-slate-900">Validated In Production</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center gap-1 text-amber-500 mb-3">
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
            </div>
            <p class="text-sm dark:text-slate-300 text-slate-700 italic leading-relaxed">
              "We printed over 120,000 beverage cans before spotting a campaign landing page change. ScanPulse dynamic rerouting saved our team an estimated $80k in packaging reprints within three minutes."
            </p>
            <div class="flex items-center gap-3 mt-4 pt-3 border-t dark:border-slate-800 border-slate-200">
              <div class="w-9 h-9 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">EM</div>
              <div>
                <div class="font-bold text-sm dark:text-white text-slate-900">Elena Morales</div>
                <div class="text-xs dark:text-slate-400 text-slate-500">VP of Growth, WaveBeverages</div>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center gap-1 text-amber-500 mb-3">
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
              <span class="material-symbols-outlined text-[18px]">star</span>
            </div>
            <p class="text-sm dark:text-slate-300 text-slate-700 italic leading-relaxed">
              "The real-time telemetry granularity is unparalleled. We tracked 95,000 scans during our Berlin tech conference without a single millisecond of redirect lag."
            </p>
            <div class="flex items-center gap-3 mt-4 pt-3 border-t dark:border-slate-800 border-slate-200">
              <div class="w-9 h-9 rounded-full bg-secondary-fixed text-secondary font-bold text-xs flex items-center justify-center">JT</div>
              <div>
                <div class="font-bold text-sm dark:text-white text-slate-900">Jonas Thiel</div>
                <div class="text-xs dark:text-slate-400 text-slate-500">Technical Director, Nord Agency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ACCORDION FAQ -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-4xl mx-auto">
        <div class="flex flex-col gap-1 mb-6">
          <span class="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">Clarity First</span>
          <h2 class="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div class="space-y-3">
          <details class="group p-4 rounded-xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm transition-all">
            <summary class="flex items-center justify-between font-bold text-sm sm:text-base dark:text-white text-slate-900 cursor-pointer list-none">
              <span>How does dynamic redirection work post-print?</span>
              <span class="material-symbols-outlined text-[20px] dark:text-slate-400 text-slate-500 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p class="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-3 pt-3 border-t dark:border-slate-800 border-slate-200 leading-relaxed">
              Dynamic QR codes encode a fixed ultra-short vanity endpoint (e.g., <code class="font-code-sm text-xs dark:bg-slate-800 bg-surface-container px-1.5 py-0.5 rounded text-primary">scanpulse.io/v/code-id</code>). When scanned, our global edge network resolves your latest destination address in under 14ms and forwards the visitor seamlessly.
            </p>
          </details>

          <details class="group p-4 rounded-xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm transition-all">
            <summary class="flex items-center justify-between font-bold text-sm sm:text-base dark:text-white text-slate-900 cursor-pointer list-none">
              <span>Do free dynamic QR codes ever expire?</span>
              <span class="material-symbols-outlined text-[20px] dark:text-slate-400 text-slate-500 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p class="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-3 pt-3 border-t dark:border-slate-800 border-slate-200 leading-relaxed">
              No. Free dynamic codes created on ScanPulse never expire as long as they stay within the monthly scan threshold. We ensure historical print preservation permanently.
            </p>
          </details>

          <details class="group p-4 rounded-xl dark:bg-[#0d1424]/80 dark:border-slate-800 bg-white border border-slate-200 shadow-sm transition-all">
            <summary class="flex items-center justify-between font-bold text-sm sm:text-base dark:text-white text-slate-900 cursor-pointer list-none">
              <span>Can I use my company's custom subdomain?</span>
              <span class="material-symbols-outlined text-[20px] dark:text-slate-400 text-slate-500 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p class="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-3 pt-3 border-t dark:border-slate-800 border-slate-200 leading-relaxed">
              Yes! Enterprise plans support custom vanity domains (e.g., <code class="font-code-sm text-xs dark:bg-slate-800 bg-surface-container px-1.5 py-0.5 rounded text-primary">qr.brandname.com</code>). We automatically provision edge TLS/SSL encryption certificates for your DNS CNAME record.
            </p>
          </details>
        </div>
      </section>

      <!-- HIGH-IMPACT CONVERSION BANNER -->
      <section class="px-4 sm:px-6 md:px-8 py-12 max-w-7xl mx-auto">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-8 text-white shadow-xl">
          <div class="relative flex flex-col items-start gap-4 max-w-2xl">
            <span class="px-3 py-1 rounded-full bg-white/20 text-white font-label-sm text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Instant Zero-Card Setup
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Orchestrate Your Physical-to-Digital Bridge?
            </h2>
            <p class="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Join 45,000+ teams building agile, high-resolution QR infrastructure that never breaks on physical packaging.
            </p>
            <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-3 pt-2">
              <button id="btn-banner-launch" class="w-full sm:w-auto h-12 px-8 rounded-xl bg-white text-primary font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                <span>Generate Free Dynamic QR</span>
              </button>
              <a href="#pricing" class="w-full sm:w-auto h-12 px-8 rounded-xl bg-white/15 text-white font-semibold border border-white/20 flex items-center justify-center active:scale-[0.98] hover:bg-white/25 transition-all">
                Compare All Tiers
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="w-full px-4 sm:px-6 md:px-8 py-16 dark:bg-[#070a12] dark:border-slate-800 bg-surface-container-low border-t border-slate-200/80">
        <div class="max-w-7xl mx-auto flex flex-col gap-10">
          <div class="flex flex-col items-start gap-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              </div>
              <span class="text-xl font-bold dark:text-white text-slate-900">ScanPulse</span>
            </div>
            <p class="text-sm dark:text-slate-400 text-slate-600 max-w-sm leading-relaxed">
              Architectural vector QR generation, dynamic edge routing, and real-time scan analytics infrastructure for high-scale enterprise operations.
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-slate-900 dark:border-slate-800 bg-white border border-slate-200 text-xs font-medium dark:text-slate-300 text-slate-700">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>All Global Routing Nodes Operational (99.99%)</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t dark:border-slate-800 border-slate-200">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold uppercase tracking-wider dark:text-white text-slate-900">Platform</span>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#features">Features</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#telemetry">Analytics</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#pricing">Pricing</a>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold uppercase tracking-wider dark:text-white text-slate-900">Solutions</span>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#solutions">Retail &amp; CPG</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#solutions">Hospitality</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#solutions">Events &amp; Passes</a>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold uppercase tracking-wider dark:text-white text-slate-900">Governance</span>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#login">WhitePass SSO</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#features">SOC2 &amp; GDPR</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#pricing">Enterprise SLA</a>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold uppercase tracking-wider dark:text-white text-slate-900">Legal</span>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a class="text-xs dark:text-slate-400 text-slate-600 hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>

          <div class="pt-6 border-t dark:border-slate-800 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs dark:text-slate-400 text-slate-500">
            <p>© 2026 ScanPulse / WYT QR. All rights reserved.</p>
            <span>v2.4.8-prod • Distributed Anycast Routing</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Attach navigation & authentication event handlers
  const navigateToAuthOrStudio = () => {
    onNavigate(isLoggedIn ? 'generator' : 'login');
  };

  document.getElementById('btn-hero-launch')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-banner-launch')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-free')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-pro')?.addEventListener('click', navigateToAuthOrStudio);
  document.getElementById('btn-pricing-enterprise')?.addEventListener('click', navigateToAuthOrStudio);
}
