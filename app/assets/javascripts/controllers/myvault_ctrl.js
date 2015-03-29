angular.module('myvault').controller('MyvaultCtrl', function ($scope, SummaryService) {
  $scope.onLogin = function() {
    $scope.summaries = SummaryService.query()
  }
});