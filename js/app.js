/**
 * ====================================================================
 *  ADITI'S 21st BIRTHDAY SURPRISE — MASTER CONTROLLER
 *  Coordinates chapters, interactions, animations, lightbox & easter eggs
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.birthdayConfig;
  if (!cfg) {
    console.error('birthdayConfig not loaded!');
    return;
  }

  // 1. Initialize DOM population
  populateConfigData(cfg);

  // 2. Setup typewriter intro & unlock sequence
  setupIntroSequence(cfg);

  // 3. Setup scroll observers & reveal animations
  setupScrollAnimations();

  // 4. Setup Polaroid Gallery & Lightbox
  setupPolaroidLightbox(cfg);

  // 5. Setup Digital Wax-Seal Letter
  setupWaxSealLetter();

  // 6. Setup Memory Vault Flip Cards
  setupMemoryVault();

  // 7. Setup Animated Scientific Stats
  setupStatsCounters();

  // 8. Setup Grand Finale & Suspense Reveal
  setupFinaleCelebration(cfg);

  // 9. Setup Secret Easter Egg
  setupEasterEgg(cfg);

  // 10. Setup Custom Desktop Cursor & Micro-Interactions
  setupCustomCursor();
});

/**
 * Populate all dynamic content from birthdayConfig into the DOM
 */
function populateConfigData(cfg) {
  // Intro Chapter
  setText('#intro-greeting', cfg.intro.greeting);
  setText('#intro-subgreeting', cfg.intro.subGreeting);
  setText('#intro-line-1', cfg.intro.lines[0]);
  setText('#intro-line-2', cfg.intro.lines[1]);
  setText('#intro-line-3', cfg.intro.lines[2]);
  setText('#intro-line-4', cfg.intro.lines[3]);
  setText('#intro-highlight', cfg.intro.highlightName);
  setText('#open-surprise-btn-text', cfg.intro.buttonText);

  // Hero Chapter
  setText('#hero-badge', cfg.hero.badge);
  setText('#hero-heading', cfg.hero.heading);
  setText('#hero-tagline', cfg.hero.tagline);
  setText('#hero-dedication', cfg.hero.dedication);
  setText('#hero-message', cfg.hero.heartfeltMessage);

  // Render Polaroid Memories Wall
  renderPolaroidWall(cfg.memories);

  // Render Journey Timeline
  renderTimeline(cfg.timeline);

  // Render Admirations
  renderAdmirations(cfg.admirations);

  // Render Wax-Seal Letter
  renderLetter(cfg.letter);

  // Render Memory Vault
  renderMemoryVault(cfg.secretCards);

  // Render Scientific Stats
  renderScientificStats(cfg.scientificStats);

  // Render Future Wishes
  renderFutureWishes(cfg.futureWishes);

  // Render Finale
  setText('#finale-suspense-1', cfg.finale.suspense1);
  setText('#finale-suspense-2', cfg.finale.suspense2);
  setText('#finale-big-reveal', cfg.finale.grandRevealBig);
  setText('#finale-birthday-name', cfg.finale.grandRevealBirthday);
  setText('#finale-collage-quote', cfg.finale.collageQuote);
  setText('#finale-collage-sub', cfg.finale.collageSub);

  // Render Collage Photos
  renderCollagePhotos(cfg.memories);
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el && text) el.textContent = text;
}

/**
 * Chapter 0: Typewriter / Cinematic Intro Sequence
 */
function setupIntroSequence(cfg) {
  const introContainer = document.getElementById('intro-screen');
  const surpriseBtn = document.getElementById('open-surprise-btn');
  const mainContent = document.getElementById('main-experience');
  const floatingMusic = document.getElementById('floating-music-player');

  // Ensure surprise button and text lines are immediately visible and pulsing
  const lines = document.querySelectorAll('.intro-fade-line');
  lines.forEach((line) => line.classList.add('is-visible'));
  if (surpriseBtn) {
    surpriseBtn.classList.add('is-visible', 'pulse-glow');
  }

  // When "Open Your Surprise" is clicked
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      // 1. Trigger audio playback of Apna Bana Le immediately on user gesture!
      if (window.birthdayAudio) {
        window.birthdayAudio.startOnGesture();
      }

      // 2. Launch celebration burst
      if (window.celebrationFX) {
        window.celebrationFX.launchConfetti({ count: 180, y: window.innerHeight * 0.4 });
        window.celebrationFX.launchFloatingHearts(25, window.innerWidth * 0.5, window.innerHeight * 0.6);
      }

      // 3. Fade out intro & direct to the main birthday experience
      introContainer.classList.add('fade-out');

      setTimeout(() => {
        introContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in');
        if (floatingMusic) {
          floatingMusic.classList.remove('hidden');
          floatingMusic.classList.add('is-visible');
        }

        // Direct user smoothly to the following page (Hero section)
        const heroEl = document.getElementById('chapter-hero');
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    });
  }
}

/**
 * Render Polaroid Photo Wall with tilt angles & captions
 */
function renderPolaroidWall(memories) {
  const container = document.getElementById('polaroid-grid');
  if (!container || !memories) return;

  container.innerHTML = '';
  memories.forEach((mem, index) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card glass-panel scroll-reveal';
    card.dataset.index = index;
    card.style.setProperty('--card-rotation', `${mem.rotation || 0}deg`);

    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-img-wrapper">
        <img src="${mem.image}" alt="${mem.title}" loading="lazy" class="polaroid-img" />
        <div class="polaroid-tag">${mem.tag}</div>
      </div>
      <div class="polaroid-caption">
        <div class="polaroid-date">${mem.date}</div>
        <h3 class="polaroid-title">${mem.title}</h3>
        <p class="polaroid-text">${mem.caption}</p>
      </div>
      <div class="polaroid-hover-hint">Click to read memory ✨</div>
    `;

    container.appendChild(card);
  });
}

/**
 * Polaroid Lightbox Modal interaction
 */
function setupPolaroidLightbox(cfg) {
  const modal = document.getElementById('memory-lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const lbImg = document.getElementById('lightbox-img');
  const lbTag = document.getElementById('lightbox-tag');
  const lbDate = document.getElementById('lightbox-date');
  const lbTitle = document.getElementById('lightbox-title');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbStory = document.getElementById('lightbox-story');
  const heartBtn = document.getElementById('lightbox-heart-btn');
  const heartCount = document.getElementById('lightbox-heart-count');

  let currentLikes = 21;

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid-card');
    if (!card) return;

    const index = parseInt(card.dataset.index, 10);
    const mem = cfg.memories[index];
    if (!mem || !modal) return;

    lbImg.src = mem.image;
    lbImg.alt = mem.title;
    lbTag.textContent = mem.tag;
    lbDate.textContent = mem.date;
    lbTitle.textContent = mem.title;
    lbCaption.textContent = mem.caption;
    lbStory.textContent = mem.story;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Heart like button in modal
  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      currentLikes++;
      if (heartCount) heartCount.textContent = currentLikes;
      heartBtn.classList.add('heart-burst');
      setTimeout(() => heartBtn.classList.remove('heart-burst'), 600);

      // Trigger mini hearts
      if (window.celebrationFX) {
        const rect = heartBtn.getBoundingClientRect();
        window.celebrationFX.launchFloatingHearts(6, rect.left + rect.width / 2, rect.top);
      }
    });
  }

  // 3D Tilt on desktop
  document.querySelectorAll('.polaroid-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 6;
      const rotY = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      const rot = card.style.getPropertyValue('--card-rotation') || '0deg';
      card.style.transform = `rotate(${rot})`;
    });
  });
}

/**
 * Render Milestone Timeline
 */
function renderTimeline(timeline) {
  const container = document.getElementById('timeline-container');
  if (!container || !timeline) return;

  container.innerHTML = '';
  timeline.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const node = document.createElement('div');
    node.className = `timeline-node ${isEven ? 'timeline-left' : 'timeline-right'} scroll-reveal`;

    node.innerHTML = `
      <div class="timeline-dot">
        <div class="timeline-dot-inner"></div>
      </div>
      <div class="timeline-card glass-panel">
        <div class="timeline-year-badge">${item.year}</div>
        <div class="timeline-date">${item.date}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `;

    container.appendChild(node);
  });
}

/**
 * Render Things I Admire Cards
 */
function renderAdmirations(admirations) {
  const container = document.getElementById('admirations-grid');
  if (!container || !admirations) return;

  container.innerHTML = '';
  admirations.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'admiration-card glass-panel scroll-reveal';

    card.innerHTML = `
      <div class="admiration-icon-box">
        <span class="admiration-sparkle">✦</span>
      </div>
      <div class="admiration-sub">${item.subtitle}</div>
      <h3 class="admiration-title">${item.title}</h3>
      <p class="admiration-desc">${item.description}</p>
      <div class="admiration-secret-note">
        <span class="secret-label">Note from Mani:</span> "${item.secretNote}"
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Render Digital Wax-Seal Letter
 */
function renderLetter(letter) {
  setText('#letter-envelope-title', letter.envelopeTitle);
  setText('#letter-seal-text', letter.sealText);
  setText('#letter-date', letter.letterDate);
  setText('#letter-recipient', letter.letterRecipient);
  setText('#letter-closing', letter.closing);
  setText('#letter-signature', letter.signature);

  const bodyContainer = document.getElementById('letter-paragraphs');
  if (bodyContainer && letter.paragraphs) {
    bodyContainer.innerHTML = '';
    letter.paragraphs.forEach(para => {
      const p = document.createElement('p');
      p.className = 'letter-para';
      p.textContent = para;
      bodyContainer.appendChild(p);
    });
  }
}

/**
 * Wax Seal Envelope Interaction
 */
function setupWaxSealLetter() {
  const waxSeal = document.getElementById('wax-seal-btn');
  const letterWrapper = document.getElementById('digital-letter-wrapper');
  const openPrompt = document.getElementById('seal-open-prompt');

  if (waxSeal && letterWrapper) {
    waxSeal.addEventListener('click', () => {
      waxSeal.classList.add('seal-broken');
      letterWrapper.classList.add('is-unfolded');
      if (openPrompt) openPrompt.style.display = 'none';

      // Confetti & hearts burst from seal
      if (window.celebrationFX) {
        const rect = waxSeal.getBoundingClientRect();
        window.celebrationFX.launchFloatingHearts(15, rect.left + rect.width / 2, rect.top);
        window.celebrationFX.launchConfetti({ count: 80, x: rect.left + rect.width / 2, y: rect.top });
      }
    });
  }
}

/**
 * Render Memory Vault Secret Cards
 */
function renderMemoryVault(cards) {
  const container = document.getElementById('vault-grid');
  if (!container || !cards) return;

  container.innerHTML = '';
  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'vault-card scroll-reveal';
    card.dataset.id = cardData.id;

    card.innerHTML = `
      <div class="vault-card-inner">
        <!-- Front of card -->
        <div class="vault-card-face vault-card-front glass-panel">
          <div class="vault-card-topbar">
            <span class="vault-card-icon">🔐</span>
            <span class="vault-card-num">${cardData.number}</span>
          </div>
          <div class="vault-card-hint">${cardData.hint}</div>
          <h4 class="vault-card-front-title">${cardData.frontTitle}</h4>
          <div class="vault-card-tap-prompt">Tap to unlock memory ✨</div>
        </div>
        <!-- Back of card (Revealed) -->
        <div class="vault-card-face vault-card-back glass-panel">
          <div class="vault-card-topbar">
            <span class="vault-card-icon">✨</span>
            <span class="vault-card-tag">Billie & Billoute</span>
          </div>
          <h4 class="vault-card-revealed-title">${cardData.revealedTitle}</h4>
          <p class="vault-card-revealed-text">${cardData.revealedText}</p>
          <div class="vault-card-tap-back">Tap to flip back ↺</div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function setupMemoryVault() {
  document.addEventListener('click', (e) => {
    const vaultCard = e.target.closest('.vault-card');
    if (!vaultCard) return;

    vaultCard.classList.toggle('is-flipped');

    // Mini starlight sparks when unlocked
    if (vaultCard.classList.contains('is-flipped') && window.celebrationFX) {
      const rect = vaultCard.getBoundingClientRect();
      window.celebrationFX.launchConfetti({
        count: 25,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  });
}

/**
 * Render Scientific Analysis Stats
 */
function renderScientificStats(statsData) {
  setText('#stats-title', statsData.sectionTitle);
  setText('#stats-subtitle', statsData.subtitle);

  const container = document.getElementById('stats-grid');
  if (!container || !statsData.stats) return;

  container.innerHTML = '';
  statsData.stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-card glass-panel scroll-reveal';

    card.innerHTML = `
      <div class="stat-icon-spark">⚡</div>
      <div class="stat-value-box">
        <span class="stat-number ${stat.isText ? 'is-text-value' : 'is-counter-value'}" data-target="${stat.value}">${stat.value}</span>
        ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
      </div>
      <div class="stat-label">${stat.label}</div>
      <div class="stat-subtext">${stat.subtext}</div>
    `;

    container.appendChild(card);
  });
}

/**
 * Animate numbers when scrolled into view
 */
function setupStatsCounters() {
  let countersAnimated = false;
  const section = document.getElementById('chapter-stats');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateNumbers();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}

function animateNumbers() {
  const counters = document.querySelectorAll('.is-counter-value');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    if (isNaN(target)) return;

    let count = 0;
    const duration = 2200; // ms
    const stepTime = 25;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(count).toLocaleString();
      }
    }, stepTime);
  });
}

/**
 * Render Future Wishes
 */
function renderFutureWishes(wishes) {
  const container = document.getElementById('wishes-grid');
  if (!container || !wishes) return;

  container.innerHTML = '';
  wishes.forEach((w, idx) => {
    const card = document.createElement('div');
    card.className = 'wish-card glass-panel scroll-reveal';

    card.innerHTML = `
      <div class="wish-num-badge">0${idx + 1}</div>
      <h3 class="wish-title">${w.title}</h3>
      <p class="wish-text">"${w.wish}"</p>
      <div class="wish-starlight">✧ ✦ ✧</div>
    `;

    container.appendChild(card);
  });
}

/**
 * Render Floating Collage Photos
 */
function renderCollagePhotos(memories) {
  const container = document.getElementById('finale-collage-wrapper');
  if (!container || !memories) return;

  container.innerHTML = '';
  memories.slice(0, 6).forEach((mem, idx) => {
    const photo = document.createElement('div');
    photo.className = `collage-photo collage-pos-${idx + 1}`;
    photo.innerHTML = `<img src="${mem.image}" alt="${mem.title}" loading="lazy" />`;
    container.appendChild(photo);
  });
}

/**
 * Grand Finale Celebration Trigger
 */
function setupFinaleCelebration(cfg) {
  const celebrateBtn = document.getElementById('finale-celebrate-btn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      if (window.celebrationFX) {
        window.celebrationFX.grandFinaleCelebration();
      }

      // Small bounce on button
      celebrateBtn.classList.add('pulse-glow');
      setTimeout(() => celebrateBtn.classList.remove('pulse-glow'), 1200);
    });
  }

  // Also trigger fireworks when the finale title is reached
  const finaleSec = document.getElementById('chapter-finale');
  if (finaleSec) {
    let finaleTriggered = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !finaleTriggered) {
          finaleTriggered = true;
          if (window.celebrationFX) {
            window.celebrationFX.grandFinaleCelebration();
          }
        }
      });
    }, { threshold: 0.4 });

    obs.observe(finaleSec);
  }
}

/**
 * Secret Easter Egg Modal
 */
function setupEasterEgg(cfg) {
  const starPin = document.getElementById('easter-egg-trigger');
  const modal = document.getElementById('easter-egg-modal');
  const closeBtn = document.getElementById('easter-egg-close');

  setText('#easter-egg-title', cfg.easterEgg.modalTitle);
  setText('#easter-egg-msg', cfg.easterEgg.message);
  setText('#easter-egg-signoff', cfg.easterEgg.signoff);

  if (starPin && modal) {
    starPin.addEventListener('click', () => {
      modal.classList.add('is-open');
      if (window.celebrationFX) {
        window.celebrationFX.launchConfetti({ count: 90 });
        window.celebrationFX.launchFloatingHearts(12);
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  }
}

/**
 * Scroll reveal observer for chapters and cards
 */
function setupScrollAnimations() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/**
 * Custom Desktop Cursor & Glow
 */
function setupCustomCursor() {
  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'custom-cursor-follower';
  document.body.appendChild(cursorFollower);

  let mouseX = -100;
  let mouseY = -100;
  let followX = -100;
  let followY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  const updateFollower = () => {
    followX += (mouseX - followX) * 0.15;
    followY += (mouseY - followY) * 0.15;
    cursorFollower.style.transform = `translate3d(${followX}px, ${followY}px, 0)`;
    requestAnimationFrame(updateFollower);
  };
  updateFollower();

  // Hover state on interactive elements
  const hoverTargets = document.querySelectorAll('button, a, .polaroid-card, .vault-card, .wax-seal-button');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('is-hovered'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('is-hovered'));
  });
}
