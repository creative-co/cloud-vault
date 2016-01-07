angular.module('vault').controller('ProjectionCtrl', function ($scope, $location, $rootScope, $routeParams, BackendService, ProjectionFactory, CodecService, LoginService, KeybaseUserLookupService) {
  var self = this;

  // initializer is executed after all this.xxx variables are set
  function initialize() {
    if ($routeParams.projectionId == 'new') {
      self.projection = ProjectionFactory({
        title: 'New Project',
        team: []
      });
      self.addTeamMember(LoginService.kbLogin());
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
  }

  this.onCreateBtnClicked = function () {
    return CodecService.encrypt(self.projection)
      .then(BackendService.createProjection)
      .then(navigateToUpdatedSummaries)
  }

  this.addTeamMember = function (username) {
    var member = KeybaseUserLookupService.lookup(username);
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

  initialize();
});