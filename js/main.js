document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.l-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // Intersection Observer for fade-up animations
  const fadeElements = document.querySelectorAll('.js-fade-up');
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Smooth scroll
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.l-header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Tab
  const tabs = document.querySelectorAll('.js-tab-trigger');
  const tabContents = document.querySelectorAll('.js-tab-content');

  if (tabs.length > 0 && tabContents.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Remove active class
        tabs.forEach(t => t.classList.remove('is-active'));
        tabContents.forEach(c => c.classList.remove('is-active'));

        // Add active class
        tab.classList.add('is-active');
        document.getElementById(target)?.classList.add('is-active');
      });
    });
  }

  // Swiper Init (Case Studies)
  const caseSlider = document.querySelector('.p-case__slider');
  if (caseSlider) {
    new Swiper('.p-case__slider', {
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  // Swiper Init (Voice)
  const voiceSlider = document.querySelector('.p-voice__slider');
  if (voiceSlider) {
    new Swiper('.p-voice__slider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      spaceBetween: 30,
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  // Accordion
  const accordions = document.querySelectorAll('.js-accordion-trigger');
  if (accordions.length > 0) {
    accordions.forEach(acc => {
      acc.addEventListener('click', () => {
        const parent = acc.closest('.js-accordion');
        const content = parent.querySelector('.js-accordion-content');

        parent.classList.toggle('is-open');

        if (parent.classList.contains('is-open')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }
});
