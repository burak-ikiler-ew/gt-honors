<?php

namespace Drupal\gt_views\Plugin\views\filter;

use Drupal\views\Plugin\views\filter\BooleanOperator;

/**
 * Filter past date events.
 *
 * @ingroup views_filter_handlers
 *
 * @ViewsFilter("past_events_filter")
 */
class PastEventsFilter extends BooleanOperator {

  /**
   * Helper function to builds the query.
   */
  public function query() {
    if (!empty($this->value) && $this->value) {
      $where = &$this->query->getWhere();
      foreach ($where[1]['conditions'] as $index => $condition) {
        if ($condition[0] === 'field_hg_event_time_end_value') {
          unset($where[1]['conditions'][$index]);
          continue;
        }
      }
    }
    else {
      $this->query->addWhere(1, 'field_hg_event_time_end_value', strtotime(date('Y-m-d')), '>=');
    }
  }

}
