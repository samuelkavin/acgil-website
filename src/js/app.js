import '../assets/css/style.css';

import 'jquery';
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../assets/vendor/jquery.easing/jquery.easing.min.js';
import '../assets/vendor/waypoints/jquery.waypoints.min.js';
import '../assets/vendor/counterup/counterup.min.js';
import '../assets/vendor/owl.carousel/owl.carousel.min.js';
// import '../assets/vendor/isotope-layout/isotope.pkgd.min.js';
import '../assets/vendor/venobox/venobox.min.js';
import '../assets/vendor/aos/aos.js';

/* eslint wrap-iife: [1, "outside"] */
(function () {
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader')
        .delay(100)
        .fadeOut('slow', function () {
          $(this).remove();
        });
    }
  });

  const scrolltoOffset = $('#header').outerHeight() - 21;
  if (window.matchMedia('(max-width: 991px)').matches) {
    // eslint-disable-next-line no-const-assign
    scrolltoOffset += 20;
  }
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (
      // eslint-disable-next-line no-undef
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      // eslint-disable-next-line no-undef
      location.hostname === this.hostname
    ) {
      const target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        const scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr('href') === '#header') {
          // eslint-disable-next-line no-shadow
          const scrollto = 0;
        }

        $('html, body').animate(
          {
            scrollTop: scrollto
          },
          1500,
          'easeInOutExpo'
        );

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function () {
    if (window.location.hash) {
      const intialNav = window.location.hash;
      if ($(intialNav).length) {
        const scrollto = $(intialNav).offset().top - scrolltoOffset;
        $('html, body').animate(
          {
            scrollTop: scrollto
          },
          1500,
          'easeInOutExpo'
        );
      }
    }
  });

  const navSection = $('section');
  const mainNav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function () {
    const curPos = $(this).scrollTop() + 200;

    navSection.each(function () {
      // eslint-disable-next-line prefer-destructuring
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();

      if (curPos >= top && curPos <= bottom) {
        if (curPos <= bottom) {
          mainNav.find('li').removeClass('active');
        }
        mainNav
          .find('a[href="#' + $(this).attr('id') + '"]')
          .parent('li')
          .addClass('active');
      }
      if (curPos < 300) {
        $('.nav-menu ul:first li:first, .mobile-menu ul:first li:first').addClass('active');
      }
    });
  });

  if ($('.nav-menu').length) {
    const mobileNav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append(mobileNav);
    $('body').prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $('.mobile-nav, .mobile-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($('.mobile-nav, .mobile-nav-toggle').length) {
    $('.mobile-nav, .mobile-nav-toggle').hide();
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      1500,
      'easeInOutExpo'
    );
    return false;
  });

  // Skills section
  $('.skills-content').waypoint(
    function () {
      $('.progress .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
      });
    },
    {
      offset: '80%'
    }
  );

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $('.testimonials-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function () {
      $('#portfolio-flters li').removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aosInit();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox();
    });
  });

  $('.portfolio-details-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aosInit() {
    // eslint-disable-next-line no-undef
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function () {
    aosInit();
  });
})();
