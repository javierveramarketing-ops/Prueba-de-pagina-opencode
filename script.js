/*
 * Capital Clara - prototipo de landing
 *
 * Para activar el enlace real de WhatsApp, reemplazá el valor por el número
 * internacional, sin espacios ni signos. Ejemplo: '5491100000000'.
 */
const WHATSAPP_NUMBER = '';

const planDetails = {
  inicial: {
    kicker: '01 / exploratory',
    title: 'Plan Inicial',
    description:
      'Un punto de partida para conocer el proceso con una alternativa simple de evaluar. La configuración final depende de la conversación y de la documentación vigente.',
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
    description:
      'Una alternativa para comparar más variables antes de decidir. Los detalles deben confirmarse antes de cualquier operación.',
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
    description:
      'Una conversación inicial para revisar objetivos, situación y preguntas. No implica una recomendación ni una decisión automática.',
    details: [
      ['Objetivo', 'Acompañamiento'],
      ['Monto mínimo', 'Según perfil'],
      ['Plazo', 'Según perfil'],
      ['Rendimiento', '5%–8% orientativo*'],
    ],
  },
};

const modalBackdrop = document.querySelector('#plan-modal');
const modalTitle = document.querySelector('#modal-title');
const modalKicker = document.querySelector('#modal-kicker');
const modalDescription = document.querySelector('#modal-description');
const modalList = document.querySelector('#modal-list');
const toast = document.querySelector('#toast');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const whatsappLabel = document.querySelector('#whatsapp-label');
let toastTimer;

function normalizeWhatsAppNumber(value) {
  return String(value || '').replace(/\D/g, '');
}

function createWhatsAppUrl(message = 'Hola, me gustaría conocer más información sobre las oportunidades de Capital Clara.') {
  const number = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  if (!number) return '';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

function setWhatsAppLinks() {
  const whatsappUrl = createWhatsAppUrl();
  const detailLink = document.querySelector('.contact-detail[href="#contact-form"]');
  if (detailLink) detailLink.dataset.whatsapp = 'true';

  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    if (whatsappUrl) {
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#contacto';
      link.removeAttribute('target');
      link.addEventListener('click', () => {
        if (link.closest('.modal')) closePlanModal();
        showToast('El número de WhatsApp estará disponible cuando se cargue el contacto oficial.');
      });
    }
  });

  if (whatsappLabel) {
    whatsappLabel.textContent = whatsappUrl ? 'Escribinos por WhatsApp' : 'Número pendiente de configuración';
  }
}

function openPlanModal(planKey) {
  const plan = planDetails[planKey];
  if (!plan || !modalBackdrop) return;

  modalKicker.textContent = plan.kicker;
  modalTitle.textContent = plan.title;
  modalDescription.textContent = plan.description;
  modalList.innerHTML = plan.details
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join('');

  const modalContact = modalBackdrop.querySelector('.modal-contact');
  if (modalContact) {
    const url = createWhatsAppUrl(`Hola, me gustaría recibir más información sobre el ${plan.title}.`);
    modalContact.href = url || '#contacto';
  }

  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  modalBackdrop.querySelector('.modal-close')?.focus();
}

function closePlanModal() {
  if (!modalBackdrop || modalBackdrop.hidden) return;
  modalBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
      mainNav.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!mainNav.classList.contains('is-open')) return;
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
      mainNav.classList.remove('is-open');
    }
  });
}

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

  modalBackdrop?.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) closePlanModal();
  });

  modalBackdrop?.querySelector('.modal-close')?.addEventListener('click', closePlanModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePlanModal();
  });
}

function setupContactForm() {
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const interest = String(formData.get('interest') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const fullMessage = [
      `Hola, soy ${name}.`,
      `Mi email es ${email}.`,
      `Quiero consultar sobre: ${interest}.`,
      message ? `Consulta: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = createWhatsAppUrl(fullMessage);
    if (whatsappUrl) {
      formStatus.textContent = 'Abriendo WhatsApp…';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const subject = encodeURIComponent('Consulta desde Capital Clara');
    const mailtoUrl = `mailto:contacto@capitalclara.com?subject=${subject}&body=${encodeURIComponent(fullMessage)}`;
    formStatus.textContent = 'El enlace de WhatsApp está pendiente; se abrirá tu correo para enviar la consulta.';
    window.location.href = mailtoUrl;
  });
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.approach-card, .plan-card, .learn-card, .faq-item');
  if (!('IntersectionObserver' in window)) return;

  revealItems.forEach((item) => item.classList.add('reveal-item'));
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

setWhatsAppLinks();
setupNavigation();
setupPlanCards();
setupContactForm();
setupRevealAnimations();
