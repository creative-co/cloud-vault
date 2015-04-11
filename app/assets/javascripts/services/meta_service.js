angular.module('vault').service('MetaService', function () {
  this.csrfToken = function () {
    return $('meta[name=csrf-token]').attr('content');
  }
});