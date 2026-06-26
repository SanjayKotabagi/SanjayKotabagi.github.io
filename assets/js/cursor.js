/**
 * Antigravity Engineering - Cyber Cursor & Mouse Spotlight
 */

const CyberCursor = {
  cursorOuter: null,
  cursorInner: null,
  spotlight: null,
  
  // Position targets for smooth interpolation
  mouse: { x: 0, y: 0 },
  pos: { x: 0, y: 0 },
  speed: 0.15, // Interpolation speed
  
  isMobile: false,

  init() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                    || ('ontouchstart' in window) 
                    || (navigator.maxTouchPoints > 0);

    if (this.isMobile) {
      this.hideCustomCursors();
      return;
    }

    this.createCursorElements();
    this.setupListeners();
    this.animate();
  },

  createCursorElements() {
    // Outer trailing ring
    this.cursorOuter = document.createElement('div');
    this.cursorOuter.className = 'custom-cursor';
    
    // Inner active dot
    this.cursorInner = document.createElement('div');
    this.cursorInner.className = 'custom-cursor-dot';
    
    // Global mouse spotlight container
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'mouse-spotlight';

    document.body.appendChild(this.cursorOuter);
    document.body.appendChild(this.cursorInner);
    document.body.appendChild(this.spotlight);
  },

  hideCustomCursors() {
    // Ensure default cursor is visible, no custom ones injected
    document.body.style.cursor = 'default';
  },

  setupListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Update spotlight position directly for instant response
      if (this.spotlight) {
        this.spotlight.style.setProperty('--x', `${e.clientX}px`);
        this.spotlight.style.setProperty('--y', `${e.clientY}px`);
      }
    });

    // Magnetic and scaling hover states
    const hoverSelectors = 'a, button, .interactive-card, .status-badge, .terminal-prompt, input, textarea';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(hoverSelectors);
      if (target) {
        this.cursorOuter.style.width = '40px';
        this.cursorOuter.style.height = '40px';
        this.cursorOuter.style.borderColor = 'rgba(var(--rgb-primary), 0.8)';
        this.cursorOuter.style.backgroundColor = 'rgba(var(--rgb-primary), 0.05)';
        
        // Custom magnetic feedback (subtle shift towards target center)
        if (target.classList.contains('magnetic')) {
          const rect = target.getBoundingClientRect();
          this.mouse.x = rect.left + rect.width / 2;
          this.mouse.y = rect.top + rect.height / 2;
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(hoverSelectors);
      if (target) {
        this.cursorOuter.style.width = '20px';
        this.cursorOuter.style.height = '20px';
        this.cursorOuter.style.borderColor = 'var(--color-primary)';
        this.cursorOuter.style.backgroundColor = 'transparent';
      }
    });

    // Handle cursor hide/show on window focus/exit
    document.addEventListener('mouseleave', () => {
      this.cursorOuter.style.opacity = '0';
      this.cursorInner.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      this.cursorOuter.style.opacity = '1';
      this.cursorInner.style.opacity = '1';
    });
  },

  animate() {
    // Interpolate outer cursor for organic trailing lag
    const dx = this.mouse.x - this.pos.x;
    const dy = this.mouse.y - this.pos.y;
    
    this.pos.x += dx * this.speed;
    this.pos.y += dy * this.speed;

    if (this.cursorOuter) {
      this.cursorOuter.style.left = `${this.pos.x}px`;
      this.cursorOuter.style.top = `${this.pos.y}px`;
    }

    if (this.cursorInner) {
      this.cursorInner.style.left = `${this.mouse.x}px`;
      this.cursorInner.style.top = `${this.mouse.y}px`;
    }

    requestAnimationFrame(() => this.animate());
  }
};

// Start custom cursor once page DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  CyberCursor.init();
});

window.CyberCursor = CyberCursor;
