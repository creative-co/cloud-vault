angular.module('vault').controller('ProjectionCtrl', function ($scope, BackendService, ProjectionFactory, $location) {
  var self = this;
  self.visible = false;

  // TODO ngRoute
  // $scope.$watch(pathFn, function (path) {
  //   switch (path) {
  //     case "":
  //     case "/":
  //       self.visible = false;
  //       break;

  //     case "/new":
  //       self.projection = ProjectionFactory();
  //       self.visible = true;
  //       break;

  //     default:
  //       BackendService.projection(path).success(function (data) {
  //         self.projection = ProjectionFactory(data);
  //       });
  //       self.visible = true;
  //   }
  // });

  // /* PRIVATE */

  // function pathFn() {
  //   return $location.path();
  // }
});