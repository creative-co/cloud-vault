angular.module('vault').controller('ProjectionCtrl', function ($scope, BackendService, ProjectionFactory, $location) {
  var self = this;
  self.visible = false;

  // REFACTOR
  $('.nav-tabs .nav-tabs-link').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
});