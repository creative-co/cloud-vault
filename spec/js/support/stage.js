function setStage() {
  var stage = {};
  var dependencies = arguments;

  beforeEach(module('vault'));
  beforeEach(inject(function ($q, $rootScope, $injector) {
    stage.$q = $q;
    stage.$rootScope = $rootScope;
    angular.forEach(dependencies, function(dep) {
      stage[dep] = $injector.get(dep);
    });
  }));

  stage.waitsForPromise = function (promise, callback) {
    var value, error, resolved = false;
    promise.then(function (arg) {
      resolved = true;
      value = arg;
    }, function (arg) {
      resolved = true;
      error = arg;
    });
    waitsFor(function () {
      stage.$rootScope.$apply();
      return resolved;
    });
    runs(function () {
      callback(value, error)
    });
  }

  return stage;
}