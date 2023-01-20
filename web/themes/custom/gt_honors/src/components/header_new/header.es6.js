/* eslint-disable require-jsdoc */
!(function (document, Drupal, $, once) {
  'use strict';

  /**
   * Setup behaviors for Header.
   */
  Drupal.behaviors.header = {

    toggleControl: function(toggler) {
      let $container = $('.header__search-area');

      if ($container.hasClass('open')) {
        $container.attr('aria-hidden', 'false');
        toggler.attr('aria-expanded', 'true');
        toggler.attr('aria-pressed', 'true');
      }

      else {
        $container.attr('aria-hidden', 'true');
        toggler.attr('aria-expanded', 'false');
        toggler.attr('aria-pressed', 'false');
      }
    },

    attach: function (context) {

      once('header', 'html', context).forEach(function() {

        function toggleHeaderSearchPopup() {
          const isSearchPopupOpen = $('.header__search-popup-container').hasClass('open');
          $('.header__search-popup-container').toggleClass('open');
          $('.search-toggler').toggleClass('open');
          $('.header__search-popup-container').attr('aria-hidden', !isSearchPopupOpen);
        }

        function searchAll() {
          const searchQuery = $('.header__search-input').val().trim();
          if (searchQuery.length) {
            const url = `/search/all?s=${encodeURIComponent(searchQuery)}`;
            $(location).prop('href', url);
          }
        }

        $('.search-toggler').on('click', toggleHeaderSearchPopup);

        $('.header__search-button').on('click', searchAll);

        $('.header__search-input').on('keypress', function(e) {
          const enterKeyId = 13;
          if (e.which === enterKeyId) {
            searchAll();
          }
        });
      });

      $('.search-menu-toggle', context).on('click', function () {

        const $searchToggler = $('.header__search-area');
        const $this = $(this);

        if ($this.hasClass('accessible-megamenu-toggler')) {

          if ($this.hasClass('js-open')) {
            $this.removeClass('js-open');
          }
          else {
            $this.addClass('js-open');
            // This calls the accessible menu init function.
            // Adding it here allows the menu to initiate when it is needed
            //and visible.
            let $mobileMenu = $('.main-menu-mobile', context);
            Drupal.behaviors.mainNavigation.initMobileMenu($mobileMenu);
          }
        }

        $searchToggler.toggleClass('open');
        Drupal.behaviors.header.toggleControl($this);
      });
    }
  };

  Drupal.behaviors.headerScroll = {
    attach (context) {
      if (context !== document) {
        return;
      }

      /* Show and hide header on scrolling. */
      const { body }            = document;
      const classScrolled      = 'header-scrolled';
      const header              = $('header');
      const headerHeight        = header.outerHeight();
      const scrollUp            = 'scroll-up';
      const scrollDown          = 'scroll-down';
      const main                = $('main');
      const announcement        = $('.announcement-banner');
      let lastScroll            = 0;

      /* Add space for header to main content */
      main.css('margin-top', headerHeight);

      /* Update space for header on window resize */
      let updatingMargin = false;

      window.addEventListener('resize', function updateMarginOnResize() {
        if (!updatingMargin) {
          updatingMargin = true;

          setTimeout(() => {
            const newHeaderHeight = header.outerHeight();
            if (newHeaderHeight) {
              main.css('margin-top', newHeaderHeight);
            }
            updatingMargin = false;
          }, 500);
        }
      });

      /* only for admin users */
      const adminTabs = $('#toolbar-administration');

      if (adminTabs.length === 0) {
        body.classList.add('admin-tabs-closed');
      }

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= headerHeight) {
          body.classList.remove(scrollUp);
          header.removeClass(classScrolled);
          return;
        }

        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
          // down
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);
          header.removeClass(classScrolled);
        }
        else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
          // up
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
          header.addClass(classScrolled);
        }
        lastScroll = currentScroll;
      });
    },
  };

  Drupal.behaviors.hexagonContainerPlacement = {

    attach: function (context) {
      const hexContainer = $('.hexagon-bg--container');

      if (hexContainer.length > 0) {
        const hexPlacement = function () {
          hexContainer.each(function () {
            if ($(this).next().hasClass('featured-events--container')) {
              $(this).addClass('next-is-featured-events');
            }
          });
        };
        hexPlacement();
      }
    }
  };
})(document, Drupal, jQuery, once);
