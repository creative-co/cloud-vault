angular.module('vault').service('CryptoService', function ($rootScope, $q, $timeout, P3SKB, MetaService, KeybaseLoginService) {
    var me = null,
      sharedKeyManager = null,
      cachedRequestSignature = null;

    this.login = function (credentials) {
      progress(20)();
      return KeybaseLoginService.login(credentials.kbLogin, credentials.kbPassword)
        .then(saveMe).then(progress(50))
        .then(injectPublicKey).then(loadKey).then(savePublicKey).then(progress(75))
        .then(injectPrivateKey(credentials.kbPassword)).then(mergePgpPrivate).then(progress(100))
        .then(buildRequestSignature).then(saveRequestSignature)
    }

    // TODO: remove hardcoded username and request signature
    this.requestHeaders = function () {
      return {
        'X-Kb-Login': kbLogin(),
        'X-Kb-Signature': requestSignature()
      }
    }

    this.me = function () {
      return me;
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
      return me;
    }

    function savePublicKey(key) {
      sharedKeyManager = key;
    }

    kbLogin = function () {
      return me && me.basics.username;
    }

    function injectPublicKey() {
      return me.public_keys.primary.bundle;
    }

    function loadKey(inKey) {
      return $q(function (resolve, reject) {
        kbpgp.KeyManager.import_from_armored_pgp({armored: inKey}, function (err, keyManager) {
          err ? reject("loadKey: " + err) : resolve(keyManager);
        })
      })
    }


    function requestSignature() {
      // it's lifetime is 10 minutes, should be re-generated often
      return cachedRequestSignature;
    }

    // TODO - implement
    // this is  CSRF_TOKEN -> PGP -> BASE64
    function buildRequestSignature() {
      var params = {msg: MetaService.csrfToken(), sign_with: sharedKeyManager};
      return $q(function (resolve, reject) {
        kbpgp.box(params, function (err, result_string, result_buffer) {
          err ? reject(err) : resolve(Base64.encode(result_string))
        })
      })
    }

    function saveRequestSignature(sig) {
      cachedRequestSignature = sig;
    }

    function injectPrivateKey(passphrase) {
      return function () {
        return P3SKB.armor(me.private_keys.primary.bundle, passphrase);
      }
    }

    function mergePgpPrivate(privateKey) {
      return $q(function (resolve, reject) {
        sharedKeyManager.merge_pgp_private({armored: privateKey}, function (err) {
          err ? reject(err) : resolve();
        });
      });
    }

  }
);