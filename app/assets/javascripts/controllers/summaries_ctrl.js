angular.module('vault').controller('SummariesCtrl', function ($scope, BackendService) {
  var self = this;
  reloadSummaries();

  $scope.$on('reloadSummaries', reloadSummaries);

  function reloadSummaries() {
    BackendService.summaries().success(function (data) {
      self.summaries = data.summaries;
    })
  }
});