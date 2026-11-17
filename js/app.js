/**
 * GHC High-Octane Grand Prix Controller
 * Color Palette: GHC Logo Electric Cyan (#00e5ff), Azure Blue (#0066ff), White, Carbon Black
 * Features: Scroll-driven Background Engine, VIP Paddock Pass Generator,
 * 5-Light F1 Starting Gantry, Confetti Celebrations, and Scrutineering Registry.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Engine Binding
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioStatusText = document.getElementById('audio-status-text');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isMuted = window.hyperAudio.toggleMute();
      if (audioStatusText) {
        audioStatusText.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
      }
      audioBtn.classList.toggle('text-cyan-400', !isMuted);
      audioBtn.classList.toggle('border-cyan-400', !isMuted);
    });
  }

  // Bind hover sound
  document.querySelectorAll('button, a, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.hyperAudio) window.hyperAudio.playHover();
    });
  });

  // 2. Initialize Scroll-Driven Hyperloop Background Animation
  if (typeof window.initScrollHyperloop === 'function') {
    window.initScrollHyperloop('scroll-hyperloop-canvas');
  }

  // 3. F1 Starting Telemetry Lights Sequence (Electric Cyan)
  initF1StartingLights();

  // 4. Interactive VIP Paddock Pass Generator
  initPaddockPassGenerator();

  // 5. Render Categories & Scrutineering
  renderCategories();

  // 6. Render Race Weekend Timeline & Countdown
  renderTimeline();
  startCountdownTimer();

  // 7. Render Constructor Teams ("The Hyperloop Way")
  renderAssociatedTeams();

  // 8. Render Parivahan Conference
  renderConference();

  // 9. Render Advisory Council
  renderAdvisors();

  // 10. Render FAQ Knowledgebase
  renderFAQs();

  // 11. Document Name Generator
  initDocNameHelper();

  // 12. Mobile Menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (window.hyperAudio) window.hyperAudio.playClick();
    });
  }

  // 13. Registration Modal
  initRegistrationModal();
});

// F1 5-Light Starting Sequence (Cyan Pulse)
function initF1StartingLights() {
  const triggerBtn = document.getElementById('f1-start-trigger');
  const lights = [
    document.getElementById('f1-light-1'),
    document.getElementById('f1-light-2'),
    document.getElementById('f1-light-3'),
    document.getElementById('f1-light-4'),
    document.getElementById('f1-light-5')
  ];
  const banner = document.getElementById('f1-lights-out-banner');

  if (!triggerBtn) return;

  let isStarting = false;

  triggerBtn.addEventListener('click', () => {
    if (isStarting) return;
    isStarting = true;

    // Reset lights
    lights.forEach(l => l && l.classList.remove('f1-light-active', 'bg-cyan-400'));
    if (banner) banner.classList.add('hidden');

    let step = 0;
    const interval = setInterval(() => {
      if (step < 5) {
        if (lights[step]) {
          lights[step].classList.add('f1-light-active', 'bg-cyan-400');
          if (window.hyperAudio) window.hyperAudio.playBeep(false);
        }
        step++;
      } else {
        clearInterval(interval);
        // Randomized pause
        const randomDelay = 600 + Math.random() * 600;
        setTimeout(() => {
          // LIGHTS OUT!
          lights.forEach(l => l && l.classList.remove('f1-light-active', 'bg-cyan-400'));
          if (banner) {
            banner.classList.remove('hidden');
            banner.classList.add('animate-bounce');
          }
          if (window.hyperAudio) {
            window.hyperAudio.playBeep(true);
            window.hyperAudio.playLaunch();
          }
          if (window.confetti) {
            window.confetti({
              particleCount: 80,
              spread: 90,
              origin: { y: 0.2 },
              colors: ['#00e5ff', '#0066ff', '#ffffff', '#38bdf8']
            });
          }
          setTimeout(() => {
            if (banner) banner.classList.add('hidden');
            isStarting = false;
          }, 3500);
        }, randomDelay);
      }
    }, 450);
  });
}

// Interactive VIP Paddock Pass Generator
function initPaddockPassGenerator() {
  const nameInput = document.getElementById('pass-input-name');
  const teamInput = document.getElementById('pass-input-team');
  const trackSelect = document.getElementById('pass-input-track');
  
  const displayHolder = document.getElementById('pass-display-holder');
  const displayTeam = document.getElementById('pass-display-team');
  const displayTrack = document.getElementById('pass-display-track');
  const displayId = document.getElementById('pass-display-id');
  
  const flipper = document.getElementById('pass-card-flipper');
  const flipBtn = document.getElementById('pass-flip-btn');
  const claimBtn = document.getElementById('pass-claim-btn');

  function update() {
    const name = (nameInput && nameInput.value.trim()) || "ALEX VANDERBILT";
    const team = (teamInput && teamInput.value.trim()) || "AVISHKAR HYPERLOOP";
    const track = (trackSelect && trackSelect.value) || "POD DEMONSTRATION";

    if (displayHolder) displayHolder.textContent = name.toUpperCase();
    if (displayTeam) displayTeam.textContent = team.toUpperCase();
    if (displayTrack) displayTrack.textContent = track.toUpperCase();

    const initials = name.split(' ').map(n => n[0] || '').join('').toUpperCase() || 'GH';
    if (displayId) displayId.textContent = `GHC-${initials}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  if (nameInput) nameInput.addEventListener('input', update);
  if (teamInput) teamInput.addEventListener('input', update);
  if (trackSelect) trackSelect.addEventListener('change', update);

  if (flipBtn && flipper) {
    flipBtn.addEventListener('click', () => {
      flipper.classList.toggle('flipped');
      if (window.hyperAudio) window.hyperAudio.playClick();
    });
  }

  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      if (window.hyperAudio) window.hyperAudio.playLaunch();
      if (window.confetti) {
        window.confetti({
          particleCount: 140,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#0066ff', '#ffffff', '#38bdf8']
        });
      }
      alert("VIP PADDOCK ACCREDITATION CONFIRMED! Your official pass has been entered into the IIT Madras Discovery Campus Scrutineering Registry.");
    });
  }
}

// Render Categories with Cyan / Azure Logo Styling
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container || !window.GHC_DATA) return;

  const categories = window.GHC_DATA.categories;
  let activeCatId = categories[0].id;

  function update() {
    container.innerHTML = `
      <!-- Division Switcher Bar -->
      <div class="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
        ${categories.map((c, idx) => `
          <button data-cat-id="${c.id}" class="cat-tab-btn px-5 py-3 rounded-lg text-xs md:text-sm font-anton tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
            c.id === activeCatId
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black shadow-[0_0_25px_rgba(0,229,255,0.6)] border border-cyan-400'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
          }">
            <span class="w-2 h-2 rounded-full ${c.id === activeCatId ? 'bg-black animate-ping' : 'bg-gray-600'}"></span>
            DIVISION 0${idx + 1}: ${c.name.toUpperCase()}
          </button>
        `).join('')}
      </div>

      <!-- Active Category Details -->
      ${renderActiveCategory(categories.find(c => c.id === activeCatId))}
    `;

    // Bind click events
    container.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCatId = btn.getAttribute('data-cat-id');
        if (window.hyperAudio) window.hyperAudio.playClick();
        update();
      });
    });
  }

  function renderActiveCategory(cat) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
        <!-- Left: Technical Scope & Regulations -->
        <div class="lg:col-span-7 bg-[#060b18]/85 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_35px_rgba(0,229,255,0.1)]">
          <div class="paddock-hazard-horizontal absolute top-0 left-0 right-0 h-1.5"></div>

          <div class="flex items-center justify-between mb-3 mt-1">
            <span class="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">OFFICIAL SCRUTINEERING REGULATIONS</span>
            <span class="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[11px] font-bold uppercase">${cat.badge}</span>
          </div>

          <h3 class="text-3xl md:text-4xl font-anton tracking-wide text-white mb-1 uppercase">${cat.name}</h3>
          <p class="text-xs font-mono text-blue-400 mb-6 uppercase tracking-wider">${cat.tagline}</p>
          <p class="text-gray-300 text-sm md:text-base leading-relaxed mb-8">${cat.description}</p>

          <h4 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Mandatory Engineering Standards
          </h4>
          <ul class="space-y-3 mb-8">
            ${cat.scope.map(s => `
              <li class="flex items-start gap-3 text-xs md:text-sm text-gray-300 bg-black/50 p-3 rounded-lg border border-white/5">
                <span class="text-cyan-400 font-mono font-bold">▶</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>

          <h4 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Required Dossier Submissions
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${cat.deliverables.map(d => `
              <div class="p-3.5 bg-black/70 border border-cyan-500/20 rounded-xl">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-mono text-xs font-black text-cyan-400">${d.code}</span>
                  <span class="text-[10px] font-mono text-white/50">${d.deadline}</span>
                </div>
                <div class="text-white text-xs font-bold leading-snug mb-1">${d.name}</div>
                <div class="text-[11px] font-mono text-gray-400">${d.pages}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: 100-Point Scrutineering Matrix -->
        <div class="lg:col-span-5 bg-gradient-to-br from-[#0a142c] to-black/90 border border-cyan-500/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,102,255,0.2)]">
          <div class="flex justify-between items-center mb-6">
            <h4 class="font-anton text-xl tracking-wide text-white uppercase">100-Point Score Grid</h4>
            <span class="font-mono text-xs px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full font-bold">OFFICIAL JURY</span>
          </div>
          
          <div class="space-y-4 mb-8">
            ${cat.scoring.breakdown.map(item => `
              <div>
                <div class="flex justify-between text-xs font-mono mb-1.5">
                  <span class="text-gray-300">${item.item}</span>
                  <span class="text-cyan-400 font-bold font-anton text-sm">${item.points} PTS</span>
                </div>
                <div class="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-cyan-400 to-blue-600 h-full rounded-full transition-all duration-1000" style="width: ${(item.points / 35) * 100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <button onclick="window.openRegistrationModal('${cat.name}')" class="w-full py-4 rounded-xl font-anton text-base tracking-wider bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-black shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all transform hover:scale-[1.02]">
            ENTER THIS DIVISION →
          </button>
          <p class="text-[11px] font-mono text-gray-400 text-center mt-3">Team Registration Closes Wed 25 Nov 23:59 IST</p>
        </div>
      </div>
    `;
  }

  update();
}

// Render Race Weekend Submission Itinerary
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container || !window.GHC_DATA) return;

  const dates = window.GHC_DATA.keyDates;
  container.innerHTML = dates.map(item => `
    <div class="relative pl-8 md:pl-12 pb-8 border-l-2 border-cyan-500/40 last:border-l-0 group">
      <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
        item.status === 'completed'
          ? 'bg-cyan-400 border-white'
          : item.status === 'current'
          ? 'bg-white border-cyan-400 animate-ping'
          : 'bg-black border-cyan-500'
      } transition-transform duration-300 group-hover:scale-125"></div>

      <div class="bg-[#060b18]/85 border border-white/10 hover:border-cyan-400/50 rounded-xl p-4 md:p-5 transition-all duration-300 group-hover:bg-[#0c1630]">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span class="font-anton text-lg md:text-xl text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide">
            ${item.event}
          </span>
          <span class="font-mono text-xs px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
            ${item.date}
          </span>
        </div>
        <p class="text-xs md:text-sm text-gray-400 leading-relaxed">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// Live Countdown Timer to Jan 4, 2027
function startCountdownTimer() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  const targetDate = new Date('2027-01-04T09:00:00+05:30').getTime();

  function tick() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }
  }

  tick();
  setInterval(tick, 1000);
}

// Render Constructor Teams
function renderAssociatedTeams() {
  const container = document.getElementById('teams-container');
  if (!container || !window.GHC_DATA) return;

  const teams = window.GHC_DATA.associatedTeams;
  container.innerHTML = teams.map((t, idx) => `
    <div class="card-angled p-6 relative group overflow-hidden bg-[#060b18]/85 border border-white/10 hover:border-cyan-400/60">
      <div class="paddock-hazard-horizontal absolute top-0 left-0 right-0 h-1"></div>

      <div class="flex items-start justify-between mb-4 mt-2">
        <div>
          <span class="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">CONSTRUCTOR 0${idx + 1} // ${t.domain}</span>
          <h4 class="text-2xl font-anton tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase">${t.name}</h4>
        </div>
        <span class="font-mono text-xs px-2.5 py-1 rounded bg-white/10 text-white font-bold">EST. ${t.founded}</span>
      </div>

      <div class="text-xs text-blue-300 font-mono mb-3">${t.institution}</div>
      <p class="text-xs md:text-sm text-gray-400 leading-relaxed mb-6">${t.highlights}</p>

      <a href="${t.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-white uppercase transition-colors">
        <span>CONSTRUCTOR DOSSIER</span>
        <span>→</span>
      </a>
    </div>
  `).join('');
}

// Render Parivahan Summit
function renderConference() {
  const container = document.getElementById('conference-days-container');
  const speakersContainer = document.getElementById('conference-speakers-container');
  if (!container || !window.GHC_DATA) return;

  const conf = window.GHC_DATA.conferenceParivahan;

  container.innerHTML = conf.days.map(d => `
    <div class="bg-[#060b18]/85 border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl p-5 md:p-6 transition-all">
      <div class="flex items-center gap-3 mb-2">
        <span class="px-3 py-1 rounded bg-blue-600 text-white font-anton text-sm tracking-wider uppercase">${d.day}</span>
        <h4 class="font-anton text-lg md:text-xl text-white uppercase tracking-wide">${d.title}</h4>
      </div>
      <p class="text-xs md:text-sm text-gray-300 leading-relaxed">${d.description}</p>
    </div>
  `).join('');

  if (speakersContainer) {
    speakersContainer.innerHTML = conf.distinguishedSpeakers.map(s => `
      <div class="p-3 bg-black/60 border border-white/10 rounded-xl flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-anton text-sm text-black font-black shrink-0">
          ${s.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div class="text-white text-xs font-bold">${s.name}</div>
          <div class="text-[11px] text-gray-400 font-mono leading-tight">${s.role}</div>
        </div>
      </div>
    `).join('');
  }
}

// Render Advisors
function renderAdvisors() {
  const container = document.getElementById('advisors-container');
  if (!container || !window.GHC_DATA) return;

  const advisors = window.GHC_DATA.advisors;
  container.innerHTML = advisors.map(a => `
    <div class="bg-[#060b18]/85 border border-white/10 hover:border-cyan-400/50 rounded-2xl p-6 text-center transition-all group">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center font-anton text-xl text-cyan-300 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.4)]">
        ${a.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
      </div>
      <h4 class="font-anton text-lg text-white group-hover:text-cyan-300 transition-colors uppercase mb-1">${a.name}</h4>
      <div class="text-[11px] font-mono text-cyan-400 font-bold mb-2 uppercase">${a.role}</div>
      <p class="text-xs text-gray-400 leading-relaxed">${a.affiliation}</p>
    </div>
  `).join('');
}

// Render FAQs & Search
function renderFAQs() {
  const container = document.getElementById('faq-accordion-container');
  const searchInput = document.getElementById('faq-search-input');
  if (!container || !window.GHC_DATA) return;

  const faqs = window.GHC_DATA.faqs;

  function renderList(items) {
    if (items.length === 0) {
      container.innerHTML = `<div class="text-center py-8 text-gray-400 font-mono text-xs">No matching questions in Scrutineering Knowledgebase.</div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="border border-white/10 rounded-xl overflow-hidden bg-[#060b18]/85 transition-colors">
        <button class="faq-trigger w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-white/5">
          <span class="font-anton text-sm md:text-base text-white uppercase tracking-wide">${item.q}</span>
          <span class="faq-icon text-cyan-400 font-mono text-xl transition-transform duration-200">+</span>
        </button>
        <div class="faq-content hidden px-5 pb-5 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
          ${item.a}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isOpen = !content.classList.contains('hidden');

        container.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        container.querySelectorAll('.faq-icon').forEach(ic => { ic.textContent = '+'; });

        if (!isOpen) {
          content.classList.remove('hidden');
          icon.textContent = '−';
          if (window.hyperAudio) window.hyperAudio.playClick();
        }
      });
    });
  }

  renderList(faqs);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
      renderList(filtered);
    });
  }
}

// Document Compliant Naming Helper
function initDocNameHelper() {
  const teamInput = document.getElementById('doc-team-id');
  const codeSelect = document.getElementById('doc-type-code');
  const outputEl = document.getElementById('doc-generated-filename');
  const copyBtn = document.getElementById('doc-copy-btn');

  function update() {
    const teamId = (teamInput && teamInput.value.trim().toUpperCase()) || 'IND042';
    const code = (codeSelect && codeSelect.value) || 'CDR';
    const filename = `GHC3_${teamId}_${code}.pdf`;
    if (outputEl) outputEl.textContent = filename;
  }

  if (teamInput) teamInput.addEventListener('input', update);
  if (codeSelect) codeSelect.addEventListener('change', update);

  if (copyBtn && outputEl) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(outputEl.textContent);
      copyBtn.textContent = 'COPIED TO CLIPBOARD!';
      if (window.hyperAudio) window.hyperAudio.playBeep(true);
      setTimeout(() => copyBtn.textContent = 'COPY STANDARDIZED FILENAME', 2000);
    });
  }
}

// Registration Modal
function initRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('reg-form');
  const trackSelect = document.getElementById('reg-track-select');

  window.openRegistrationModal = function(preferredTrack = '') {
    if (modal) {
      modal.classList.remove('hidden');
      if (trackSelect && preferredTrack) {
        trackSelect.value = preferredTrack;
      }
      if (window.hyperAudio) window.hyperAudio.playClick();
    }
  };

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      if (window.hyperAudio) window.hyperAudio.playClick();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.hyperAudio) window.hyperAudio.playLaunch();
      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#00e5ff', '#0066ff', '#ffffff', '#38bdf8']
        });
      }
      alert("ACCREDITATION RECEIVED! The GHC Technical Board has queued your team entry for Scrutineering.");
      if (modal) modal.classList.add('hidden');
      form.reset();
    });
  }
}
