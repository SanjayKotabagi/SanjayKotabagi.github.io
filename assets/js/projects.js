/**
 * Antigravity Engineering - Projects Fetcher & Real-time Categorization Filter
 */

const CyberProjects = {
  container: null,
  filterButtons: null,
  allProjects: [],

  // Offline/file:// protocol fallback registry to prevent CORS blockers from loading empty views
  fallbackData: [
    {
      "id": "phishing-investigation-system",
      "title": "AI Phishing Ingestion & Triage Platform",
      "category": "cybersecurity",
      "tech": ["Python", "VirusTotal API", "Threat Intel", "SOAR"],
      "description": "A full-scale automated phishing investigation platform that integrates AI-based mail classification, multi-engine IOC enrichment, SOP validation checkbooks, and automated verdict outputs.",
      "features": ["No vendor tool dependency (built end-to-end)", "Reduces triage workload by automated verdict categorization", "Performs real-time headers and URLs inspections"],
      "github": "https://github.com/sanjaykotabagi/ai-phishing-triage"
    },
    {
      "id": "soc-llm",
      "title": "Fine-Tuned In-House SOC LLM",
      "category": "automation",
      "tech": ["Python", "PyTorch", "LLaMA 2", "Hugging Face"],
      "description": "Co-architected and productionized an in-house Large Language Model fine-tuned on historical SOC alert data and security runbooks to decrease MTTR by 30-40%.",
      "features": ["Offline deployment ensuring zero client-data exposure", "Auto-generates draft alert summaries and containment suggestions", "Trained on categorized network logs"],
      "github": "https://github.com/sanjaykotabagi/soc-alert-llm"
    },
    {
      "id": "jailbroken-llama-redteam",
      "title": "Adversarial LLaMA 2 Jailbreaker",
      "category": "python",
      "tech": ["Python", "Transformers", "Adversarial AI", "LLaMA 2"],
      "description": "A jailbroken LLaMA 2 (7B) model fine-tuned for red-teaming and offensive threat modeling. Auto-generates adversarial prompts to test LLM security guardrails.",
      "features": ["Generates mock phishing payloads", "Adversarial prompt generation to test LLMs", "Directly sharpens detection rules"],
      "github": "https://github.com/sanjaykotabagi/adversarial-llama"
    },
    {
      "id": "triage-automation-scripts",
      "title": "Incident Enrichment Automation Suite",
      "category": "cybersecurity",
      "tech": ["Python", "REST APIs", "Splunk SPL", "Okta IAM"],
      "description": "A collection of custom Python scripts designed during Deloitte USI tenure that automates alert triage, cutting investigation times to under 3 minutes.",
      "features": ["Automated IP and Domain reputation lookup queries", "Alert correlation rules identifying Okta credential abuse", "Cleans and parses raw log outputs"],
      "github": "https://github.com/sanjaykotabagi/enrichment-automation"
    }
  ],

  init(containerId, filterClass) {
    this.container = document.getElementById(containerId);
    this.filterButtons = document.querySelectorAll(filterClass);

    if (!this.container) return;

    this.loadProjects();
    this.setupListeners();
  },

  loadProjects() {
    fetch('assets/data/projects.json')
      .then(response => {
        if (!response.ok) throw new Error('Data fetch failed');
        return response.json();
      })
      .then(data => {
        this.allProjects = data;
        this.renderList(data);
      })
      .catch(error => {
        console.warn("[SYSTEM] CORS or network block prevented project loading. Invoking hardcoded backup assets.", error);
        this.allProjects = this.fallbackData;
        this.renderList(this.fallbackData);
      });
  },

  setupListeners() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        this.filterCategory(category);
      });
    });
  },

  filterCategory(category) {
    if (category === 'all') {
      this.renderList(this.allProjects);
    } else {
      const filtered = this.allProjects.filter(p => p.category === category);
      this.renderList(filtered);
    }
  },

  renderList(projects) {
    this.container.innerHTML = '';

    if (projects.length === 0) {
      this.container.innerHTML = '<p class="terminal-muted">No projects found matching the active filter.</p>';
      return;
    }

    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'cyber-card blog-card fade-in-up active'; // Add trigger reveals
      
      const techBadges = p.tech.map(t => `<span class="tech-badge">${t}</span>`).join(' ');
      const featuresList = (p.features || []).map(f => `<li>${f}</li>`).join('');

      card.innerHTML = `
        <h3 class="card-title">
          <i data-lucide="shield-alert"></i>
          <span>${p.title}</span>
        </h3>
        <p class="terminal-muted" style="font-size: 0.85rem; margin-bottom: var(--spacing-sm);">${p.description}</p>
        
        <ul class="resume-bullets" style="margin-bottom: var(--spacing-md); font-size: 0.8rem;">
          ${featuresList}
        </ul>

        <div style="margin-bottom: var(--spacing-md); display: flex; flex-wrap: wrap; gap: 4px;">
          ${techBadges}
        </div>

        <div class="blog-link-btn" style="margin-top: auto;">
          <a href="${p.github}" target="_blank" class="cyber-btn cyber-btn-primary" style="padding: 6px var(--spacing-sm); font-size: 0.75rem;">
            <i data-lucide="github"></i> Repository
          </a>
        </div>
      `;

      this.container.appendChild(card);
    });

    // Re-trigger icon rendering if Lucide is loaded
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
};

// Initializer hook
document.addEventListener('DOMContentLoaded', () => {
  CyberProjects.init('projects-container', '.filter-btn');
});
window.CyberProjects = CyberProjects;
