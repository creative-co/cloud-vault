var app = angular.module('vault', []);

//app.config(function ($sceDelegateProvider) {
//  $sceDelegateProvider.resourceUrlWhitelist([
//    'self',
//    'https://keybase.io/_/modal/**'
//  ]);
//});

app.run(function ($location, $http, MetaService) {
  $location.path('/');
  $http.defaults.headers.post['HTTP_ACCEPT'] = 'application/json'
  $http.defaults.headers.post['CONTENT_TYPE'] = 'application/json'
  $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
  $http.defaults.headers.common['X-CSRF-Token'] = MetaService.csrfToken()
});
