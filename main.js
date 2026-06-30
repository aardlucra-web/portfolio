// main.js
// reads from data.js and builds the whole page
// also handles dragging, dark mode, and show/hide

// =====================
// ICONS
// svg strings for social buttons
// add a new key here if you add one in data.js
// =====================
const icons = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
    -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
    .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
    -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
    1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
    1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
    1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>`,
  // paste more svg icons here for linkedin, etc
};

// =====================
// DARK MODE
// check localStorage — if user turned it on before, apply it now
// =====================
function initDarkMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  // save it so it sticks on next visit
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// =====================
// BUILD FUNCTIONS
// each one reads from siteData (data.js) and fills in the html
// =====================

function buildHero() {
  const h = siteData.hero;
  document.getElementById('hero-name').textContent = h.name;
  document.getElementById('hero-subtitle').textContent = h.subtitle;

  const av = document.getElementById('hero-avatar');
  // swap this out for an <img> if you get a real photo
  if (h.avatar) {
    av.innerHTML = `<img src="${h.avatar}" alt="photo of Adrianne">`;
  } else {
    av.textContent = h.avatarEmoji;
  }
}

function buildAbout() {
  const a = siteData.about;
  document.getElementById('about-name').textContent = a.fullName;
  document.getElementById('about-meta').textContent = `${a.location} · ${a.school}`;
  document.getElementById('about-bio').textContent = a.bio;

  // build interest tags — every 3rd one gets the green style
  document.getElementById('about-tags').innerHTML = a.interests
    .map((x, i) => `<span class="tag${i % 3 === 2 ? ' green' : ''}">${x}</span>`)
    .join('');
}

function buildSkills() {
  const s = siteData.skills;

  // hard skills = bars
  document.getElementById('skills-hard').innerHTML = s.hard.map(skill => `
    <div class="skill-item">
      <span class="skill-name">${skill.name}</span>
      <div class="skill-bar-bg">
        <div class="skill-bar" style="width:${skill.value}%"></div>
      </div>
    </div>
  `).join('');

  // soft skills = tags
  document.getElementById('skills-soft').innerHTML = s.soft
    .map(x => `<span class="tag">${x}</span>`)
    .join('');
}

function buildProjects() {
  document.getElementById('projects-list').innerHTML = siteData.projects.map(p => `
    <div class="project-card">
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" target="_blank" rel="noopener" class="project-link">↗ ${p.linkLabel}</a>
    </div>
  `).join('');
}

function buildContact() {
  const c = siteData.contact;
  const el = document.getElementById('contact-email');
  el.textContent = c.email;
  el.href = `mailto:${c.email}`;

  document.getElementById('contact-socials').innerHTML = c.socials
    .map(s => `
      <a href="${s.url}" target="_blank" rel="noopener" class="social-btn">
        ${icons[s.icon] || '↗'}
        ${s.label}
      </a>
    `).join('');
}

// =====================
// DRAG
// click the titlebar and drag to move the panel around
// =====================
function makeDraggable(panel) {
  const header = panel.querySelector('.panel-header');
  if (!header) return;

  let dragging = false;
  let startX, startY, startLeft, startTop;

  header.addEventListener('mousedown', e => {
    // don't drag if clicking the × or traffic lights
    if (e.target.classList.contains('wm-btn')) return;
    if (e.target.classList.contains('panel-close-btn')) return;

    dragging  = true;
    startX    = e.clientX;
    startY    = e.clientY;
    startLeft = panel.offsetLeft;
    startTop  = panel.offsetTop;
    bringToFront(panel);
    e.preventDefault(); // stops text from getting selected while dragging
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;

    let l = startLeft + (e.clientX - startX);
    let t = startTop  + (e.clientY - startY);

    // clamp so it can't go off screen
    const d = document.getElementById('desktop');
    l = Math.max(0, Math.min(l, d.offsetWidth  - panel.offsetWidth));
    t = Math.max(0, Math.min(t, d.offsetHeight - panel.offsetHeight));

    panel.style.left = l + 'px';
    panel.style.top  = t + 'px';

    // remember the user moved it so resize doesn't snap it back
    panel.dataset.userMoved = 'true';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

// =====================
// Z-INDEX
// clicked panel comes to front
// just increment a counter, easy
// =====================
let z = 100;
function bringToFront(panel) {
  z++;
  panel.style.zIndex = z;
}

// =====================
// SPAWN POSITIONS
// where each panel appears when first opened
// offsets from the centre of the desktop
// negative x = left, negative y = up
// tweak these if layout looks weird on your screen
// =====================
const spawnOffsets = {
  about:    { x: -420, y: -150 },
  skills:   { x:  80,  y: -160 },
  projects: { x: -440, y:  80  },
  contact:  { x:  80,  y:  120 },
};

function positionPanel(name) {
  const panel  = document.getElementById(`panel-${name}`);
  const d      = document.getElementById('desktop');
  const offset = spawnOffsets[name];
  if (!panel || !offset) return;

  // centre of desktop + offset
  let l = (d.offsetWidth  / 2) + offset.x;
  let t = (d.offsetHeight / 2) + offset.y;

  // clamp so it can't go off screen
  l = Math.max(10, Math.min(l, d.offsetWidth  - panel.offsetWidth  - 10));
  t = Math.max(10, Math.min(t, d.offsetHeight - panel.offsetHeight - 10));

  panel.style.left = l + 'px';
  panel.style.top  = t + 'px';
}

// =====================
// SHOW / HIDE PANELS
// =====================
function showPanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  const btn   = document.querySelector(`.taskbar-btn[data-panel="${name}"]`);
  if (!panel) return;

  panel.classList.add('is-visible');

  // only position it if we haven't placed it yet (first time opening)
  if (!panel.dataset.positioned) {
    positionPanel(name);
    panel.dataset.positioned = 'true';
  }

  bringToFront(panel);
  if (btn) btn.classList.remove('is-hidden');
}

function hidePanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  const btn   = document.querySelector(`.taskbar-btn[data-panel="${name}"]`);
  if (!panel) return;

  panel.classList.remove('is-visible');
  if (btn) btn.classList.add('is-hidden');
}

function togglePanel(name) {
  const panel = document.getElementById(`panel-${name}`);
  if (!panel) return;
  panel.classList.contains('is-visible') ? hidePanel(name) : showPanel(name);
}

// =====================
// INIT
// runs when page is fully loaded
// =====================
document.addEventListener('DOMContentLoaded', () => {

  // dark mode first — avoids flash
  initDarkMode();

  // build all content from data.js
  buildHero();
  buildAbout();
  buildSkills();
  buildProjects();
  buildContact();

  // make panels draggable + bring to front on click
  document.querySelectorAll('.panel').forEach(panel => {
    makeDraggable(panel);
    panel.addEventListener('mousedown', () => bringToFront(panel));
  });

  // open all panels on load
  ['about', 'skills', 'projects', 'contact'].forEach(showPanel);

  // taskbar buttons
  document.querySelectorAll('.taskbar-btn[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => togglePanel(btn.dataset.panel));
  });

  // hero card buttons
  document.querySelectorAll('.hero-link-btn[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => togglePanel(btn.dataset.panel));
  });

  // × close buttons
  document.querySelectorAll('.panel-close-btn').forEach(btn => {
    btn.addEventListener('click', () => hidePanel(btn.dataset.close));
  });

  // dark mode toggle
  document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);

  // on resize, reposition panels that haven't been manually dragged
  window.addEventListener('resize', () => {
    ['about', 'skills', 'projects', 'contact'].forEach(name => {
      const p = document.getElementById(`panel-${name}`);
      if (p && !p.dataset.userMoved && p.classList.contains('is-visible')) {
        positionPanel(name);
      }
    });
  });

});
