angular.module('vault').directive('userAutocomplete', function (KeybaseUserAutocompleteService, $timeout) {
  return {
    restrict: 'E',
    template: '<span>' +
      '<input type=text ng-model="search" placeholder="Username, e-mail, github..."/>' +
      '<ul>' +
        '<li ng-repeat="item in completions">' +
          '<img ng-src="{{item.thumbnail}}" />' +
          '{{item.components.username.val}}' +
        '</li>' +
      '</ul>' +
    '</span>',
    compile: function compile(tElement, tAttrs) {
      tElement.find('input').addClass(tAttrs.class);
      tElement.removeClass();

      return postLink;
    }
  };

  function postLink(scope, element, attr, ngModel) {
    // Initialize
    var PAUSE = 500;
    scope.search = '';
    scope.completions = [];
    scope.searchTimer = null;
    scope.activeState = true;

    // Fetch completions on change
    scope.$watch(function () {
      return scope.search;
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
    }

    // Remove timers when directive destroyed
    scope.$on(
        '$destroy',
        function() {
          $timeout.cancel(scope.searchTimer);
        }
    );
  }
});
