angular.module('vault').service('CryptoService', function ($rootScope, $q, $timeout, P3SKB, MetaService, KeyManagerService, KeybaseLoginService) {
    var me = null, requestSignature = null;

    this.login = function (credentials) {
      progress(20)();
      return KeybaseLoginService.login(credentials.kbLogin, credentials.kbPassword)
        .then(saveMe)
        .then(progress(50))

        .then(injectPublicKey)
        .then(KeyManagerService.loadPublicKey)
        .then(progress(75))

        .then(injectPrivateKey(credentials.kbPassword))
        .then(KeyManagerService.mergePgpPrivate)
        .then(progress(100))

        .then(injectCsrfToken)
        .then(KeyManagerService.buildRequestSignature)
        .then(saveRequestSignature)
    }

    this.requestHeaders = function () {
      return {
        'X-Kb-Login': this.kbLogin(),
        'X-Kb-Signature': requestSignature
      }
    }

    this.me = function () {
      return me;
    }

    this.kbLogin = function () {
      return me && me.basics.username;
    }

    /* PRIVATE */

    NOP = function () {
    }

    function progress(value) {
      return function () {
        $rootScope.$broadcast('progress', value);
        return $timeout(NOP, 100);
      }
    }

    function saveMe(userInfo) {
      me = userInfo;
    }

    function injectPublicKey() {
      return me.public_keys.primary.bundle;
    }

    function injectPrivateKey(passphrase) {
      return function () {
        return P3SKB.armor(me.private_keys.primary.bundle, passphrase);
      }
    }

    function injectCsrfToken() {
      return MetaService.csrfToken();
    }

    function saveRequestSignature(sig) {
      requestSignature = sig;
    }
  }
)
;