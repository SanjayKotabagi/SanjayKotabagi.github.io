/**
 * Antigravity Engineering - Cyber Portfolio Utilities
 */

const CyberUtils = {
  /**
   * Scrambles text using binary/hex characters and gradually resolves it.
   * @param {HTMLElement} element The target element.
   * @param {string} text The target text to resolve to.
   * @param {number} duration Speed duration of scramble in ms.
   */
  scrambleText(element, text, duration = 800) {
    const chars = '01#@$%&<>[]{}/*_X?';
    const originalText = text || element.textContent;
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    
    element.style.fontFamily = 'var(--font-terminal)';
    
    const interval = setInterval(() => {
      let result = '';
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          result += ' ';
          continue;
        }
        
        // As frame increases, resolve characters starting from left
        const resolveThreshold = (frame / totalFrames) * originalText.length;
        if (i < resolveThreshold) {
          result += originalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.textContent = result;
      frame++;
      
      if (frame >= totalFrames) {
        element.textContent = originalText;
        element.style.fontFamily = ''; // Reset to default CSS font
        clearInterval(interval);
      }
    }, 30);
  },

  /**
   * Typewriter animation for text displays.
   */
  typewriter(element, text, speed = 50, callback = null) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
      if (index < text.length) {
        // Handle HTML linebreaks or standard text chars
        if (text.substr(index, 4) === '<br>') {
          element.innerHTML += '<br>';
          index += 4;
        } else {
          element.innerHTML += text.charAt(index);
          index++;
        }
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    
    type();
  },

  /**
   * Animates a numerical value up to a target number.
   */
  animateCount(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = Math.floor(target).toLocaleString() + suffix;
        clearInterval(interval);
      } else {
        element.textContent = Math.floor(start).toLocaleString() + suffix;
      }
    }, 16);
  },

  /**
   * Generates live cyber metrics (simulating active telemetry).
   */
  initLiveTelemetry(latencyId, threatId, uptimeId) {
    // Latency simulator (varying between 15ms and 45ms)
    const latencyEl = document.getElementById(latencyId);
    if (latencyEl) {
      setInterval(() => {
        const variance = Math.floor(Math.random() * 20) - 10;
        const baseLatency = 24;
        latencyEl.textContent = `${Math.max(12, baseLatency + variance)}ms`;
      }, 3000);
    }

    // Threat level simulator (Static for compliance but occasionally cycles logs)
    const threatEl = document.getElementById(threatId);
    if (threatEl) {
      threatEl.innerHTML = '<span class="dot"></span>OPTIMAL';
    }

    // Live Uptime counter
    const uptimeEl = document.getElementById(uptimeId);
    if (uptimeEl) {
      const startTime = Date.now() - (365 * 24 * 60 * 60 * 1000) - (12 * 60 * 60 * 1000); // 1 yr + 12 hrs ago
      setInterval(() => {
        const diff = Date.now() - startTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        uptimeEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
      }, 1000);
    }
  }
};
window.CyberUtils = CyberUtils;
