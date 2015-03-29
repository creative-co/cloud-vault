angular.module('myvault').service('SummaryService', function ($http, CryptoService) {
  this.query = function () {
    return $http.get('/summaries', {
      headers: _.extend($http.defaults.headers, extraHeaders())
    })
  }

  /* PRIVATE */

  function extraHeaders() {
    return {
      'X-Kb-Login': CryptoService.kbLogin(),
      'X-Kb-Signature': CryptoService.requestSignature()
    }
  }
});