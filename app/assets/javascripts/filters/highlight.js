angular.module('vault').filter('highlight', function($sce) {
  'use strict';
  return function(text, phrase) {
    if (phrase) {
      text = text.replace(
          new RegExp('('+phrase+')', 'gi'),
          '<span class="highlighted">$1</span>'
      );
    }
    return $sce.trustAsHtml(text);
  };
});
