angular.module('vault').controller('SummariesCtrl', function (BackendService) {
  var self = this;

  BackendService.summaries().success(function (data) {
    self.summaries = data.summaries;
  })

  self.showProjection = function(projectionId) {
    BackendService.projection(projectionId).success(function (data) {
      console.log(data);
      alert("Projection loaded - see console logs");
    }).error(function(response){
      console.log(response);
      alert("Projection loading failed - see console logs")
    })
  }
});