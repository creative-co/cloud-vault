angular.module('vault').controller('ProjectionCtrl', function ($scope, $location, $rootScope, $routeParams, BackendService, ProjectionFactory, CodecService, LoginService) {
  var self = this;

  if ($routeParams.projectionId == 'new') {
    self.projection = ProjectionFactory({
      title: 'New Project',
      team: [{kbLogin: LoginService.kbLogin(), name: LoginService.fullNameAndEmail()}]
    });
  } else {
    BackendService.loadProjection($routeParams.projectionId)
      .then(function (response) {
        return CodecService.decrypt(response.data.projection);
      })
      .then(function (projection) {
        self.projection = ProjectionFactory(projection);
      });
    // TODO: progress indication
  }

  this.onCreateBtnClicked = function () {
    return CodecService.encrypt(self.projection)
      .then(BackendService.createProjection)
      .then(navigateToUpdatedSummaries)
  }

  this.addTeamMember = function (member) {
    debugger
    self.projection.team.push(member);
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