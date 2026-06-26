/**
 * Antigravity Engineering - Master Dashboard Coordinator
 */

const CyberMain = {
  init() {
    console.log("[SYSTEM] Security Operations Dashboard Initializing...");
    
    this.initTelemetry();
    this.initLucideIcons();
    this.initStatCounters();
    this.initMobileNav();
    this.initServiceWorker();
  },

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('[SYSTEM] PWA Service Worker Registered. Scope:', reg.scope))
          .catch(err => console.warn('[SYSTEM] PWA Service Worker Registration Failed:', err));
      });
    }
  },

  initTelemetry() {
    if (window.CyberUtils) {
      // Connect live updating values for Latency, Threat Level, and Uptime counters
      window.CyberUtils.initLiveTelemetry('telemetry-latency', 'telemetry-threat', 'telemetry-uptime');
    }
  },

  initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseFloat(el.getAttribute('data-target') || '0');
          const suffix = el.getAttribute('data-suffix') || '';
          
          if (window.CyberUtils) {
            window.CyberUtils.animateCount(el, targetVal, 1500, suffix);
          } else {
            el.textContent = targetVal + suffix;
          }
          
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    stats.forEach(s => observer.observe(s));
  },

  initMobileNav() {
    // Mobile responsive drawer toggle (if needed in template layout, or basic fallback alert toggler)
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active');
      });
    }
  }
};

// Bootstrap application once assets are compiled
document.addEventListener('DOMContentLoaded', () => {
  CyberMain.init();
});
window.CyberMain = CyberMain;
