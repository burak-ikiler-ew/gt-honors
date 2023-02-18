/**
 * Isolate the context in an IIFE
 *
 * @param object $ jQuery object
 * @param object Drupal Drupal object
 * @param window window Current window object
 */

// eslint-disable-next-line func-names
(function ($, Drupal) {
  Drupal.behaviors.parvusJS = {
    attach (context) {
      $('body', context)
        .once('parvusJS')
        // eslint-disable-next-line func-names
        .each(() => {
          // eslint-disable-next-line no-undef
          const prvs = new Parvus({
            selector: '.lightbox',
          });
        });
    },
  };
})(jQuery, Drupal);
