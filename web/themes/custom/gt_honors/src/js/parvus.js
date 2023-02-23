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
      const body = $(once('body', 'body', context));

      body.each(() => {
        // eslint-disable-next-line no-undef
        const prvs = new Parvus({
          selector: '.lightbox',
        });
      });
    },
  };
})(jQuery, Drupal);
