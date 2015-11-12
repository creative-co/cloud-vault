angular.module('vault').directive('userAutocomplete', function (KeybaseUserAutocompleteService, $timeout, $filter) {
  'use strict';
  return {
    restrict: 'E',
    template: '<span class="keybase-user-autocomplete">' +
      '<input type=text ng-model="search" placeholder="Username, e-mail, github..."/>' +
      '<span class="kua-dropdown-menu">' +
        '<div class="kua-suggestions">' +
          '<div class="kua-suggestion" ng-repeat="item in suggestions">' +
            '<div class="kua-item thumb">' +
              '<img ng-src="{{item.thumbnail}}" width="200" height="200"/>' +
            '</div>' +
            templateItems('item') +
            templateItemWebsites('item') +
          '</div>' +
        '</div>' +
      '</span>' +
    '</span>',
    compile: function compile(tElement, tAttrs) {
      tElement.find('input').addClass(tAttrs.class);
      tElement.removeClass();
    },
    scope: {},
    controller: ctrl
  };

  function ctrl($scope) {
    // Initialize
    var PAUSE = 500;
    var DEFAULT_AVATAR = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8dO_bQQOokgRcDwoYkgkgLCLFq9KbqZXSXPncHBoPj01zIj9M';
    $scope.search = '';
    $scope.suggestions = [];
    $scope.searchTimer = null;
    $scope.activeState = true;

    // Fetch completions on change
    $scope.$watch(function () {
      return $scope.search;
    }, function(query) {
      if ($scope.searchTimer) {
        $timeout.cancel($scope.searchTimer);
      }

      if (_.isEmpty(query)) {
        return false;
      }

      $scope.searchTimer = $timeout(function() {
        KeybaseUserAutocompleteService.search(query)
            .then(processSuggestions);
      }, PAUSE);
    });

    function processSuggestions(suggestions) {
      $scope.suggestions = _.reduce(suggestions, function(memo, item) {
        var proccessed = {
          thumbnail: item.thumbnail || DEFAULT_AVATAR
        };
        _.extend(proccessed, proccessComponents(item.components));
        memo.push(proccessed);
        return memo;
      }, []);
    }

    // Remove timers when directive destroyed
    $scope.$on(
        '$destroy',
        function() {
          $timeout.cancel($scope.searchTimer);
        }
    );

    function proccessComponents(components) {
      return _.reduce(components, function(memo, value, field) {
        if (field === 'websites') {
          memo[field] = processWebsites(value);
        }
        else {
          memo[field] = {
            val: $filter('highlight')(value.val, $scope.search),
            matched: value.val.search(new RegExp($scope.search, 'i')) > -1
          };
        }
        return memo;
      }, {});
    }

    function processWebsites(arr) {
      return _.reduce(arr, function(memo, hsh) {
        var value = hsh.val;
        if (!_.contains(memo, value)) {
          memo.push({
            val: $filter('highlight')(value, $scope.search),
            matched: value.search(new RegExp($scope.search, 'i')) > -1
          });
        }
        return memo;
      }, []);
    }
  }

  function templateItems(obj) {
    return _.map([
      'username', 'full_name', 'github', 'reddit',
      'twitter', 'coinbase', 'hacker-news'
    ], function(item) {
      var val = obj + '.' + item + '.val',
          matched = obj + '.' + item + '.matched';
      return '<div class="kua-item ' + item + '" ng-class="{matched: ' + matched + '}" ' +
                  'ng-if="' + val + '" ng-bind-html="' + val + '">' +
             '</div>';
    }).join('');
  }

  function templateItemWebsites(obj) {
    var websites = obj + '.websites';
    return '<div class="kua-item website" ng-repeat="site in ' + websites + '" ' +
                'ng-bind-html="site.val" ng-class="{matched: site.matched}">' +
           '</div>';
  }
});
