(function () {
  "use strict";


  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".tab-link");
    const serviceTitle = document.getElementById("service-title");
    const serviceDescription = document.getElementById("service-description");
    const serviceHeading = document.getElementById("service-heading");
    const serviceContent = document.getElementById("service-content");
    const serviceImage = document.getElementById("service-image");

    const services = {
      web: {
        title: "Pourquoi choisir la Création de Web ?",
        description: "La création d'un site web est essentielle pour toute entreprise souhaitant établir une présence en ligne forte. Nous concevons des sites web modernes, réactifs et optimisés pour les moteurs de recherche, afin de maximiser votre visibilité et votre crédibilité.",
        heading: "Création de Sites Web sur Mesure",
        content: `
        <p>
          Nous offrons des solutions web personnalisées pour répondre aux besoins spécifiques de votre entreprise.
          Que vous ayez besoin d'un site vitrine, d'une boutique en ligne ou d'une plateforme complexe, notre équipe
          est là pour vous accompagner à chaque étape.
        </p>
        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Sites web modernes et réactifs.</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Optimisation pour les moteurs de recherche (SEO).</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Intégration de fonctionnalités avancées (e-commerce, blogs, etc.).</span></li>
        </ul>
        <p>
          Notre approche consiste à comprendre vos objectifs commerciaux et à traduire vos idées en un site web
          fonctionnel et esthétique. Nous utilisons les dernières technologies pour garantir une expérience
          utilisateur optimale.
        </p>
        <p>
          En plus de la création, nous proposons des services de maintenance et de mise à jour pour assurer que
          votre site reste performant et sécurisé. Nous croyons en une relation à long terme avec nos clients, en
          les accompagnant dans leur croissance numérique.
        </p>`
      },
      marketing: {
        title: "Pourquoi choisir le Marketing Digital ?",
        description: "Le marketing digital permet aux entreprises de toucher une audience plus large et d’optimiser leur communication. Nous vous aidons à développer des stratégies digitales efficaces pour accroître votre visibilité, générer des leads qualifiés et maximiser votre retour sur investissement.",
        heading: "Boostez votre Visibilité grâce au Marketing Digital",
        content: `
          <p>
            Nous proposons des stratégies de marketing digital adaptées à votre activité. Que ce soit pour augmenter votre présence sur les réseaux sociaux, optimiser votre référencement (SEO), ou lancer des campagnes publicitaires ciblées, nous avons les compétences pour vous aider à réussir.
          </p>
          <ul>
            <li><i class="bi bi-check-circle"></i> <span>Stratégies de contenu et gestion des réseaux sociaux.</span></li>
            <li><i class="bi bi-check-circle"></i> <span>Campagnes publicitaires sur Google Ads, Facebook Ads, etc.</span></li>
            <li><i class="bi bi-check-circle"></i> <span>Analyse des données et optimisation des performances.</span></li>
          </ul>
          <p>
            Notre approche repose sur une analyse approfondie de votre marché cible et de vos concurrents. Nous utilisons des outils avancés pour mesurer les performances de vos campagnes et ajuster les stratégies en temps réel.
          </p>
          <p>
            En plus de la mise en place des campagnes, nous vous accompagnons dans la gestion et l'optimisation continue de vos efforts marketing. Notre objectif est de maximiser votre retour sur investissement (ROI) et de vous aider à atteindre une croissance durable.
          </p>
        `
      },
      ia: {
        title: "Pourquoi utiliser les Outils IA ?",
        description: "L’intelligence artificielle transforme la manière dont les entreprises optimisent leurs processus. Nous vous accompagnons dans l’intégration d’outils IA pour automatiser vos tâches, analyser vos données et améliorer votre productivité.",
        heading: "Exploitez la Puissance de l’IA pour votre Entreprise",
        content: `
            <p>
              Nous vous accompagnons dans l’intégration d’outils IA pour automatiser vos tâches, analyser vos données et améliorer votre productivité. Que ce soit pour l’assistance client, la gestion des tâches ou l’analyse prédictive, nous vous proposons des solutions sur mesure.
            </p>
            <ul>
              <li><i class="bi bi-check-circle"></i> <span>Automatisation des processus métier.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Analyse de données et modélisation prédictive.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Chatbots et assistance client intelligente.</span></li>
            </ul>
            <p>
              Notre équipe d’experts en IA vous aide à identifier les opportunités d’automatisation et à mettre en place des solutions adaptées à vos besoins. Nous utilisons des technologies de pointe pour garantir des résultats rapides et efficaces.
            </p>
            <p>
              En plus de l’intégration, nous proposons des services de maintenance et de mise à jour pour assurer que vos outils IA restent performants et sécurisés. Nous croyons en une approche collaborative pour maximiser l’impact de l’IA dans votre entreprise.
            </p>
          `
      },
      formation: {
        title: "Pourquoi suivre une Formation Professionnelle ?",
        description: "Nos formations sont conçues pour aider les professionnels à acquérir des compétences clés dans leur domaine. Que ce soit pour le marketing digital, la gestion de projet ou les outils IA, nous vous offrons des formations certifiées et adaptées à vos besoins.",
        heading: "Des Formations adaptées à vos Besoins",
        content: `
            <p>
              Nous dispensons des formations en présentiel et en ligne pour vous aider à développer vos compétences professionnelles. Nos programmes sont conçus par des experts et certifiés par des organismes reconnus.
            </p>
            <ul>
              <li><i class="bi bi-check-circle"></i> <span>Formations en marketing digital et gestion de projet.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Ateliers pratiques sur les outils IA et l’analyse de données.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Certifications reconnues par Microsoft, LinkedIn, et d’autres.</span></li>
            </ul>
            <p>
              Notre approche pédagogique est axée sur la pratique et l’interactivité. Nous vous fournissons des ressources et des outils pour appliquer immédiatement ce que vous apprenez.
            </p>
            <p>
              En plus des formations, nous proposons un accompagnement personnalisé pour vous aider à atteindre vos objectifs professionnels. Nous croyons en une formation continue pour une croissance durable.
            </p>
          `
      },
      electricite: {
        title: "Pourquoi choisir l’Électricité Industrielle ?",
        description: "Nous fournissons des services d’installation et de maintenance électrique pour garantir la sécurité et l’efficacité de vos infrastructures. Nos experts interviennent sur des projets complexes pour assurer une alimentation électrique fiable et optimale.",
        heading: "Expertise en Électricité Industrielle",
        content: `
            <p>
              Nos spécialistes assurent la mise en place et l’entretien de vos installations électriques. Que ce soit pour des bâtiments industriels, des infrastructures publiques ou des projets résidentiels, nous offrons des solutions sur mesure.
            </p>
            <ul>
              <li><i class="bi bi-check-circle"></i> <span>Installation et maintenance des systèmes électriques.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Optimisation de l’efficacité énergétique.</span></li>
              <li><i class="bi bi-check-circle"></i> <span>Respect des normes de sécurité et des réglementations.</span></li>
            </ul>
            <p>
              Notre approche repose sur une analyse approfondie de vos besoins et une planification rigoureuse. Nous utilisons des équipements de pointe pour garantir des résultats durables.
            </p>
            <p>
              En plus de l’installation, nous proposons des services de maintenance préventive et corrective pour assurer que vos systèmes électriques restent performants et sécurisés. Nous croyons en une relation de confiance avec nos clients.
            </p>
          `
      }
    };

    // Fonction pour obtenir les paramètres de l'URL
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    // Vérifier si un service est spécifié dans l'URL
    const selectedService = getQueryParam("service");
    if (selectedService && services[selectedService]) {
      const service = services[selectedService];
      serviceTitle.innerText = service.title;
      serviceDescription.innerText = service.description;
      serviceHeading.innerText = service.heading;
      serviceContent.innerHTML = service.content;
    }

    // Gestion des clics sur les liens de la liste des services
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        const target = this.dataset.target;

        serviceTitle.innerText = services[target].title;
        serviceDescription.innerText = services[target].description;
        serviceHeading.innerText = services[target].heading;
        serviceContent.innerHTML = services[target].content;
      });
    });
  });

})();