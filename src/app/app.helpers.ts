/*
 * Inspinia js helpers:
 *
 * correctHeight() - fix the height of main wrapper
 * detectBody() - detect windows size
 * smoothlyMenu() - add smooth fade in/out on navigation show/hide
 *
 */

declare var jQuery: any;
declare var WOW: any;

export function correctHeight() {

  var pageWrapper = jQuery('#page-wrapper');
  var navbarHeight = jQuery('nav.navbar-default').height();
  var wrapperHeigh = pageWrapper.height();

  if (navbarHeight > wrapperHeigh) {
    pageWrapper.css("min-height", navbarHeight + "px");
  }

  if (navbarHeight < wrapperHeigh) {
    if (navbarHeight < jQuery(window).height()) {
      pageWrapper.css("min-height", jQuery(window).height() + "px");
    } else {
      pageWrapper.css("min-height", navbarHeight + "px");
    }
  }

  if (jQuery('body').hasClass('fixed-nav')) {
    if (navbarHeight > wrapperHeigh) {
      pageWrapper.css("min-height", navbarHeight + "px");
    } else {
      pageWrapper.css("min-height", jQuery(window).height() - 60 + "px");
    }
  }
}

export function detectBody() {
  if (jQuery(document).width() < 769) {
    jQuery('body').addClass('body-small')
  } else {
    jQuery('body').removeClass('body-small')
  }
}

export function smoothlyMenu() {
  if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    jQuery('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function () {
        jQuery('#side-menu').fadeIn(400);
      }, 200);
  } else if (jQuery('body').hasClass('fixed-sidebar')) {
    jQuery('#side-menu').hide();
    setTimeout(
      function () {
        jQuery('#side-menu').fadeIn(400);
      }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    jQuery('#side-menu').removeAttr('style');
  }
}

export function countDown() {
  // Set up your end date just below
		jQuery('#clock').countdown('2018/10/24 15:30:30', function(event) {

			var $this = jQuery(this).html(event.strftime(''
			+ '<div class="col-xs-6 col-sm-3 col-lg-3">%D<span>Days</span></div> '
			+ '<div class="col-xs-6 col-sm-3 col-lg-3">%H<span>Hours</span></div> '
			+ '<div class="col-xs-6 col-sm-3 col-lg-3">%M<span>Minutes</span></div> '
			+ '<div class="col-xs-6 col-sm-3 col-lg-3">%S<span>Seconds</span></div>'));
		});
}

export function topScroll() {
  jQuery(document).ready(function () {

    jQuery('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 80
    });

    // Page scrolling feature
    jQuery('a.page-scroll').bind('click', function (event) {
      var link = jQuery(this);
      jQuery('html, body').stop().animate({
        scrollTop: jQuery(link.attr('href')).offset().top - 50
      }, 500);
      event.preventDefault();
      jQuery("#navbar").collapse('hide');
    });
  });

  var cbpAnimatedHeader = (function () {
    var docElem = document.documentElement,
      header = document.querySelector('.navbar-default'),
      didScroll = false,
      changeHeaderOn = 200;
    function init() {
      window.addEventListener('scroll', function (event) {
        if (!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 250);
        }
      }, false);
    }
    function scrollPage() {
      var sy = scrollY();
      if (sy >= changeHeaderOn) {
        jQuery(header).addClass('navbar-scroll')
      }
      else {
        jQuery(header).removeClass('navbar-scroll')
      }
      didScroll = false;
    }
    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }
    init();

  })();

  // Activate WOW.js plugin for animation on scrol
  new WOW().init();

}
