var app = angular.module('vault', ['ngRoute']);

app
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login_form',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/summaries', {
        templateUrl: 'summaries',
        controller: 'SummariesCtrl',
        controllerAs: 'summariesCtrl'
      })
      .when('/projections/:projectionId', {
        templateUrl: 'projection',
        controller: 'ProjectionCtrl',
        controllerAs: 'projectionCtrl'
      })

  })
  .run(function ($location, $http, MetaService) {
    $location.path('/');
    $http.defaults.headers.post['HTTP_ACCEPT'] = 'application/json'
    $http.defaults.headers.post['CONTENT_TYPE'] = 'application/json'
    $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
    $http.defaults.headers.common['X-CSRF-Token'] = MetaService.csrfToken()
  });