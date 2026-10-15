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

async function apiGetInversiones() {
  const res = await fetch(`${API_URL}/api/user/inversiones`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiCreateInversion(monto, plan, descripcion) {
  const res = await fetch(`${API_URL}/api/user/inversiones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
    body: JSON.stringify({ monto, plan, descripcion }),
  });
  return res.json();
}

async function apiGetNotificaciones() {
  const res = await fetch(`${API_URL}/api/user/notificaciones`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiMarkNotificacionLeida(id) {
  const res = await fetch(`${API_URL}/api/user/notificaciones/${id}/leer`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiMarkAllNotificacionesLeidas() {
  const res = await fetch(`${API_URL}/api/user/notificaciones/leer-todas`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return res.json();
}

async function apiGetDashboard() {
  const res = await fetch(`${API_URL}/api/user/dashboard`, {
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

  // Mostrar secciones de usuario
  const dashboardSection = document.querySelector('#dashboard-section');
  const investmentsSection = document.querySelector('#investments-section');
  const notificationsSection = document.querySelector('#notifications-section');
  if (dashboardSection) dashboardSection.hidden = false;
  if (investmentsSection) investmentsSection.hidden = false;
  if (notificationsSection) notificationsSection.hidden = false;

  // Cargar datos
  loadDashboard();
  loadUserBenefits();
  loadInvestments();
  loadNotifications();
}

function updateUIForLoggedOutUser() {
  const userMenu = document.querySelector('#user-menu');
  if (userMenu) {
    userMenu.innerHTML = `
      <button class="btn btn--primary btn--small" onclick="openLoginModal()">Ingresar</button>
    `;
    userMenu.classList.add('is-visible');
  }

  // Ocultar secciones de usuario
  ['dashboard-section', 'benefits-section', 'investments-section', 'notifications-section'].forEach(id => {
    const el = document.querySelector(`#${id}`);
    if (el) {
      el.hidden = true;
      el.classList.remove('is-visible');
    }
  });
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
// DASHBOARD
// ============================================

let chartEvolucion = null;
let chartPlanes = null;

async function loadDashboard() {
  try {
    const res = await apiGetDashboard();
    if (!res.success) return;

    // Stats
    const totalEl = document.querySelector('#dash-total');
    const cantEl = document.querySelector('#dash-cantidad');
    const nivelEl = document.querySelector('#dash-nivel');
    const descEl = document.querySelector('#dash-descuento');

    if (totalEl) totalEl.textContent = `$${res.totalInvertido.toLocaleString()}`;
    if (cantEl) cantEl.textContent = res.cantidadInversiones;
    if (nivelEl) nivelEl.textContent = res.nivelActual;
    if (descEl) descEl.textContent = `${res.descuentoNivel}%`;

    // Gráfico de evolución
    renderEvolucionChart(res.evolucion);

    // Progreso de nivel
    renderNivelProgress(res);

    // Progreso de promoción
    renderPromoProgress(res);

    // Gráfico de planes
    renderPlanesChart(res.porPlan);
  } catch (error) {
    console.error('Error cargando dashboard:', error);
  }
}

function renderEvolucionChart(evolucion) {
  const ctx = document.querySelector('#dash-chart-evolucion');
  if (!ctx) return;

  if (chartEvolucion) chartEvolucion.destroy();

  const labels = evolucion.map((e) => e.fecha);
  const data = evolucion.map((e) => e.acumulado);

  chartEvolucion = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total acumulado',
          data,
          borderColor: '#d4ae68',
          backgroundColor: 'rgba(212, 174, 104, 0.15)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#d4ae68',
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `$${item.raw.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${(value / 1000).toFixed(0)}k`,
          },
        },
      },
    },
  });
}

function renderNivelProgress(res) {
  const bar = document.querySelector('#dash-nivel-bar');
  const actual = document.querySelector('#dash-nivel-actual');
  const siguiente = document.querySelector('#dash-nivel-siguiente');

  if (bar) bar.style.width = `${res.progresoNivel}%`;
  if (actual) actual.textContent = `${res.nivelActual} (${res.descuentoNivel}%)`;

  if (siguiente) {
    if (res.proximoNivel) {
      siguiente.textContent = `${res.proximoNivel.nombre} (${res.proximoNivel.descuento}%) — $${res.proximoNivel.umbral.toLocaleString()}`;
    } else {
      siguiente.textContent = '¡Nivel máximo alcanzado!';
    }
  }
}

function renderPromoProgress(res) {
  const card = document.querySelector('#dash-promo-card');
  const next = document.querySelector('#dash-promo-next');
  const bar = document.querySelector('#dash-promo-bar');

  if (!res.siguientePromocion) {
    if (card) card.innerHTML = '<h3>¡Felicidades!</h3><p class="empty-state">Desbloqueaste todas las promociones disponibles.</p>';
    return;
  }

  if (next) {
    next.innerHTML = `
      <div class="promo-next-info">
        <strong>${res.siguientePromocion.titulo}</strong>
        <span>Faltan $${(res.siguientePromocion.umbral - res.totalInvertido).toLocaleString()} para desbloquearla</span>
      </div>
    `;
  }

  if (bar) bar.style.width = `${res.progresoSiguientePromo}%`;
}

function renderPlanesChart(porPlan) {
  const ctx = document.querySelector('#dash-chart-planes');
  if (!ctx) return;

  if (chartPlanes) chartPlanes.destroy();

  const planes = Object.entries(porPlan).filter(([, v]) => v > 0);

  chartPlanes = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: planes.map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)),
      datasets: [
        {
          data: planes.map(([, v]) => v),
          backgroundColor: ['#123b35', '#d4ae68', '#7ba69e'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (item) => `$${item.raw.toLocaleString()}`,
          },
        },
      },
    },
  });
}

// ============================================
// INVERSIONES
// ============================================

async function loadInvestments() {
  try {
    const res = await apiGetInversiones();
    if (!res.success) return;

    const summaryEl = document.querySelector('#investments-summary');
    const listEl = document.querySelector('#investments-list');
    if (!summaryEl || !listEl) return;

    // Resumen
    summaryEl.innerHTML = `
      <div class="summary-card">
        <span class="summary-label">Total invertido</span>
        <span class="summary-value">$${res.totalInvertido.toLocaleString()}</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Descuento actual</span>
        <span class="summary-value">${res.descuentoAplicable}%</span>
      </div>
      <div class="summary-card">
        <span class="summary-label">Promociones desbloqueadas</span>
        <span class="summary-value">${res.promocionesDesbloqueadas.length}</span>
      </div>
    `;

    // Lista
    if (res.inversiones.length === 0) {
      listEl.innerHTML = '<p class="empty-state">Todavía no cargaste inversiones.</p>';
      return;
    }

    listEl.innerHTML = res.inversiones.map(inv => `
      <div class="investment-item">
        <div class="investment-info">
          <strong>$${inv.monto.toLocaleString()}</strong>
          <span class="investment-plan">${inv.plan}</span>
          ${inv.descripcion ? `<span class="investment-desc">${inv.descripcion}</span>` : ''}
        </div>
        <div class="investment-meta">
          <span>${inv.fecha}</span>
          <span class="badge badge--${inv.estado}">${inv.estado}</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error cargando inversiones:', error);
  }
}

async function handleInvestment(event) {
  event.preventDefault();
  const monto = Number(document.querySelector('#inv-monto').value);
  const plan = document.querySelector('#inv-plan').value;
  const descripcion = document.querySelector('#inv-descripcion').value;

  if (!monto || monto <= 0) {
    showToast('Ingresá un monto válido', 'error');
    return;
  }

  try {
    const res = await apiCreateInversion(monto, plan, descripcion);

    if (res.success) {
      showToast('¡Inversión registrada!', 'success');
      document.querySelector('#investment-form').reset();
      loadInvestments();
      loadNotifications();

      if (res.promoAlcanzada) {
        showToast(`¡Felicidades! Desbloqueaste: ${res.promoAlcanzada.titulo}`, 'success');
      }
    } else {
      showToast(res.error || 'Error al registrar', 'error');
    }
  } catch (error) {
    console.error('Error creando inversión:', error);
    showToast('Error de conexión', 'error');
  }
}

// ============================================
// NOTIFICACIONES
// ============================================

async function loadNotifications() {
  try {
    const res = await apiGetNotificaciones();
    if (!res.success) return;

    const listEl = document.querySelector('#notifications-list');
    if (!listEl) return;

    if (res.notificaciones.length === 0) {
      listEl.innerHTML = '<p class="empty-state">No tenés notificaciones todavía.</p>';
      return;
    }

    listEl.innerHTML = res.notificaciones.map(notif => `
      <div class="notification-item ${notif.leida ? '' : 'notification-item--unread'}" onclick="markNotifRead('${notif.id}')">
        <div class="notification-icon notification-icon--${notif.prioridad}">
          ${notif.tipo === 'promocion' ? '🎉' : notif.tipo === 'inversion' ? '💰' : '🔔'}
        </div>
        <div class="notification-content">
          <strong>${notif.titulo}</strong>
          <p>${notif.mensaje}</p>
          <span class="notification-date">${new Date(notif.fecha).toLocaleDateString('es-AR')}</span>
        </div>
        ${!notif.leida ? '<span class="notification-dot"></span>' : ''}
      </div>
    `).join('');
  } catch (error) {
    console.error('Error cargando notificaciones:', error);
  }
}

async function markNotifRead(id) {
  try {
    await apiMarkNotificacionLeida(id);
    loadNotifications();
  } catch (error) {
    console.error('Error marcando notificación:', error);
  }
}

async function markAllNotifsRead() {
  try {
    await apiMarkAllNotificacionesLeidas();
    loadNotifications();
  } catch (error) {
    console.error('Error marcando notificaciones:', error);
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

  // Cerrar modal con el botón X
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', closePlanModal);
  });

  // Cerrar modal al hacer click fuera del contenido
  const planBackdrop = document.querySelector('#plan-modal');
  if (planBackdrop) {
    planBackdrop.addEventListener('click', (event) => {
      if (event.target === planBackdrop) closePlanModal();
    });
  }

  // Cerrar con Escape
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
window.handleInvestment = handleInvestment;
window.markNotifRead = markNotifRead;
window.markAllNotifsRead = markAllNotifsRead;

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
