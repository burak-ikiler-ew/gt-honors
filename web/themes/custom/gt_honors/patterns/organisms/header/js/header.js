/**
 * Isolate the context in an IIFE
 *
 * @param object $ jQuery object
 * @param object Drupal Drupal object
 * @param window window Current window object
 */

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
        const dropdownToggle = $(this).find('.dropdown-toggle');
        const dropdownMenu = $(this).find('.dropdown-menu');
        const dropdownMenuItems = dropdownMenu.find('a');
        const str = `dropdown-toggle__${dropdownToggle.attr('data-drupal-link-system-path')}`;
        const newId = str.replaceAll('/', '-');
        const focusableItems = dropdownToggle.add(dropdownMenuItems);
        dropdownToggle.attr('aria-haspopup', 'true');
        dropdownToggle.attr('aria-expanded', 'false');
        dropdownToggle.attr('id', newId);
        dropdownMenu.attr('aria-labelledby', dropdownToggle.attr('id'));

        focusableItems.on('blur mouseout', () => {
          dropdownToggle.attr('aria-expanded', 'false');
        }).on('focus mouseover', () => {
          dropdownToggle.attr('aria-expanded', 'true');
        });
      });
    },
  };
}(jQuery, Drupal, window));
