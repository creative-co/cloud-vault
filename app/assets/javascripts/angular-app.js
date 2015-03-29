var app = angular.module('myvault', []);

app.run(function ($http) {
  $http.defaults.headers.post['HTTP_ACCEPT'] = 'application/json'
  $http.defaults.headers.post['CONTENT_TYPE'] = 'application/json'
  $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
  $http.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
});
