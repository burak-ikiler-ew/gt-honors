!(function (document, Drupal, $) {
  'use strict';

  /**
   * Setup behaviors for Search Bar.
   */
  Drupal.behaviors.searchBar = {

    displayControl: function(group, index) {
      let showClass = 'js-html-show';
      group.removeClass(showClass).eq(index).addClass(showClass);
    },

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
      let $searchInput = $('.search-bar__form input[name="search"]', context);
      let $htmlGroup = $('.search-bar__form-footer', context);

      $('.search-bar__radio-buttons input[type=radio]', context).on('change', function () {
        let checked = $('.search-bar__radio-buttons input[type=radio]:checked', context);
        let checkedLabel = $('.search-bar__radio-buttons input[type=radio]:checked + label', context);
        let checkedLabelWidth = checkedLabel.css('width');
        let checkedLabelLeft = checkedLabel.position().left;
        const radioSelector = $('.search-bar__radio-buttons .radio-selector', context);
        Drupal.behaviors.searchBar.displayControl($htmlGroup, checked.index('.search-bar__radio-buttons input[type=radio]'));
        radioSelector.css('width', checkedLabelWidth);
        radioSelector.css('left', checkedLabelLeft);
      }).change();

      $htmlGroup.find('form').on('submit', function() {
        let query = $searchInput.val();
        let $queryField = $(this).find('input.query');

        if ($queryField.data('prefix')) {
          query = $queryField.data('prefix') + query;
        }

        $queryField.val(query);
      });

      // Populate the search query.
      let params = Drupal.behaviors.searchBar.getUrlVars();

      if (typeof params.s !== 'undefined') {
        $searchInput.val(decodeURIComponent(params.s.replace(/\+/g, '%20')));
      }

      $('.search-bar__form', context).on('submit', function(e) {
        e.preventDefault();

        $htmlGroup.filter('.js-html-show').find('form').submit();
      });

      const heroSearch = $('.paragraph--type--hero-search');

      heroSearch.each(function () {
        if (
          $(this).next('.paragraph--type--collection-link-card').length === 0 &&
          $(this).next('.hexagon-bg--container').length === 0
        ) {
          $(this).after('<div class="hexagon-bg--container"></div>');
        }
      });
    }

  };
})(document, Drupal, jQuery);
