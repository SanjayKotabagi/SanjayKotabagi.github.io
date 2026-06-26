/**
 * Antigravity Engineering - Scroll Management and Reveal Triggers
 */

const CyberScroll = {
  header: null,
  backToTopBtn: null,
  
  init() {
    this.header = document.querySelector('.cyber-header');
    this.backToTopBtn = document.getElementById('back-to-top');

    this.setupHeaderScroll();
    this.setupSmoothScroll();
    this.setupBackToTop();
    this.setupRevealObserver();
  },

  setupHeaderScroll() {
    if (!this.header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.header.style.padding = 'var(--spacing-xxs) 0';
        this.header.style.background = 'rgba(5, 8, 22, 0.9)'; // More solid dark bg
        this.header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.7)';
      } else {
        this.header.style.padding = 'var(--spacing-sm) 0';
        this.header.style.background = 'var(--glass-bg)';
        this.header.style.boxShadow = 'var(--glass-shadow)';
      }
    });
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Clear fixed header offset height
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  setupBackToTop() {
    if (!this.backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.backToTopBtn.classList.add('visible');
        this.backToTopBtn.style.opacity = '1';
        this.backToTopBtn.style.pointerEvents = 'auto';
      } else {
        this.backToTopBtn.classList.remove('visible');
        this.backToTopBtn.style.opacity = '0';
        this.backToTopBtn.style.pointerEvents = 'none';
      }
    });

    this.backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  setupRevealObserver() {
    const revealElements = document.querySelectorAll('.fade-in-up');
    if (revealElements.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => {
      observer.observe(el);
    });
  }
};

// Start scroll management on load
document.addEventListener('DOMContentLoaded', () => {
  CyberScroll.init();
});
window.CyberScroll = CyberScroll;
