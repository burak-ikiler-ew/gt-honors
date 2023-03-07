/* eslint-disable no-use-before-define */

/**
 * Isolate the context in an IIFE
 *
 * @param object Drupal Drupal object
 */

(function (Drupal) {
  Drupal.behaviors.accordion = {
    attach (context) {
      const ACOORDION_BUTTON_CLASS = '.accordion__button';
      const ACOORDION_PANEL_CLASS = '.accordion__panel';
      const ACCORDIONS = context.querySelectorAll('.accordion');

      if (ACCORDIONS.length) {
        ACCORDIONS.forEach((accordion) => {
          const accordionButton = accordion.querySelector(ACOORDION_BUTTON_CLASS);
          accordionButton.addEventListener('click', () => { switchAccordion(accordion); });
        });
      }

      function switchAccordion (clickedAccordion) {
        toggle(clickedAccordion);
        collapseAllExcept(clickedAccordion);
      }

      function collapseAllExcept (clickedAccordion) {
        ACCORDIONS.forEach((accordion) => {
          if (accordion !== clickedAccordion) {
            collapse(accordion);
          }
        });
      }

      function collapse (accordion) {
        toggle(accordion, 'collapse');
      }

      function toggle (accordion, mode = 'toggle') {
        const accrodionButton = accordion.querySelector(ACOORDION_BUTTON_CLASS);
        const accordionPanel = accordion.querySelector(ACOORDION_PANEL_CLASS);
        const isExpanded = accrodionButton.getAttribute('aria-expanded') === 'true';

        accrodionButton.setAttribute('aria-expanded', mode === 'collapse' ? 'false' : !isExpanded);
        accordionPanel.setAttribute('aria-hidden', mode === 'collapse' ? 'true' : isExpanded);

        if (mode === 'collapse' || isExpanded) {
          accordionPanel.style.maxHeight = null;
        } else {
          accordionPanel.style.maxHeight = `${accordionPanel.scrollHeight}px`;
        }
      }
    },
  };
}(Drupal));
