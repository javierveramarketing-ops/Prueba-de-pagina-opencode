/*
 * Capital Clara - Frontend con API Backend
 * Login mockup de 2 usuarios + descuentos/cupones/promociones
 */

const API_URL = window.location.origin;

// ============================================
// ESTADO DE AUTENTICACIÓN
// ============================================

let currentUser = null;
let authToken = localStorage.getItem('capital_clara_token');

// ============================================
// API CALLS
// ============================================

async function apiLogin(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function apiGetProfile() {
  const res = await fetch(`${API_URL}/api/user/profile`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiGetDescuentos() {
  const res = await fetch(`${API_URL}/api/user/descuentos`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiGetCupones() {
  const res = await fetch(`${API_URL}/api/user/cupones`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiGetPromociones() {
  const res = await fetch(`${API_URL}/api/user/promociones`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

// ============================================
// UI FUNCTIONS
// ============================================

function showToast(message, type = 'info') {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast is-visible toast--${type}`;
  setTimeout(() => toast.classList.remove('is-visible'), 4000);
}

function updateUIForLoggedInUser(user) {
  // Mostrar nombre en el header
  const userMenu = document.querySelector('#user-menu');
  if (userMenu) {
    userMenu.innerHTML = `
      <span class="user-name">${user.nombre}</span>
      <button class="btn btn--small" onclick="logout()">Salir</button>
    `;
    userMenu.classList.add('is-visible');
  }

  // Mostrar sección de beneficios
  loadUserBenefits();
}

function updateUIForLoggedOutUser() {
  const userMenu = document.querySelector('#user-menu');
  if (userMenu) {
    userMenu.innerHTML = `
      <button class="btn btn--primary btn--small" onclick="openLoginModal()">Ingresar</button>
    `;
    userMenu.classList.add('is-visible');
  }

  // Ocultar sección de beneficios
  const benefitsSection = document.querySelector('#benefits-section');
  if (benefitsSection) {
    benefitsSection.classList.remove('is-visible');
  }
}

async function loadUserBenefits() {
  try {
    const [descuentosRes, cuponesRes, promocionesRes] = await Promise.all([
      apiGetDescuentos(),
      apiGetCupones(),
      apiGetPromociones(),
    ]);

    const benefitsSection = document.querySelector('#benefits-section');
    if (!benefitsSection) return;

    let html = '<div class="benefits-grid">';

    // Descuentos
    if (descuentosRes.success) {
      html += `
        <div class="benefit-card">
          <h4>Tu Descuento</h4>
          <p class="benefit-highlight">${descuentosRes.descuentoUsuario}%</p>
          <p>Nivel: ${descuentosRes.nivel}</p>
        </div>
      `;
    }

    // Cupones
    if (cuponesRes.success && cuponesRes.cupones.length > 0) {
      html += '<div class="benefit-card"><h4>Cupones Disponibles</h4>';
      cuponesRes.cupones.forEach(cupon => {
        html += `
          <div class="coupon">
            <code>${cupon.codigo}</code>
            <p>${cupon.descripcion}</p>
          </div>
        `;
      });
      html += '</div>';
    }

    // Promociones
    if (promocionesRes.success && promocionesRes.promociones.length > 0) {
      html += '<div class="benefit-card"><h4>Promociones Activas</h4>';
      promocionesRes.promociones.forEach(promo => {
        html += `
          <div class="promo">
            <h5>${promo.titulo}</h5>
            <p>${promo.descripcion}</p>
          </div>
        `;
      });
      html += '</div>';
    }

    html += '</div>';
    benefitsSection.innerHTML = html;
    benefitsSection.classList.add('is-visible');
  } catch (error) {
    console.error('Error cargando beneficios:', error);
  }
}

// ============================================
// AUTH FUNCTIONS
// ============================================

async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    showToast('Completá todos los campos', 'error');
    return;
  }

  try {
    const result = await apiLogin(email, password);

    if (result.success) {
      authToken = result.token;
      currentUser = result.usuario;
      localStorage.setItem('capital_clara_token', authToken);
      localStorage.setItem('capital_clara_user', JSON.stringify(currentUser));

      closeLoginModal();
      updateUIForLoggedInUser(currentUser);
      showToast(`¡Bienvenido, ${currentUser.nombre}!`, 'success');
    } else {
      showToast(result.error || 'Credenciales incorrectas', 'error');
    }
  } catch (error) {
    console.error('Error en login:', error);
    showToast('Error de conexión', 'error');
  }
}

function logout() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('capital_clara_token');
  localStorage.removeItem('capital_clara_user');
  updateUIForLoggedOutUser();
  showToast('Sesión cerrada', 'info');
}

function openLoginModal() {
  const modal = document.querySelector('#login-modal');
  if (modal) {
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }
}

function closeLoginModal() {
  const modal = document.querySelector('#login-modal');
  if (modal) {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }
}

// ============================================
// PLAN MODALS (código original)
// ============================================

const planDetails = {
  inicial: {
    kicker: '01 / exploratory',
    title: 'Plan Inicial',
    description: 'Un punto de partida para conocer el proceso con una alternativa simple de evaluar.',
    details: [
      ['Objetivo', 'Conocer el proceso'],
      ['Monto mínimo', 'A definir'],
      ['Plazo', 'A definir'],
      ['Rendimiento', '5%–8% orientativo*'],
    ],
  },
  intermedio: {
    kicker: '02 / balanced',
    title: 'Plan Intermedio',
    description: 'Una alternativa para comparar más variables antes de decidir.',
    details: [
      ['Objetivo', 'Comparar alternativas'],
      ['Monto mínimo', 'A definir'],
      ['Plazo', 'A definir'],
      ['Rendimiento', '5%–8% orientativo*'],
    ],
  },
  personalizado: {
    kicker: '03 / personal',
    title: 'Plan Personalizado',
    description: 'Una conversación inicial para revisar objetivos, situación y preguntas.',
    details: [
      ['Objetivo', 'Acompañamiento'],
      ['Monto mínimo', 'Según perfil'],
      ['Plazo', 'Según perfil'],
      ['Rendimiento', '5%–8% orientativo*'],
    ],
  },
};

function openPlanModal(planKey) {
  const plan = planDetails[planKey];
  if (!plan) return;

  const modalBackdrop = document.querySelector('#plan-modal');
  if (!modalBackdrop) return;

  document.querySelector('#modal-kicker').textContent = plan.kicker;
  document.querySelector('#modal-title').textContent = plan.title;
  document.querySelector('#modal-description').textContent = plan.description;
  document.querySelector('#modal-list').innerHTML = plan.details
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join('');

  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
}

function closePlanModal() {
  const modalBackdrop = document.querySelector('#plan-modal');
  if (!modalBackdrop || modalBackdrop.hidden) return;
  modalBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

// ============================================
// NAVIGATION (código original)
// ============================================

function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('is-open', !isOpen);
  });
}

// ============================================
// PLAN CARDS (código original)
// ============================================

function setupPlanCards() {
  document.querySelectorAll('.plan-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      openPlanModal(card.dataset.plan);
    });
  });

  document.querySelectorAll('.plan-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      openPlanModal(button.closest('.plan-card')?.dataset.plan);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePlanModal();
  });
}

// ============================================
// REVEAL ANIMATIONS (código original)
// ============================================

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.approach-card, .plan-card, .learn-card, .faq-item');
  if (!('IntersectionObserver' in window)) return;

  revealItems.forEach((item) => item.classList.add('reveal-item'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// ============================================
// INIT
// ============================================

async function init() {
  // Verificar si hay sesión guardada
  if (authToken) {
    try {
      const profileRes = await apiGetProfile();
      if (profileRes.success) {
        currentUser = profileRes.usuario;
        updateUIForLoggedInUser(currentUser);
      } else {
        // Token inválido, limpiar
        logout();
      }
    } catch (error) {
      console.error('Error verificando sesión:', error);
      logout();
    }
  } else {
    updateUIForLoggedOutUser();
  }

  setupNavigation();
  setupPlanCards();
  setupRevealAnimations();
}

// Exponer funciones globalmente
window.handleLogin = handleLogin;
window.logout = logout;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.closePlanModal = closePlanModal;

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
