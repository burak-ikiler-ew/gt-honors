!(function (document, Drupal, $) {
  'use strict';

  Drupal.behaviors.footerJS = {
    attach (context) {
      if (context !== document) {
        return;
      }

      const selectAny = $('select option[value="All"]');

      if (selectAny.length > 0) {
        selectAny.each(function () {
          $(this).text('All');
        });
      }

      $(window).scroll(function() {
        const footer = $('footer');
        const hexCon = $('footer .hex-container');
        const hT = footer.offset().top,
              hH = footer.outerHeight(),
              wH = $(window).height(),
              wS = $(this).scrollTop();
        if ((hexCon) && wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
          hexCon.addClass('activated');
        } else {
          hexCon.removeClass('activated');
        }
      });

    },
  };
})(document, Drupal, jQuery);
