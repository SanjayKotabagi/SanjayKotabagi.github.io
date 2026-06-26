/**
 * Antigravity Engineering - Cyber Terminal Emulator Logic
 */

const CyberTerminal = {
  terminalBody: null,
  cmdInput: null,
  customCaret: null,
  history: [],
  historyIndex: -1,
  
  // Available terminal command registry
  commands: {
    help: "List all available cybersecurity diagnostics shell commands.",
    about: "Print professional biography and career core values.",
    projects: "Display summary catalog of Sanjay's engineering developments.",
    skills: "Check active security tools, cloud, and log investigation ratings.",
    experience: "Output corporate timeline and achievements profile.",
    resume: "Acquire PDF resume secure access links.",
    contact: "Get contact endpoints (Secure email, LinkedIn, GitHub details).",
    github: "Redirect browser to GitHub source profile.",
    linkedin: "Redirect browser to LinkedIn corporate profile.",
    whoami: "Inspect connection telemetry and visitor classification tier.",
    clear: "Purge active console log buffers.",
    sudo: "Request superuser authorization credentials.",
    coffee: "Brew automated diagnostics reinforcement liquid.",
    easteregg: "Decrypt hidden matrix system diagnostic logs."
  },

  init() {
    this.terminalBody = document.getElementById('terminal-body');
    this.cmdInput = document.getElementById('terminal-input');
    this.customCaret = document.getElementById('terminal-caret');

    if (!this.cmdInput || !this.terminalBody) return;

    this.focusInput();
    this.setupListeners();
    this.printWelcome();
  },

  focusInput() {
    this.cmdInput.focus();
  },

  setupListeners() {
    // Focus terminal input on clicking anywhere inside terminal body
    const terminalWin = document.querySelector('.terminal-window');
    if (terminalWin) {
      terminalWin.addEventListener('click', () => this.focusInput());
    }

    // Input keyboard event listener
    this.cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = this.cmdInput.value.trim();
        this.processCommand(command);
        this.cmdInput.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory('down');
      }
    });

    // Custom window dots control simulation
    const dots = document.querySelectorAll('.terminal-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const action = e.target.classList[1];
        const win = document.querySelector('.terminal-window');
        if (!win) return;
        
        if (action === 'close') {
          win.style.opacity = '0';
          setTimeout(() => win.style.display = 'none', 300);
        } else if (action === 'maximize') {
          win.classList.toggle('maximized');
          this.writeLog("[SYSTEM] Terminal resize triggered. Display bounds altered.", "terminal-muted");
        } else if (action === 'minimize') {
          win.style.transform = 'scale(0.95)';
          win.style.opacity = '0.5';
          setTimeout(() => {
            win.style.transform = '';
            win.style.opacity = '1';
          }, 1000);
        }
      });
    });
  },

  printWelcome() {
    const welcomeText = `
      <div class="ascii-art">
   ____  ____ _  __     _  ____  __  __
  / __/ / __// |/ /__  / |/ /  |/  |/ /
 _\\ \\  / _/ /    / _ `/    / /|_/ / /_ 
/___/ /___//_/|_/\\_,_//_/|_/_/  /_/___/
      </div>
      <p class="terminal-success">SYSTEM SECURITY INTERFACE [VER 3.0.0-RELEASE]</p>
      <p class="terminal-muted">Connection Type: Secure SSH-SHA256 Client Port</p>
      <p class="terminal-muted">Logged as: guest@sanjay-cyber-soc (Clearance: L2 ESCALATION)</p>
      <p>Type <span class="terminal-accent">help</span> to view available system telemetry commands.</p>
      <br>
    `;
    this.writeHTML(welcomeText);
  },

  processCommand(rawCmd) {
    const parts = rawCmd.toLowerCase().split(' ');
    const cmd = parts[0];
    
    if (cmd === '') return;
    
    // Add to history
    this.history.push(rawCmd);
    this.historyIndex = this.history.length;

    // Display prompt and typed command
    this.writeHTML(`<div class="terminal-input-line">
      <span class="terminal-prompt">[guest@sanjay-soc ~]$</span>
      <span>${rawCmd}</span>
    </div>`);

    if (this.commands[cmd] !== undefined) {
      this.executeCommand(cmd);
    } else {
      this.writeLog(`sys: command not found: ${cmd}. Type 'help' for diagnostics.`, "terminal-danger");
    }

    // Scroll to bottom
    this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
  },

  executeCommand(cmd) {
    switch (cmd) {
      case 'help':
        let helpHTML = `<p class="terminal-accent">SOC Telemetry Diagnostic Directory:</p>`;
        for (const [key, desc] of Object.entries(this.commands)) {
          helpHTML += `<p>  <span class="terminal-success">${key.padEnd(12)}</span> - ${desc}</p>`;
        }
        this.writeHTML(helpHTML);
        break;

      case 'about':
        this.writeHTML(`<p class="terminal-accent">// SANJAY M KOTABAGI - SOC ANALYST L2</p>
          <p>Sanjay is an L2 SOC Analyst with 4+ years of experience across Big4 firms (PwC, Deloitte USI) and Orbit Technologies. He stands out through production-deployed AI automation, including building an automated phishing investigation platform and fine-tuning local LLaMA 2 security models. Specialist in SIEM (Microsoft Sentinel, IBM QRadar, Splunk), EDR, and Cloud Security.</p>`);
        break;

      case 'projects':
        this.writeHTML(`<p class="terminal-accent">// ACQUIRED PROJECTS INVENTORY</p>
          <p>- <span class="terminal-success">AI Phishing Ingestion Platform</span>: Fully automated phishing triage correlating VirusTotal & threat intel feeds.</p>
          <p>- <span class="terminal-success">SOC Alert Runbook LLM</span>: In-house LLM co-architected at PwC reducing MTTR by 30-40%.</p>
          <p>- <span class="terminal-success">Adversarial LLaMA 2 Jailbreaker</span>: Fine-tuned LLaMA 2 (7B) model for red-teaming & prompt vulnerability checks.</p>
          <p>- <span class="terminal-success">Incident Enrichment scripts</span>: Deloitte triage automation scripts reducing analysis time to under 3 min.</p>
          <p>Type <span class="terminal-accent">github</span> to open full repositories catalog.</p>`);
        break;

      case 'skills':
        this.writeHTML(`<p class="terminal-accent">// ACTIVE SYSTEM CAPABILITY MATRIX</p>
          <p>SIEM / XDR:    [ Microsoft Sentinel | IBM QRadar | Splunk | IBM XDR ]</p>
          <p>EDR / EPP:     [ SentinelOne | Microsoft Defender XDR | Carbon Black ]</p>
          <p>Automation:    [ Python Security Scripting | SOAR Playbooks ]</p>
          <p>AI / ML Sec:   [ LLM Fine-tuning (LLaMA 2) | AI Alert Classifications ]</p>
          <p>Offensive:     [ Metasploit | Nmap | MITRE ATT&CK ]</p>`);
        break;

      case 'experience':
        this.writeHTML(`<p class="terminal-accent">// SECURE EXPERIENCE FEED</p>
          <p>• <span class="terminal-success">SOC Analyst L2 - Primary Escalation</span> (PwC) | May 2025 – Present</p>
          <p>• <span class="terminal-success">SOC Analyst - L1 Escalation</span> (Deloitte USI) | Feb 2023 – Apr 2025</p>
          <p>• <span class="terminal-success">Cloud Security L1</span> (Orbit Technologies) | Jun 2022 – Dec 2022</p>`);
        break;

      case 'resume':
        this.writeHTML(`<p class="terminal-accent">// DOWNLOADING RESUME OBJECT...</p>
          <p>Resume file pointer located. Access link: <a href="resume.html" target="_blank" class="terminal-success">Open Interactive Resume Profile</a></p>`);
        break;

      case 'contact':
        this.writeHTML(`<p class="terminal-accent">// TARGET TELEMETRY ENDPOINTS</p>
          <p>Email:       <a href="mailto:sanjaymkotabagi@gmail.com" class="terminal-success">sanjaymkotabagi@gmail.com</a></p>
          <p>Phone:       <span class="terminal-success">+91-8147457639</span></p>
          <p>LinkedIn:    <a href="https://linkedin.com" target="_blank" class="terminal-success">linkedin.com/in/sanjaymkotabagi</a></p>
          <p>GitHub:      <a href="https://github.com/sanjaykotabagi" target="_blank" class="terminal-success">github.com/sanjaykotabagi</a></p>`);
        break;

      case 'github':
        this.writeLog("Redirecting external tunnel to GitHub repository network...", "terminal-muted");
        setTimeout(() => window.open("https://github.com/sanjaykotabagi", "_blank"), 500);
        break;

      case 'linkedin':
        this.writeLog("Redirecting external tunnel to LinkedIn profile network...", "terminal-muted");
        setTimeout(() => window.open("https://linkedin.com", "_blank"), 500);
        break;

      case 'whoami':
        const mockIP = `10.0.0.${Math.floor(Math.random() * 254) + 1}`;
        this.writeHTML(`<p>Visitor Profile: L2 Guest Security Auditor</p>
          <p>Assigned Tunnel IP: <span class="terminal-success">${mockIP}</span></p>
          <p>Client Browser: ${navigator.userAgent.split(' ')[0]}</p>
          <p>Classification Level: <span class="terminal-warning">SECRET CLEARANCE LEVEL 2</span></p>`);
        break;

      case 'clear':
        this.terminalBody.innerHTML = '';
        break;

      case 'sudo':
        this.writeLog("[SECURITY INCIDENT] Unauthorized attempt to invoke 'sudo'.", "terminal-danger");
        this.writeLog("[ALERT] This incident has been logged and reported. ID: SOC-401-UNAUTHORIZED.", "terminal-warning");
        break;

      case 'coffee':
        this.writeHTML(`<div class="terminal-secondary">
    (  )   (   )
     ) (    ) (
   .------.-----.
   |      |     |]
   |      |     |
   |      |     |
   '------'-----'
      </div>
      <p class="terminal-secondary">Dispensing automated hot fuel reinforcement code... OK.</p>`);
        break;

      case 'easteregg':
        this.writeLog("ACCESSING CLASSIFIED THREAT INTELLIGENCE...", "terminal-warning");
        setTimeout(() => {
          this.writeHTML(`<p class="terminal-success">[FLAG] CTF{SANJAY_THE_AUTOMATION_L2_SHIELD}</p>
            <p class="terminal-muted">"Production-deployed AI beats manual alert triages every single time."</p>`);
          this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        }, 600);
        break;
    }
  },

  writeLog(message, className = "") {
    const logLine = document.createElement('p');
    if (className) logLine.className = className;
    logLine.textContent = message;
    this.terminalBody.appendChild(logLine);
  },

  writeHTML(htmlContent) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlContent;
    this.terminalBody.appendChild(wrapper);
  },

  navigateHistory(direction) {
    if (this.history.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.cmdInput.value = this.history[this.historyIndex];
      }
    } else if (direction === 'down') {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.cmdInput.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.cmdInput.value = '';
      }
    }
  }
};

// Start terminal logic once domestic assets load
document.addEventListener('DOMContentLoaded', () => {
  CyberTerminal.init();
});
window.CyberTerminal = CyberTerminal;
