/* =========================================================
   SUPERANNUATION HALL - MAIN SCRIPT
   Handles: Sidebar toggle, navigation, smooth scroll,
            active link tracking, and Firebase placeholder
   ========================================================= */

// ===== SIDEBAR TOGGLE (Mobile) =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

// Create overlay element dynamically
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

overlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav link is tapped (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeSidebar();
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== DYNAMIC PAGE TITLE =====
const pageTitle = document.querySelector('.page-title');

function updatePageTitle() {
  let current = 'Home';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (link) {
        current = link.textContent.trim();
      }
    }
  });

  if (pageTitle) pageTitle.textContent = current;
}

window.addEventListener('scroll', updatePageTitle);

// ===== COMPLAINT FORM (Temporary Handler) =====
const complaintForm = document.querySelector('#complaints form');
if (complaintForm) {
  complaintForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Complaint submitted!\n\n(Note: This will connect to Firebase in the next step.)');
    complaintForm.reset();
  });
}

// ===== PLACEHOLDER FOR FIREBASE =====
// We'll activate this in the next step after setting up Firebase.
console.log('%c🏛️ Superannuation Hall', 'color:#1e5fa8;font-weight:bold;font-size:16px;');
console.log('%cWebsite loaded. Ready for Firebase.', 'color:#ffcc00;font-weight:bold;');

// ===== INIT =====
window.addEventListener('load', () => {
  updateActiveLink();
  updatePageTitle();
});
