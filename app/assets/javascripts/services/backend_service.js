angular.module('vault').service('BackendService', function ($http, LoginService) {
  this.summaries = function () {
    return $http.get('/summaries', {headers: headers()});
  }

  this.projection = function (path) {
    return $http.get('/projections' + path, {headers: headers()});
  };

  this.createProjection = function (data) {
    return $http.post('/projections', data, {headers: headers()});
  };

  this.loadProjection = function (projectionId) {
    return $http.get('/projections/' + projectionId, {headers: headers()});
  };

  function headers() {
    return _.extend($http.defaults.headers, LoginService.requestHeaders());
  }

});