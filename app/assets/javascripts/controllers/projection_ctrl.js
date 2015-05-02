angular.module('vault').controller('ProjectionCtrl', function ($routeParams, BackendService, ProjectionFactory, CodecService) {
  var self = this;

  if ($routeParams.projectionId == 'new') {
    self.projection = ProjectionFactory();
  } else {
    // TODO: progress indication
    // TODO: load
    // then CodecService.decrypt(self.projection);
  }

  this.onCreateBtnClicked = function () {
    return CodecService.encrypt(self.projection)
      .then(BackendService.createProjection);
  }

  // REFACTOR
  $('.nav-tabs .nav-tabs-link').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
});