function setStage() {
  var stage = {};
  var dependencies = arguments;

  beforeEach(module('vault'));
  beforeEach(inject(function ($q, $rootScope, $injector, KeyManagerService) {
    stage.$q = $q;
    stage.$rootScope = $rootScope;
    stage.KeyManagerService = KeyManagerService;
    angular.forEach(dependencies, function (dep) {
      stage[dep] = $injector.get(dep);
    });
  }));

  stage.initKeyManager = function () {
    return stage.KeyManagerService.loadPublicKey(FIXTURES.demo_public_key)
      .then(function () {
        return stage.KeyManagerService.mergePgpPrivate(FIXTURES.demo_private_key);
      });
  }

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