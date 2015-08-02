angular.module('vault').controller('ProjectionCtrl', function ($location, $rootScope, $routeParams, BackendService, ProjectionFactory, CodecService, LoginService) {
  var self = this;

  if ($routeParams.projectionId == 'new') {
    self.projection = ProjectionFactory({
      title: 'New Project',
      team: [{kbLogin: LoginService.kbLogin(), name: 'INKOGNITO'}]
    });
  } else {
    // TODO: progress indication
    // TODO: load
    // then CodecService.decrypt(self.projection);
  }

  this.onCreateBtnClicked = function () {
    return CodecService.encrypt(self.projection)
      .then(BackendService.createProjection)
      .then(navigateToUpdatedSummaries)
  }

  // REFACTOR
  $('.nav-tabs .nav-tabs-link').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })

  function navigateToUpdatedSummaries() {
    $location.path("/summaries");
    $rootScope.$broadcast('reloadSummaries');
  }
});