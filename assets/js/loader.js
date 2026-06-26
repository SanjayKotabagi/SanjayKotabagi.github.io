/**
 * Antigravity Engineering - SOC System Decryption & Bootloader
 */

const CyberLoader = {
  overlay: null,
  progressBar: null,
  progressText: null,
  logContainer: null,
  
  bootLogs: [
    { text: "INIT SECURE NETWORK COUPLING...", delay: 100 },
    { text: "ESTABLISHING VPN TUNNELS & IPsec INTERFACES...", delay: 250 },
    { text: "CONNECTING TO SIEM PIPELINES [SPLUNK & QRADAR]...", delay: 450 },
    { text: "LOADING LOG NORMALIZERS & SIGMA DETECTION ENGINE...", delay: 650 },
    { text: "ENABLING MITRE ATT&CK DETECTOR MAPS...", delay: 850 },
    { text: "DOWNLOADING RECENT THREAT IOC FEEDS...", delay: 1050 },
    { text: "VERIFYING CRYPTOGRAPHIC ACCESS TOKEN...", delay: 1250 },
    { text: "ACCESS GRANTED. BOOT SEQUENCE COMPLETE.", delay: 1400 }
  ],

  init() {
    this.overlay = document.getElementById('loader-overlay');
    if (!this.overlay) return;

    // Check if system has already booted in this session to prevent UX fatigue
    if (sessionStorage.getItem('soc_booted') === 'true') {
      this.overlay.style.display = 'none';
      return;
    }

    this.progressBar = this.overlay.querySelector('.loader-progress-bar-fill');
    this.progressText = this.overlay.querySelector('.loader-percent');
    this.logContainer = this.overlay.querySelector('.loader-logs');

    if (this.progressBar && this.progressText && this.logContainer) {
      document.body.style.overflow = 'hidden'; // Lock scrolling
      this.startBootSequence();
    } else {
      this.overlay.style.display = 'none';
    }
  },

  startBootSequence() {
    let progress = 0;
    const duration = 1600; // 1.6 seconds total
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    
    // Log printing sequence
    this.bootLogs.forEach((log) => {
      setTimeout(() => {
        const logLine = document.createElement('div');
        logLine.className = 'loader-log-line';
        logLine.textContent = `[OK] ${log.text}`;
        this.logContainer.appendChild(logLine);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
      }, log.delay);
    });

    // Progress counter sequence
    const timer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        this.completeBootSequence();
      }
      
      this.progressText.textContent = `${Math.floor(progress)}%`;
      if (this.progressBar) {
        this.progressBar.style.width = `${progress}%`;
      }
    }, intervalTime);
  },

  completeBootSequence() {
    setTimeout(() => {
      // Fade out overlay
      this.overlay.style.opacity = '0';
      this.overlay.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        this.overlay.style.display = 'none';
        document.body.style.overflow = ''; // Unlock scrolling
        sessionStorage.setItem('soc_booted', 'true');
        
        // Dispatch event for other assets (e.g. text scramblers, GSAP reveals) to trigger
        window.dispatchEvent(new CustomEvent('socbootcomplete'));
      }, 600);
    }, 400);
  }
};

// Start boot sequence loading on load
document.addEventListener('DOMContentLoaded', () => {
  CyberLoader.init();
});
