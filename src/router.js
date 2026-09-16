export class Router {
  constructor(routes, defaultRoute = 'home', beforeEachGuard = null) {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.beforeEachGuard = beforeEachGuard;
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Trigger initial route handling immediately
    this.handleHashChange();
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleHashChange() {
    let hash = window.location.hash.replace('#', '').trim();
    if (!hash || hash === '/') {
      hash = this.defaultRoute;
    }

    // Handle OAuth callback URL cleanly
    if (window.location.search.includes('code=')) {
      hash = 'generator';
    }

    // Run Auth Guard if defined
    if (this.beforeEachGuard) {
      const guardedRoute = this.beforeEachGuard(hash);
      if (guardedRoute && guardedRoute !== hash) {
        hash = guardedRoute;
        window.location.hash = hash;
      }
    }

    this.currentRoute = hash;

    // Show active page view and hide others
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${hash}`) || document.getElementById(`view-${this.defaultRoute}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Update active navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.dataset.route;
      if (target === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Execute route handler callback if defined
    if (this.routes[hash]) {
      this.routes[hash]();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
