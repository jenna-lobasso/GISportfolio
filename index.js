fetch("projects.json")
.then(response => response.json())
.then(projects => {
  const container = document.getElementById("project-container");
  projects.forEach(project => {
    let tags = project.tools.map(
      tool => `<span class="tag">${tool}</span>`
    ).join("");
    container.innerHTML += `
      <div class="project-card">
        <img src="${project.image}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div>${tags}</div>
        <a class="button" href="${project.link}">OPEN FILE</a>
      </div>
    `;
  });
});

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
