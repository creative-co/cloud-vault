angular.module('vault').controller('NavbarCtrl', function ($scope, BackendService, LoginService) {
  var DEFAULT_AVATAR = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8dO_bQQOokgRcDwoYkgkgLCLFq9KbqZXSXPncHBoPj01zIj9M';
  var self = this;

  this.avatarUrl = DEFAULT_AVATAR;

  $scope.$on("login", function () {
    self.avatarUrl = LoginService.me().pictures.primary.url || DEFAULT_AVATAR;
  });

});