!(function (document, Drupal, $) {
  'use strict';

  /**
   * Setup behaviors for Search Bar.
   */
  Drupal.behaviors.searchItem = {

    getUrlVars: function() {
      let vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
          vars[key] = value;
        }
      );
      return vars;
    },

    attach: function (context) {
      // Populate the search query.
      let params = Drupal.behaviors.searchItem.getUrlVars();

      if (typeof params.s !== 'undefined') {
        let searchItemValues = decodeURIComponent(params.s.replace(/\+/g, '%20'));
        $('.search-item__form input[name="search"]', context).each(function () {
          $(this).val(searchItemValues);
        });
      }

      $('.search-item__form', context).on('submit', function(e) {
        let query = $(this).find('input[name="search"]').val();
        if ($.trim(query) === '') {
          e.preventDefault();
        }
        let searchKeys = $(this).attr('search-key');
        if (searchKeys) {
          for (const searchKey of searchKeys.split(',')) {
            let queryField = $(this).find('input[name="' + searchKey + '"]');
            if (queryField) {
              let newQuery = queryField.attr('default-value')
                .replace('{{search_string}}', query);
              queryField.val(newQuery);
            }
          }
        }
      });

      const heroSearchForm = $('.search-item__form-container');
      const tabButton = heroSearchForm.find('.nav-link');
      const tabContent = heroSearchForm.find('.tab-pane');

      tabButton.each(function () {
        $(this).on('click mousedown', function (e) {
          e.preventDefault();
          tabButton.removeClass('active');
          $(this).addClass('active');
          tabContent.removeClass('active');
          var tabID = $(this).attr('data-target');
          $('.tab-pane[data-tab="' + tabID + '"]').addClass('active');
        });
      });
    }

  };
})(document, Drupal, jQuery);
