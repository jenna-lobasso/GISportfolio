

// --- Windows menu bar ---
const menubar = document.getElementById('menubar');
const items = Array.from(menubar.querySelectorAll('.menubar-item.has-menu'));
const toast = document.getElementById('toast');
let openMenu = null;

function closeAll() {
  items.forEach(i => i.classList.remove('active'));
  openMenu = null;
}

function openItem(item) {
  closeAll();
  item.classList.add('active');
  openMenu = item;
}

items.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    if (openMenu === item) {
      closeAll();
    } else {
      openItem(item);
    }
  });

  item.addEventListener('mouseenter', () => {
    if (openMenu && openMenu !== item) {
      openItem(item);
    }
  });
});

document.addEventListener('click', closeAll);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

menubar.addEventListener('click', (e) => {
  const el = e.target.closest('.dropdown-item');
  if (!el || el.classList.contains('disabled')) return;
  const action = el.dataset.action;
  if (!action) return;

  if (action.startsWith('goto:')) {
    const target = action.split(':')[1];
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast('Section "#' + target + '" not found yet');
    }
  } else if (action === 'copyEmail') {
    navigator.clipboard.writeText('jenna@example.com').then(() => {
      showToast('Email copied to clipboard');
    });
  } else if (action === 'print') {
    window.print();
  } else if (action === 'fullscreen') {
    document.documentElement.requestFullscreen?.();
  } else if (action === 'toggleTheme') {
    document.body.classList.toggle('dark-mode');
    showToast('Theme toggled');
  } else if (action === 'minimize') {
    showToast('JennaOS does not support minimizing yourself');
  }

  closeAll();
});


// --- Fake "loading" bar for skills ---
(function loadSkills() {
  const fill = document.getElementById('progressFill');
  const percentEl = document.getElementById('loadingPercent');
  const textEl = document.getElementById('loadingText');
  const detailEl = document.getElementById('loadingDetail');
  const loadingBox = document.getElementById('skillsLoading');
  const grid = document.getElementById('skillsGrid');

  const totalKB = 1024;
  let percent = 0;

  const messages = [
    { at: 0,  text: 'Reading skill index...' },
    { at: 25, text: 'Indexing GIS modules...' },
    { at: 55, text: 'Compiling code libraries...' },
    { at: 80, text: 'Cross-referencing research data...' },
    { at: 97, text: 'Finalizing DATA_CABINET.sys...' },
  ];

  function tick() {
    // uneven "jumpy" increments, like a real fake installer
    percent += Math.random() < 0.15 ? 0 : Math.floor(Math.random() * 9) + 2;
    if (percent > 100) percent = 100;

    fill.style.width = percent + '%';
    percentEl.textContent = percent + '%';
    detailEl.textContent = `${Math.floor((percent / 100) * totalKB)} KB of ${totalKB} KB copied`;

    const msg = [...messages].reverse().find(m => percent >= m.at);
    if (msg) textEl.textContent = msg.text;

    if (percent < 100) {
      setTimeout(tick, Math.random() * 180 + 60);
    } else {
      setTimeout(() => {
        loadingBox.hidden = true;
        grid.hidden = false;
      }, 300);
    }
  }

  tick();
})();
