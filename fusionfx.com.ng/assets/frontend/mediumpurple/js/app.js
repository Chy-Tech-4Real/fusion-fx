jQuery(document).ready(function ($) {
  "use strict";

  //preloader
  $(".preloader-holder")
    .delay(300)
    .animate(
      {
        opacity: "0",
      },
      300,
      function () {
        $(".preloader-holder").css("display", "none");
      }
    );

  // menu options custom affix
  var fixed_top = $(".header");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown header-fixed");
    } else {
      fixed_top.removeClass("animated fadeInDown header-fixed");
    }
  });

  $("#mobile-menu-open").on("click", function () {
    $(".mobile-menu-nav").addClass("active");
  });
  $("#mobile-menu-close").on("click", function () {
    $(".mobile-menu-nav").removeClass("active");
  });

  // mobile menu js
  $(".main-menu>li, .main-menu .sub-menu>li").on("click", function () {
    const element = $(this);
    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find("li").removeClass("open");
    } else {
      element.addClass("open");
      element.siblings("li").removeClass("open");
      element.siblings("li").find("li").removeClass("open");
    }
  });

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Show or hide the sticky footer button
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn(200);
    } else {
      $(".back-to-top").fadeOut(200);
    }
  });

  // Animate the scroll to top
  $(".back-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  new WOW().init();

  $(".overview-item").each(function () {
    $(this).isInViewport(function (status) {
      if (status === "entered") {
        for (
          var i = 0;
          i < document.querySelectorAll(".odometer").length;
          i++
        ) {
          var el = document.querySelectorAll(".odometer")[i];
          el.innerHTML = el.getAttribute("data-odometer-final");
        }
      }
    });
  });

  // hn_testimonial_slider
  $(".hn_testimonial_slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: false,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    speed: 1500,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
