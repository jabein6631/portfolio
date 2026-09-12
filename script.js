/**
 * Shaik Mahey Jabein - Personal Portfolio Website
 * Multi-Page View Switcher & GitHub Project Integration (@jabein6631)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Page View Switching ("When I click a page, it appears as the front view")
  // ------------------------------------------------------------------------
  const navBtns = document.querySelectorAll('.nav-btn, [data-page]');
  const pageViews = document.querySelectorAll('.page-view');

  function showPage(targetPageId) {
    if (targetPageId === 'resume') {
      const resumeModal = document.getElementById('resumeModal');
      if (resumeModal) {
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
      }
      return;
    }

    const validPages = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact', 'project-ai-fitness', 'project-otp', 'project-intern-portal', 'project-grounded-sam2'];
    const pageId = validPages.includes(targetPageId) ? targetPageId : 'home';

    // 1. Show target view, hide others
    pageViews.forEach(view => {
      if (view.getAttribute('data-view') === pageId) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // 2. Update active navbar button (Highlight "Projects" when on case study pages)
    navBtns.forEach(btn => {
      const page = btn.getAttribute('data-page') || btn.getAttribute('href')?.replace('#', '');
      if (page === pageId || ((pageId === 'project-ai-fitness' || pageId === 'project-otp' || pageId === 'project-intern-portal' || pageId === 'project-grounded-sam2') && page === 'projects')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Update URL hash
    if (window.location.hash !== `#${pageId}`) {
      history.pushState(null, '', `#${pageId}`);
    }

    // 4. Reset scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.navigateToPage = showPage;

  // Handle all nav button clicks
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetPage = btn.getAttribute('data-page') || btn.getAttribute('href')?.replace('#', '');
      if (targetPage) {
        e.preventDefault();
        showPage(targetPage);
      }
    });
  });

  // Handle Browser Back / Forward buttons & initial URL hash
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact', 'project-ai-fitness', 'project-otp', 'project-intern-portal', 'project-grounded-sam2'].includes(hash)) {
      showPage(hash);
    } else {
      showPage('home');
    }
  }

  window.addEventListener('hashchange', handleUrlHash);
  window.addEventListener('popstate', handleUrlHash);
  handleUrlHash();

  // ------------------------------------------------------------------------
  // 2. GitHub Live Repositories & Deployed Projects Integration (@jabein6631)
  // ------------------------------------------------------------------------
  const GITHUB_USERNAME = 'jabein6631';
  const projectsContainer = document.getElementById('projectsContainer');
  const syncGithubBtn = document.getElementById('syncGithubBtn');
  const githubUserInput = document.getElementById('githubUserInput');

  const defaultShowcaseProjects = [
    {
      name: 'Portfolio Website',
      description: 'Personal portfolio website built using HTML, CSS and JavaScript with soft cream and dusty rose aesthetic.',
      language: 'JavaScript',
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      html_url: `https://github.com/${GITHUB_USERNAME}/portfolio`,
      homepage: '#',
      type: 'portfolio'
    },
    {
      name: 'Task Manager Web App',
      description: 'A full-stack task manager with user authentication, CRUD operations, kanban columns, and real-time status tracking.',
      language: 'React',
      tags: ['React', 'Node.js', 'MongoDB'],
      html_url: `https://github.com/${GITHUB_USERNAME}/task-manager`,
      homepage: '#',
      type: 'taskmanager'
    },
    {
      name: 'Weather App',
      description: 'Real-time weather forecast application connecting to OpenWeatherMap API with geolocation and dynamic climate animations.',
      language: 'JavaScript',
      tags: ['HTML5', 'JavaScript', 'REST API'],
      html_url: `https://github.com/${GITHUB_USERNAME}/weather-app`,
      homepage: '#',
      type: 'weather'
    },
    {
      name: 'Student Result Management System',
      description: 'Enterprise academic management software designed in Java with MySQL database to record student grades and output scorecards.',
      language: 'Java',
      tags: ['Java', 'MySQL', 'JDBC'],
      html_url: `https://github.com/${GITHUB_USERNAME}/student-result-system`,
      homepage: '#',
      type: 'studentresult'
    }
  ];

  function renderProjects(projectsList) {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';

    projectsList.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-showcase-card';
      card.setAttribute('data-project', proj.type || `github-${idx}`);

      const tagsHTML = (proj.tags || [proj.language || 'Code'])
        .map(t => `<span class="tag">${t}</span>`).join('');

      const demoBtn = proj.homepage && proj.homepage !== '#' ?
        `<a href="${proj.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-mini-proj" onclick="event.stopPropagation()">Live Demo 🌐</a>` :
        `<button class="btn btn-primary btn-mini-proj">View Details ↗</button>`;

      card.innerHTML = `
        <div class="showcase-preview thumb-${proj.type || 'portfolio'}">
          <div class="mock-browser-header">
            <span class="mock-dot red"></span>
            <span class="mock-dot yellow"></span>
            <span class="mock-dot green"></span>
          </div>
          <div class="mock-preview-content portfolio-mock">
            <div class="mock-line title"></div>
            <div class="mock-row">
              <div class="mock-box small"></div>
              <div class="mock-box wide"></div>
            </div>
          </div>
        </div>
        <div class="showcase-body">
          <span class="showcase-cat">${proj.language || 'Project'}</span>
          <h3 class="showcase-title">${proj.name.replace(/[-_]/g, ' ')}</h3>
          <p class="showcase-desc">${proj.description || 'Modern software development project built by Shaik Mahey Jabein.'}</p>
          <div class="showcase-tags">${tagsHTML}</div>
          <div class="showcase-actions">
            ${demoBtn}
            <a href="${proj.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-mini-proj" onclick="event.stopPropagation()">GitHub ↗</a>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openProjectModal(proj.type || 'portfolio', proj);
      });

      projectsContainer.appendChild(card);
    });
  }

  // Fetch Repositories from GitHub REST API
  async function fetchGitHubRepos(username) {
    if (!username) return;
    showToast(`⚡ Fetching repositories for @${username}...`);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);
      if (!response.ok) throw new Error('GitHub API response not ok');
      const repos = await response.json();

      if (Array.isArray(repos) && repos.length > 0) {
        const mappedProjects = repos.map(r => ({
          name: r.name,
          description: r.description || `Repository created by ${username}.`,
          language: r.language || 'JavaScript',
          tags: [r.language || 'Code', ...(r.topics || [])].slice(0, 3),
          html_url: r.html_url,
          homepage: r.homepage || '#',
          type: 'portfolio'
        }));
        renderProjects(mappedProjects);
        showToast(`🌸 Loaded ${repos.length} live projects from GitHub!`);
      } else {
        renderProjects(defaultShowcaseProjects);
        showToast(`Showing featured projects for @${username}`);
      }
    } catch (err) {
      console.log('GitHub API offline or rate-limited, using showcase projects', err);
      renderProjects(defaultShowcaseProjects);
    }
  }

  // Initial load
  fetchGitHubRepos(GITHUB_USERNAME);

  if (syncGithubBtn && githubUserInput) {
    syncGithubBtn.addEventListener('click', () => {
      const customUser = githubUserInput.value.trim().replace('https://github.com/', '').replace('/', '');
      if (customUser) {
        fetchGitHubRepos(customUser);
      }
    });
  }

  // Theme initialization is handled comprehensively in initThemeToggle() below

  // ------------------------------------------------------------------------
  // 4. Mobile Menu Toggle
  // ------------------------------------------------------------------------
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Project Details Modal
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const projectDatabase = {
    'fitness-maker': {
      title: 'AI Fitness Maker',
      category: 'AI / ML',
      image: 'proj_fitness_ai.jpg',
      badgeColor: '#FF174F',
      tech: ['Python', 'MediaPipe', 'FastAPI', 'MongoDB', 'React', 'Google Auth'],
      description: 'AI-powered fitness application with real-time pose detection, workout tracking and performance analytics. Helps users achieve fitness goals smarter and efficiently.',
      features: [
        'Real-time 33-point skeletal landmark detection via MediaPipe',
        'Repetition counting and posture accuracy grading with instant feedback',
        'FastAPI asynchronous backend for low-latency telemetry processing',
        'Performance analytics dashboard tracking calories, duration, and sets'
      ],
      github: `https://github.com/${GITHUB_USERNAME}`,
      demo: '#'
    },
    'grounded-sam': {
      title: 'Grounded SAM 2',
      category: 'AI / Computer Vision',
      image: 'proj_grounded_sam.jpg',
      badgeColor: '#FF2B68',
      tech: ['Python', 'SAM 2', 'Grounding DINO', 'Florence-2', 'PyTorch', 'OpenCV'],
      description: 'Open-world object detection, segmentation and tracking in images and videos using Grounding DINO and SAM 2. Supports text prompts, video tracking and high-resolution inference.',
      features: [
        'Zero-shot open-vocabulary object grounding from natural language text prompts',
        'Frame-by-frame mask propagation and temporal tracking in high-resolution video',
        'Florence-2 vision foundation model integration for multi-modal scene understanding',
        'Optimized GPU inference pipelines built with PyTorch and CUDA'
      ],
      github: 'https://github.com/jabein6631/AI-agent',
      demo: 'https://ai-agent-pwpc.onrender.com/'
    },
    'intern-portal': {
      title: 'Intern Portal',
      category: 'Full Stack',
      image: 'proj_intern_portal.jpg',
      badgeColor: '#FF174F',
      tech: ['Next.js', 'Flask', 'MongoDB', 'JWT', 'Tailwind CSS', 'Chart.js'],
      description: 'Full-stack internship management platform with task assignment, attendance tracking, journals, analytics, calendar and real-time communication between mentors and interns.',
      features: [
        'Dedicated role-based dashboards for Administrators, Mentors, and Interns',
        'Daily journal logging, review workflow, and attendance tracking',
        'Visual velocity charts and deadline milestone alerts via Chart.js',
        'Secure JWT authentication with RESTful Flask & MongoDB backend'
      ],
      github: `https://github.com/${GITHUB_USERNAME}`,
      demo: '#'
    },
    'landscape-gis': {
      title: 'LANDSCAPE',
      category: 'AI / GIS',
      image: 'proj_landscape_gis.jpg',
      badgeColor: '#FF2B68',
      tech: ['Python', 'React', 'Supabase', 'GIS', 'Computer Vision', 'Leaflet'],
      description: 'AI Infrastructure Inspection & Maintenance Prioritization Platform. Detects infrastructure issues, analyzes risks and generates prioritized maintenance plans.',
      features: [
        'High-resolution satellite and aerial drone image computer vision processing',
        'Automated anomaly detection across urban road and bridge infrastructure',
        'Dynamic Infrastructure Risk Score (0-100) with interactive geospatial map layers',
        'Automated maintenance schedule generation with priority dispatch'
      ],
      github: 'https://github.com/Abidbaig-06/ai-infrastructure-inspection',
      demo: 'https://ai-infrastructure-inspection.vercel.app/'
    },
    'otp-system': {
      title: 'OTP Verification System',
      category: 'Other / Full Stack',
      image: 'proj_otp_system.jpg',
      badgeColor: '#FF174F',
      tech: ['Python', 'Flask', 'SQLite', 'SMTP'],
      description: 'Secure, lightweight authentication service providing time-sensitive One-Time Password generation, email dispatch, validation logic and session rate limiting.',
      features: [
        'Cryptographically strong random 6-digit OTP generation with 5-minute expiry',
        'Automated SMTP email dispatch integration with retry and throttle protection',
        'SQLite transaction log for verification auditing and anti-brute force defense',
        'Extensible REST API endpoints for seamless multi-platform integration'
      ],
      github: `https://github.com/${GITHUB_USERNAME}`,
      demo: '#'
    },
    'experiments-lab': {
      title: 'Exploratory AI & UI Labs',
      category: 'Experiments',
      image: 'proj_experiments.jpg',
      badgeColor: '#FF2B68',
      tech: ['WebGL', 'Three.js', 'HuggingFace', 'WebSockets', 'Canvas API'],
      description: 'A sandbox collection of interactive generative algorithms, micro-interactions, neural network visualizers and shader explorations.',
      features: [
        'Real-time WebGL particle physics simulations with mouse repulsion',
        'Client-side Transformers.js pipeline testing for text embeddings',
        'Custom SVG UI layout experiments and micro-interaction prototypes',
        'Interactive computational graph visualizations'
      ],
      github: `https://github.com/${GITHUB_USERNAME}`,
      demo: '#'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId] || projectDatabase['fitness-maker'];

    modalContent.innerHTML = `
      <div class="modal-cyber-wrapper" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="position: relative; width: 100%; height: 260px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(122,22,48,0.4); background: #1B080D;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span style="position: absolute; top: 12px; left: 12px; font-size: 0.72rem; font-weight: 700; background: rgba(27,8,13,0.9); color: ${data.badgeColor || '#FF174F'}; padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(122,22,48,0.5);">${data.category}</span>
        </div>
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-bottom: 6px;">${data.title}</h2>
          <p style="font-size: 0.86rem; color: #C9AEB5; line-height: 1.55;">${data.description}</p>
        </div>
        <div>
          <h4 style="font-size: 0.84rem; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Key Capabilities & Features:</h4>
          <ul style="padding-left: 18px; font-size: 0.82rem; color: #C9AEB5; line-height: 1.6;">
            ${data.features.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.84rem; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Technologies:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.tech.map(t => `<span style="background: rgba(38,11,18,0.85); border: 1px solid rgba(122,22,48,0.4); color: #C9AEB5; padding: 4px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 600;">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; margin-top: 4px;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-proj-view" style="text-decoration: none; padding: 8px 18px;">
            <span>GitHub Repository</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <button class="btn btn-proj-gh close-modal-action" style="cursor: pointer;">Close</button>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');

    const closeAction = modalContent.querySelector('.close-modal-action');
    if (closeAction) {
      closeAction.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // Bind View Project buttons & Case Study navigation
  document.querySelectorAll('.btn-proj-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project-id');
      if (projId === 'ai-fitness-maker') {
        showPage('project-ai-fitness');
      } else if (projId === 'otp-system') {
        showPage('project-otp');
      } else if (projId === 'intern-portal') {
        showPage('project-intern-portal');
      } else if (projId === 'grounded-sam') {
        showPage('project-grounded-sam2');
      } else if (projId) {
        openProjectModal(projId);
      }
    });
  });

  // Back to Projects button in Case Study
  const btnBackToProjects = document.getElementById('btnBackToProjects');
  if (btnBackToProjects) {
    btnBackToProjects.addEventListener('click', () => {
      showPage('projects');
    });
  }

  // Project Snapshot Strip Carousel
  const csStage = document.getElementById('csStage');
  const csPrevBtn = document.getElementById('csPrevBtn');
  const csNextBtn = document.getElementById('csNextBtn');
  const csThumbs = document.querySelectorAll('#csThumbStrip .cs-thumb-item');
  let currentCsSlide = 0;
  const totalCsSlides = 6;

  function updateCsCarousel(slideIdx) {
    currentCsSlide = (slideIdx + totalCsSlides) % totalCsSlides;
    if (csStage) {
      csStage.style.transform = `translateX(-${currentCsSlide * 100}%)`;
    }
    csThumbs.forEach((thumb, i) => {
      if (i === currentCsSlide) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  if (csPrevBtn) {
    csPrevBtn.addEventListener('click', () => updateCsCarousel(currentCsSlide - 1));
  }
  if (csNextBtn) {
    csNextBtn.addEventListener('click', () => updateCsCarousel(currentCsSlide + 1));
  }
  csThumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => updateCsCarousel(idx));
  });

  // Project Category Filter Tabs
  const filterTabs = document.querySelectorAll('#projectFilterTabs .filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-cyber-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Sorting
  const sortSelect = document.getElementById('projectSortSelect');
  const gridContainer = document.getElementById('projectsCyberGrid');

  if (sortSelect && gridContainer) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const cardsArr = Array.from(document.querySelectorAll('.project-cyber-card'));

      if (val === 'latest') {
        cardsArr.sort((a, b) => parseInt(a.getAttribute('data-order') || '0') - parseInt(b.getAttribute('data-order') || '0'));
      } else if (val === 'oldest') {
        cardsArr.sort((a, b) => parseInt(b.getAttribute('data-order') || '0') - parseInt(a.getAttribute('data-order') || '0'));
      } else if (val === 'name') {
        cardsArr.sort((a, b) => (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || ''));
      }

      cardsArr.forEach(card => gridContainer.appendChild(card));
    });
  }

  // Grid / List View Toggles
  const btnGridView = document.getElementById('btnGridView');
  const btnListView = document.getElementById('btnListView');

  if (btnGridView && btnListView && gridContainer) {
    btnGridView.addEventListener('click', () => {
      btnGridView.classList.add('active');
      btnListView.classList.remove('active');
      gridContainer.classList.remove('list-view');
    });

    btnListView.addEventListener('click', () => {
      btnListView.classList.add('active');
      btnGridView.classList.remove('active');
      gridContainer.classList.add('list-view');
    });
  }

  // ------------------------------------------------------------------------
  // 6. Resume Modal & Actions
  // ------------------------------------------------------------------------
  const resumeBtn = document.getElementById('resumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const downloadPdfAction = document.getElementById('downloadPdfAction');
  const printResumeAction = document.getElementById('printResumeAction');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
    }
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', () => {
      showToast('📄 Downloading Shaik Mahey Jabein Resume (PDF)...');
    });
  }

  if (resumeModal) {
    if (closeResumeModalBtn) {
      closeResumeModalBtn.addEventListener('click', () => {
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
      });
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
      }
    });

    if (downloadPdfAction) {
      downloadPdfAction.addEventListener('click', () => {
        showToast('📄 Downloading Shaik Mahey Jabein Resume (PDF)...');
      });
    }

    if (printResumeAction) {
      printResumeAction.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // ------------------------------------------------------------------------
  // 7. Contact Form Submissions
  // ------------------------------------------------------------------------
  const mainContactForm = document.getElementById('mainContactForm');
  const phoneRequestTile = document.getElementById('phoneRequestTile');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = mainContactForm.querySelector('input[name="name"]');
      const name = nameInput ? nameInput.value.trim() : 'Friend';
      const submitButton = mainContactForm.querySelector('button[type="submit"]');

      if (submitButton) {
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Transmitting...</span> ⚡';
        submitButton.disabled = true;

        setTimeout(() => {
          submitButton.innerHTML = originalHTML;
          submitButton.disabled = false;
          mainContactForm.reset();
          showToast(`⚡ Message dispatched! Thank you${name ? ', ' + name : ''}. I will respond within 24 hours.`);
        }, 900);
      }
    });
  }



  // ------------------------------------------------------------------------
  // 8. Toast Notification Helper
  // ------------------------------------------------------------------------
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout = null;

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastMessage.textContent = msg;
    toastNotification.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) closeProjectModal();
      if (resumeModal && resumeModal.classList.contains('active')) resumeModal.classList.remove('active');
    }
  });

  // ------------------------------------------------------------------------
  // 9. Interactive Holographic AI Brain & Synaptic Constellation Canvas
  // ------------------------------------------------------------------------
  function initSynapticCanvas() {
    const canvas = document.getElementById('synapticCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth || 440);
    let height = (canvas.height = canvas.offsetHeight || 440);

    window.addEventListener('resize', () => {
      if (canvas.offsetWidth && canvas.offsetHeight) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    });

    const particles = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 35 + Math.random() * 115;
      const centerX = width / 2;
      const centerY = height * 0.35; // upper area where holographic brain sits

      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * (radius * 0.72),
        originX: centerX + Math.cos(angle) * radius,
        originY: centerY + Math.sin(angle) * (radius * 0.72),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: 1.2 + Math.random() * 2.2,
        color: Math.random() > 0.5 ? '#FF174F' : '#FF2B68',
        alpha: 0.3 + Math.random() * 0.65,
        pulseSpeed: 0.02 + Math.random() * 0.035
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle synaptic connecting filament lines between close nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            const opacity = (1 - dist / 70) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 23, 79, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw glowing neural nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - p.originX;
        const dy = p.y - p.originY;
        if (Math.sqrt(dx * dx + dy * dy) > 28) {
          p.vx -= dx * 0.006;
          p.vy -= dy * 0.006;
        }

        p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.06) * 0.02;
        const clampedAlpha = Math.max(0.2, Math.min(0.95, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();

    // Mouse Parallax Effect on 3D AI Stage and Floating Cards
    const stageContainer = document.getElementById('aiStageContainer');
    const stageAsset = document.getElementById('stageCenterpiece');
    const cards = document.querySelectorAll('.glass-tech-card');

    if (stageContainer) {
      stageContainer.addEventListener('mousemove', (e) => {
        const rect = stageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const tiltX = (y / rect.height) * -12;
        const tiltY = (x / rect.width) * 12;

        if (stageAsset) {
          stageAsset.style.transform = `perspective(900px) rotateX(${tiltX * 0.65}deg) rotateY(${tiltY * 0.65}deg) translateY(-4px)`;
        }

        cards.forEach(card => {
          const isTop = card.classList.contains('card-ai-ml') || card.classList.contains('card-computervision');
          const depth = isTop ? 1.3 : 0.8;
          card.style.transform = `translate(${x * 0.03 * depth}px, ${y * 0.03 * depth}px)`;
        });
      });

      stageContainer.addEventListener('mouseleave', () => {
        if (stageAsset) {
          stageAsset.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
        }
        cards.forEach(card => {
          card.style.transform = 'translate(0, 0)';
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Skills Page Filter Tabs & Real-Time Search
  // --------------------------------------------------------------------------
  function initSkillsFilters() {
    const filterTabs = document.querySelectorAll('#skillsFilterTabs .skills-filter-tab');
    const searchInput = document.getElementById('skillsSearchInput');
    const skillCards = document.querySelectorAll('.skills-card');

    let currentFilter = 'all';
    let searchQuery = '';

    function applyFilterAndSearch() {
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const keywords = (card.getAttribute('data-keywords') || '') + ' ' + (card.textContent || '');
        const matchesCat = currentFilter === 'all' || cat.includes(currentFilter);
        const matchesSearch = !searchQuery || keywords.toLowerCase().includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter') || 'all';
        applyFilterAndSearch();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilterAndSearch();
      });
    }
  }

  // --------------------------------------------------------------------------
  // Contact Form Submission Directly to Mailbox (shaikmaheyjabein@gmail.com)
  // --------------------------------------------------------------------------
  function initContactForm() {
    const contactForm = document.getElementById('mainContactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('contactUserName');
    const emailInput = document.getElementById('contactUserEmail');
    const subjectInput = document.getElementById('contactUserSubject');
    const messageInput = document.getElementById('contactUserMessage');
    const submitBtn = document.getElementById('mainSubmitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnIcon = document.getElementById('submitBtnIcon');
    const statusDiv = document.getElementById('contactFormStatus');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Set Loading State
      submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
      if (submitBtnIcon) submitBtnIcon.style.display = 'none';

      let spinner = submitBtn.querySelector('.btn-spinner');
      if (!spinner) {
        spinner = document.createElement('span');
        spinner.className = 'btn-spinner';
        submitBtn.prepend(spinner);
      }

      hideStatus();

      try {
        const response = await fetch('https://formsubmit.co/ajax/shaikmaheyjabein@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _replyto: email,
            _subject: `[Portfolio Message from ${name}] ${subject}`,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true)) {
          showStatus('✓ Message sent successfully! I will get back to you at ' + email + ' soon.', 'success');
          contactForm.reset();
        } else if (result.message && result.message.includes('Activation')) {
          showStatus('✓ Activation email sent to shaikmaheyjabein@gmail.com. Please confirm the link once in your Gmail inbox to receive all messages!', 'success');
          contactForm.reset();
        } else {
          fallbackToMailto(name, email, subject, message);
        }
      } catch (err) {
        console.warn('FormSubmit AJAX error, falling back to direct email:', err);
        fallbackToMailto(name, email, subject, message);
      } finally {
        submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'Send Message';
        if (submitBtnIcon) submitBtnIcon.style.display = 'inline-block';
        const sp = submitBtn.querySelector('.btn-spinner');
        if (sp) sp.remove();
      }
    });

    function showStatus(text, type) {
      if (!statusDiv) return;
      statusDiv.className = `contact-form-status ${type}`;
      statusDiv.textContent = text;
      statusDiv.style.display = 'flex';
    }

    function hideStatus() {
      if (!statusDiv) return;
      statusDiv.style.display = 'none';
    }

    function fallbackToMailto(name, email, subject, message) {
      showStatus('Opening your default email client to send message to shaikmaheyjabein@gmail.com...', 'success');
      const mailtoUrl = `mailto:shaikmaheyjabein@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      window.location.href = mailtoUrl;
    }
  }

  // --------------------------------------------------------------------------
  // Theme Switcher (Dark / Light Mode Toggle Button)
  // --------------------------------------------------------------------------
  function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);

      // Tactile button spin animation on click
      themeToggleBtn.style.transform = 'rotate(360deg) scale(1.15)';
      setTimeout(() => {
        themeToggleBtn.style.transform = '';
      }, 300);
    });

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'light') {
        themeToggleBtn.setAttribute('title', 'Switch to Dark Cyber Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Cyber Mode');
      } else {
        themeToggleBtn.setAttribute('title', 'Switch to Clean Light Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Clean Light Mode');
      }
    }
  }

  // --------------------------------------------------------------------------
  // Synaptic Brain Constellation Canvas Animation (Crimson & Rose Cyber Glow)
  // --------------------------------------------------------------------------
  function initSynapticCanvas() {
    const canvas = document.getElementById('synapticCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth || 440);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 440);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth || 440;
        height = canvas.height = canvas.parentElement.offsetHeight || 440;
      }
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.4 ? '#FF174F' : '#FF2B68'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 23, 79, ${0.35 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#FF174F';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  initThemeToggle();
  initContactForm();
  initSkillsFilters();
  initSynapticCanvas();
});

// Year Switcher Tab Handler for Achievements Page
window.switchAchievementYear = function (year) {
  const tab2nd = document.getElementById('tabYear2nd');
  const tab1st = document.getElementById('tabYear1st');
  const sec2nd = document.getElementById('secYear2nd');
  const sec1st = document.getElementById('secYear1st');

  if (!tab2nd || !tab1st || !sec2nd || !sec1st) return;

  if (year === '2nd') {
    tab2nd.classList.add('active');
    tab1st.classList.remove('active');
    sec2nd.style.display = 'block';
    sec1st.style.display = 'none';
  } else {
    tab1st.classList.add('active');
    tab2nd.classList.remove('active');
    sec1st.style.display = 'block';
    sec2nd.style.display = 'none';
  }
};


