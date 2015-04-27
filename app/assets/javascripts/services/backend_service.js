angular.module('vault').service('BackendService', function ($http, CryptoService) {
  this.summaries = function () {
    return $http.get('/summaries', {headers: headers()});
  }

  this.projection = function(path) {
    return $http.get('/projections' + path, {headers: headers()});
  }

  function headers() {
    return _.extend($http.defaults.headers, CryptoService.requestHeaders());
  }
});