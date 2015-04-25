angular.module('vault').service('BackendService', function ($http, CryptoService) {
  this.summaries = function () {
    return $http.get('/summaries', {headers: headers()});
  }

  this.projection = function(id) {
    return $http.get('/projections/' + id, {headers: headers()});
  }

  function headers() {
    return _.extend($http.defaults.headers, CryptoService.requestHeaders());
  }
});