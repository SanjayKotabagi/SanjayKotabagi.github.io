/**
 * Antigravity Engineering - GSAP Animations & Typings
 */

const CyberAnimations = {
  init() {
    // Listen to system boot completed before triggering entrance animations
    window.addEventListener('socbootcomplete', () => {
      this.playEntranceAnimations();
      this.initHeaderStatusScramble();
    });

    // Fallback if loader screen is skipped/not loaded
    if (sessionStorage.getItem('soc_booted') === 'true') {
      setTimeout(() => {
        this.playEntranceAnimations();
        this.initHeaderStatusScramble();
      }, 100);
    }
  },

  playEntranceAnimations() {
    // If GSAP is loaded from CDN
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      
      tl.fromTo('.cyber-header', 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
      );

      tl.fromTo('.hero-pretitle',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo('.hero-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      tl.fromTo('.hero-description',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo('.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo('.terminal-window',
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.6'
      );
      
      tl.fromTo('.stats-row .stat-card',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    } else {
      // Fallback: add standard reveal class instantly
      document.querySelectorAll('.fade-in-up').forEach((el) => {
        el.classList.add('active');
      });
      const header = document.querySelector('.cyber-header');
      if (header) header.style.opacity = '1';
    }

    // Trigger profession typewriter animation
    this.typeProfessionText();
  },

  typeProfessionText() {
    const target = document.getElementById('typewriter-profession');
    if (!target) return;

    const professions = [
      "SOC Analyst L2",
      "AI-Powered Security Automation",
      "Detection Engineering",
      "Incident Response"
    ];
    
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeLoop() {
      const fullText = professions[currentIdx];
      
      if (isDeleting) {
        target.textContent = fullText.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        target.textContent = fullText.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 85;
      }

      if (!isDeleting && charIdx === fullText.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at full word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % professions.length;
        typeSpeed = 500; // Pause before typing next
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  },

  initHeaderStatusScramble() {
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
      brandName.addEventListener('mouseenter', () => {
        if (window.CyberUtils) {
          window.CyberUtils.scrambleText(brandName, "SANJAY");
        }
      });
    }
  }
};

// Bind load hooks
document.addEventListener('DOMContentLoaded', () => {
  CyberAnimations.init();
});
window.CyberAnimations = CyberAnimations;
