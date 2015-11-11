angular.module('vault').directive('userAutocomplete', function (KeybaseUserAutocompleteService, $timeout) {
  return {
    require: 'ngModel',
    restrict: 'E',
    replace: true,
    template: '<input type=text placeholder="Username, e-mail, github..."/>',
    link: function(scope, element, attr, ngModel) {
      // Initialize
      var PAUSE = 500;
      scope.completions = [];
      scope.searchTimer = null;

      // Fetch completions on change
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function(query) {
        if (scope.searchTimer) {
          $timeout.cancel(scope.searchTimer);
        }

        if (_.isEmpty(query)) {
          return false;
        }

        scope.searchTimer = $timeout(function() {
          KeybaseUserAutocompleteService.search(query)
              .then(updateCompletions);
        }, PAUSE);
      });

      function updateCompletions(completions) {
        scope.completions = completions;
        console.log(completions);
      }

      // Remove timers when directive destroyed
      scope.$on(
          '$destroy',
          function() {
            $timeout.cancel(scope.searchTimer);
          }
      );
    }
  };
});
