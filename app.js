/**
 * Roshani Enterprises — Luxury Real Estate & Bespoke Construction
 * Interactive Controller: Portfolio Filter, Carousel, Accessible Modal, Consultation Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioCarousel();
  initPortfolioFilter();
  initSpecificationsModal();
  initConsultationForm();
  initMobileNav();
});

// Property Specifications Data
const PROPERTY_DATA = [
  {
    name: 'The Obsidian Coastal Sanctuary',
    location: 'Alibaug Coastal Sanctuary, Maharashtra',
    area: '8,400 sq.ft (780 m²)',
    site: '1.85 Acres private compound',
    structure: 'Post-tensioned monolithic concrete & basalt stone',
    eco: 'IGBC Platinum Certified / Zero net carbon',
    handover: 'Immediate handover available',
    valuation: '₹32.5 Cr ($3,900,000 USD)'
  },
  {
    name: 'The Monolith Alpine Chalet',
    location: 'Manali Private Ridge, Himachal Pradesh',
    area: '10,200 sq.ft (948 m²)',
    site: '3.20 Acres pine sanctuary',
    structure: 'Seismic Grade-4 steel frame & hand-cut granite masonry',
    eco: 'Geothermal heating loop / Triple-glazed acoustic envelope',
    handover: 'Turnkey completed',
    valuation: '₹42.0 Cr ($5,040,000 USD)'
  },
  {
    name: 'The Azure Beachfront Pavilion',
    location: 'Goa North Shore, Arabian Sea',
    area: '11,800 sq.ft (1,096 m²)',
    site: '2.10 Acres direct ocean frontage',
    structure: 'Reinforced marine-grade concrete & seasoned teak pavilion',
    eco: 'Integrated solar slate & micro-desalination water loop',
    handover: 'Bespoke commission / Q3 2027',
    valuation: '₹58.0 Cr ($6,960,000 USD)'
  }
];

/**
 * 1. Portfolio Carousel Controller
 */
function initPortfolioCarousel() {
  const cards = document.querySelectorAll('.portfolio-section .property-card');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dots .carousel-pip');

  if (!cards.length) return;

  let activeIndex = 1; // Center card default

  function updateActiveCard(index) {
    activeIndex = (index + cards.length) % cards.length;

    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add('active-focus');
        card.setAttribute('aria-current', 'true');
      } else {
        card.classList.remove('active-focus');
        card.removeAttribute('aria-current');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateActiveCard(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateActiveCard(activeIndex + 1);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateActiveCard(idx);
    });
  });

  // Card click activates focus
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // If clicking inside the view-specs button, let modal handler trigger
      if (e.target.closest('.view-specs-btn')) return;
      updateActiveCard(idx);
    });
  });
}

/**
 * 2. Portfolio Category Filter
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-bar .category-tab');
  const cards = document.querySelectorAll('.portfolio-section .property-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. Accessible Property Specifications Modal
 */
function initSpecificationsModal() {
  const modal = document.getElementById('property-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  const inquireBtn = document.getElementById('modal-inquire-btn');
  const specBtns = document.querySelectorAll('.view-specs-btn');

  if (!modal) return;

  function openModal(propIndex) {
    const data = PROPERTY_DATA[propIndex] || PROPERTY_DATA[0];
    document.getElementById('spec-name').textContent = data.name;
    document.getElementById('spec-location').textContent = data.location;
    document.getElementById('spec-area').textContent = data.area;
    document.getElementById('spec-site').textContent = data.site;
    document.getElementById('spec-structure').textContent = data.structure;
    document.getElementById('spec-eco').textContent = data.eco;
    document.getElementById('spec-handover').textContent = data.handover;
    document.getElementById('spec-valuation').textContent = data.valuation;

    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  specBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id || '0', 10);
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * 4. Interactive Consultation Form
 */
function initConsultationForm() {
  const form = document.getElementById('consultation-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('consult-submit-btn');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('consult-name');
    const phone = document.getElementById('consult-phone');
    const email = document.getElementById('consult-email');

    if (!name.value.trim() || !phone.value.trim() || !email.value.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';
    }

    setTimeout(() => {
      feedback.style.display = 'block';
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Request received</span>';
      }
    }, 600);
  });
}

/**
 * 5. Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu-pills');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
      navMenu.style.display = 'flex';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = 'var(--space-4)';
      navMenu.style.right = 'var(--space-4)';
      navMenu.style.flexDirection = 'column';
      navMenu.style.backgroundColor = 'var(--color-ink)';
      navMenu.style.padding = 'var(--space-4)';
      navMenu.style.borderRadius = 'var(--radius-card)';
      navMenu.style.zIndex = '50';
    } else {
      navMenu.style.display = '';
    }
  });
}
