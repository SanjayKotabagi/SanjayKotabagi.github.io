/**
 * Antigravity Engineering - Cyber Security Classification Themes
 * SECRET = Dark Dashboard Mode (Default)
 * UNCLASSIFIED = Light / High-contrast Dashboard Mode
 */

const CyberTheme = {
  storageKey: 'security-clearance',
  
  init() {
    const savedTheme = localStorage.getItem(this.storageKey) || 'secret';
    this.setTheme(savedTheme);

    // Watch for system preference changes (if user has no saved setting)
    if (!localStorage.getItem(this.storageKey)) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.setTheme(prefersLight ? 'unclassified' : 'secret');
    }
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    
    // Dispatch custom event for parts of the app (like particles/canvas charts) to react
    const event = new CustomEvent('themechanged', { detail: { theme } });
    window.dispatchEvent(event);

    this.updateToggleUI(theme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'secret';
    const nextTheme = currentTheme === 'secret' ? 'unclassified' : 'secret';
    this.setTheme(nextTheme);
  },

  updateToggleUI(theme) {
    const indicator = document.getElementById('security-level-indicator');
    if (indicator) {
      if (theme === 'secret') {
        indicator.textContent = 'SECURE LEVEL: SECRET (DARK)';
        indicator.className = 'status-badge critical';
      } else {
        indicator.textContent = 'SECURE LEVEL: UNCLASSIFIED (LIGHT)';
        indicator.className = 'status-badge secure';
      }
    }
  }
};

// Auto-initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
  CyberTheme.init();
  
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      CyberTheme.toggleTheme();
    });
  }
});

window.CyberTheme = CyberTheme;
