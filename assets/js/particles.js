/**
 * Antigravity Engineering - Canvas Network Node Particles
 */

const CyberParticles = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: null, y: null, radius: 150 },
  numParticles: 60,
  connectionDistance: 110,
  animationId: null,
  colorScheme: {
    node: 'rgba(0, 212, 255, 0.45)',
    line: 'rgba(0, 212, 255, 0.15)',
    activeNode: 'rgba(124, 58, 237, 0.65)'
  },

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.setColors(document.documentElement.getAttribute('data-theme') || 'secret');
    this.createParticles();
    this.setupListeners();
    this.animate();
  },

  setColors(theme) {
    if (theme === 'unclassified') {
      // Light Mode Colors
      this.colorScheme.node = 'rgba(124, 58, 237, 0.35)'; // Purple Nodes
      this.colorScheme.line = 'rgba(124, 58, 237, 0.08)'; // Fine purple lines
      this.colorScheme.activeNode = 'rgba(0, 212, 255, 0.55)'; // Cyan nodes
    } else {
      // Dark Mode (Default) Colors
      this.colorScheme.node = 'rgba(0, 212, 255, 0.35)'; // Cyan Nodes
      this.colorScheme.line = 'rgba(0, 212, 255, 0.08)'; // Fine cyan lines
      this.colorScheme.activeNode = 'rgba(124, 58, 237, 0.55)'; // Purple Nodes
    }
  },

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Scale particle count based on screen width for performance
    if (window.innerWidth < 768) {
      this.numParticles = 25;
      this.connectionDistance = 80;
    } else {
      this.numParticles = 60;
      this.connectionDistance = 110;
    }
  },

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      const size = Math.random() * 2 + 1; // 1px to 3px
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      
      // Fine slow velocity
      const vx = (Math.random() - 0.5) * 0.45;
      const vy = (Math.random() - 0.5) * 0.45;
      
      this.particles.push({ x, y, vx, vy, size, baseSize: size });
    }
  },

  setupListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Listen for clearance theme swaps
    window.addEventListener('themechanged', (e) => {
      this.setColors(e.detail.theme);
    });
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw lines first so nodes sit on top
    this.drawConnections();

    // Update and draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce on edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > this.canvas.height) p.vy = -p.vy;

      // Draw particle dot
      this.ctx.fillStyle = this.colorScheme.node;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();

      // Mouse proximity interaction (grow slightly if close to mouse spotlight)
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          p.size = Math.min(p.baseSize * 2.5, p.size + 0.1);
          this.ctx.fillStyle = this.colorScheme.activeNode;
          this.ctx.fill();
        } else {
          p.size = Math.max(p.baseSize, p.size - 0.1);
        }
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  },

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          // Opacity fades as nodes move further apart
          const opacity = (1 - (distance / this.connectionDistance)) * 0.8;
          
          this.ctx.strokeStyle = this.colorScheme.line.replace('0.08', (opacity * 0.12).toString());
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }
};

// Auto-run once DOM loads if background canvas is present
document.addEventListener('DOMContentLoaded', () => {
  CyberParticles.init('particles-canvas');
});
window.CyberParticles = CyberParticles;
