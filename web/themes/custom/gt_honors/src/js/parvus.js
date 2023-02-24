/* global once */
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
      // eslint-disable-next-line
      const body = $(once('body', 'body', context));

      // eslint-disable-next-line
      body.each(() => {
        // eslint-disable-next-line no-undef
        const prvs = new Parvus({
          selector: '.lightbox',
        });
      });
    },
  };
})(jQuery, Drupal);
