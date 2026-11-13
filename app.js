// Initialize Lucide Icons
if (window.lucide) {
  lucide.createIcons();
}

// ── Mobile Fullscreen Overlay Menu ──────────────────────────────────────────
const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu     = document.getElementById('mobileMenu');

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('translate-x-full', 'invisible', 'opacity-0');
  mobileMenu.classList.add('translate-x-0', 'visible', 'opacity-100');
  document.body.style.overflow = 'hidden'; // lock background scroll
  if (window.lucide) lucide.createIcons();
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('translate-x-full', 'invisible', 'opacity-0');
  mobileMenu.classList.remove('translate-x-0', 'visible', 'opacity-100');
  document.body.style.overflow = ''; // restore scroll
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close on nav link click
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  // Close on backdrop click (outside the panel)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// Contact & Quote Form Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const form = document.getElementById('contactForm');
  
  if (!submitBtn || !form) return;

  // Visual feedback
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Transmitting Request...</span>
  `;

  // Send data to Netlify Forms via AJAX if hosted on Netlify
  const formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  }).catch(() => {});

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <i data-lucide="send" class="w-4 h-4 text-amber-400"></i>
      <span>Send Service Request</span>
    `;
    if (window.lucide) lucide.createIcons();
    if (formSuccessMessage) {
      formSuccessMessage.classList.remove('hidden');
      formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 700);
}

window.handleFormSubmit = handleFormSubmit;
