/**
 * Isolate the context in an IIFE
 *
 * @param object $ jQuery object
 * @param object Drupal Drupal object
 * @param window window Current window object
 */

/* eslint-disable no-use-before-define */
(function ($, Drupal, window) {
  /**
   * Main script for the current theme
   */
  Drupal.behaviors.headerScroll = {
    attach (context) {
      if (context !== document) {
        return;
      }

      /* Show and hide header on scrolling. */
      const { body }            = document;
      const classScrolled       = 'header-visible';
      const header              = $('header');
      const headerHeight        = header.outerHeight();
      const scrollUp            = 'scroll-up';
      const scrollDown          = 'scroll-down';
      let lastScroll            = 0;

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
        } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
          // up
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
          header.addClass(classScrolled);
        }
        lastScroll = currentScroll;
      });
    },
  };

  Drupal.behaviors.dropdownFunction = {
    attach (context) {
      if (context !== document) {
        return;
      }

      const dropdown = $('header .dropdown');

      dropdown.each(function () {
        const dropdownToggleMobile = $(this).find('.dropdown-toggle--mobile');
        const dropdownToggleDesktop = $(this).find('.dropdown-toggle--desktop');

        const dropdownMenu = $(this).find('.dropdown-menu');
        const dropdownMenuItems = dropdownMenu.find('a');

        const str = `dropdown-toggle--${dropdownToggleDesktop.attr('data-unique-id')}`;
        const newId = str.replaceAll('/', '-');
        const focusableItems = dropdownToggleDesktop.add(dropdownMenuItems);

        dropdownToggleMobile.attr('aria-haspopup', 'true');
        dropdownToggleMobile.attr('aria-expanded', 'false');
        dropdownToggleMobile.attr('id', newId);

        dropdownToggleDesktop.attr('aria-haspopup', 'true');
        dropdownToggleDesktop.attr('aria-expanded', 'false');
        dropdownToggleDesktop.attr('id', newId);

        dropdownMenu.attr('aria-labelledby', dropdownToggleDesktop.attr('id'));

        $(this).on('shown.bs.dropdown', () => {
          $(this).find('.dropdown-menu').removeAttr('style');
        });

        focusableItems.on('blur mouseout', () => {
          dropdownToggleDesktop.attr('aria-expanded', 'false');
        }).on('focus mouseover', () => {
          dropdownToggleDesktop.attr('aria-expanded', 'true');
        });
      });
    },
  };

  Drupal.behaviors.headerMenuTogglers = {
    attach (context) {
      if (context !== document) {
        return;
      }

      const body = context.querySelector('body');
      const mobileMenu = context.getElementById('mainMenu');
      const mobileMenuToggle = context.getElementById('mobileMenuToggle');

      const isSearchBarExpanded = false; // for future use;
      let isMobileMenuExpanded = false;

      mobileMenuToggle.addEventListener('click', toggleMobileMenu);

      function toggleMobileMenu () {
        toggleMobileMenuPopup();
        toggleBodyScroll();
        toggleListeners();
      }

      function toggleMobileMenuPopup () {
        const toggledClassName = 'primary-menu--expanded';

        if (isMobileMenuExpanded) {
          mobileMenu.classList.remove(toggledClassName);
          mobileMenuToggle.setAttribute('aria-expanded', false);
          isMobileMenuExpanded = false;
        } else {
          mobileMenu.classList.add(toggledClassName);
          mobileMenuToggle.setAttribute('aria-expanded', true);
          isMobileMenuExpanded = true;
        }
      }

      function toggleBodyScroll () {
        const toggledClassName = 'noscroll';

        if (isMobileMenuExpanded || isSearchBarExpanded) {
          body.classList.add(toggledClassName);
        } else {
          body.classList.remove(toggledClassName);
        }
      }

      function toggleListeners () {
        if (isMobileMenuExpanded) {
          body.addEventListener('focusin', collapseMobilePopupOnFocusOut);
          context.addEventListener('keydown', collaspseMobilePopupOnEscapeKey);
        } else {
          body.removeEventListener('focusin', collapseMobilePopupOnFocusOut);
          context.removeEventListener('keydown', collaspseMobilePopupOnEscapeKey);
        }
      }

      function collapseMobilePopupOnFocusOut () {
        const { activeElement } = context;
        const isFocusOutsideMenu = !mobileMenu.contains(activeElement);

        if (isMobileMenuExpanded && isFocusOutsideMenu && (activeElement !== mobileMenuToggle)) {
          toggleMobileMenu();
        }
      }

      function collaspseMobilePopupOnEscapeKey (event) {
        const isEscapeBtnPressed = event.key === 'Escape';

        if (isMobileMenuExpanded && isEscapeBtnPressed) {
          toggleMobileMenu();
        }
      }
    },
  };
}(jQuery, Drupal, window));
