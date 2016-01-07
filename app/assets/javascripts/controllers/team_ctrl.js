angular.module('vault').controller('TeamCtrl', function ($scope, KeybaseUserAutocompleteService) {
  $scope.userSuggestions = [];

  $scope.refreshUserSuggestions = function (query) {
    if (_.isEmpty(query)) {
      $scope.userSuggestions.length = 0; // clear()
    } else {
      $scope.userSuggestions.$promise = KeybaseUserAutocompleteService.search(query).then(function (suggestions) {
        Array.prototype.splice.apply($scope.userSuggestions, [0, $scope.userSuggestions.length].concat(suggestions));
        $scope.userSuggestions.$loading = false;
      });
      $scope.userSuggestions.$loading = true;
    }
  };

  $scope.onSelectUser = function (user) {
    $scope.projectionCtrl.addTeamMember(user.username);
  };

});