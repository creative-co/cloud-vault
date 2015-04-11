angular.module('vault').service('CryptoService', function ($q, MetaService, KeybaseLoginService) {
    var me = null, publicKey = null, privateKey = null, cachedRequestSignature = null;

    this.login = function (credentials) {
      return KeybaseLoginService
        .login(credentials.kbLogin, credentials.kbPassword).then(saveMe)
        .then(injectPublicKey).then(loadKey).then(savePublicKey)
        .then(injectPrivateKey).then(loadKey).then(unlockPrivateKey(credentials.kbPassword)).then(savePrivateKey)
        .then(buildRequestSignature).then(saveRequestSignature)
    }

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

    function saveMe(userInfo) {
      me = userInfo;
    }

    function savePublicKey(key) {
      publicKey = key;
    }

    function savePrivateKey(key) {
      privateKey = key;
    }

    function unlockPrivateKey(passphrase) {
      return function (key) {
        if (!key.is_pgp_locked()) {
          return key;
        }

        return $q(function (resolve, reject) {
          key.unlock_pgp({passphrase: passphrase}, function (err) {
            err ? reject(err) : resolve(key);
          })
        })
      }
    }

    kbLogin = function () {
      return me && me.basics.username;
    }

    function injectPublicKey() {
      return me.public_keys.primary.bundle;
    }

    function injectPrivateKey() {
      //var h = "-----BEGIN PGP PRIVATE KEY BLOCK-----\n\n"
      //var t = "\n-----END PGP PRIVATE KEY BLOCK-----\n"
      //return h + me.private_keys.primary.bundle + t;
      return $q(function (resolve, reject) {
        me.private_keys.primary.kid
      });
    }

    function loadKey(rawKey) {
      return $q(function (resolve, reject) {
        kbpgp.KeyManager.import_from_armored_pgp({armored: rawKey}, function (err, key) {
          if (err) {
            debugger
          }
          err ? reject("loadKey: " + err) : resolve(key);
        })
      })
    }

    function requestSignature() {
      // it's lifetime is 10 minutes, should be re-generated often
      return cachedRequestSignature;
    }

    // this is  CSRF_TOKEN -> PGP -> BASE64
    function buildRequestSignature() {
      var params = {msg: MetaService.csrfToken(), sign_with: privateKey};
      console.log(params);
      return $q(function (resolve, reject) {
        kbpgp.box(params, function (err, result_string, result_buffer) {
          console.log(err, result_string, result_buffer)
          err ? reject(err) : resolve(result_string)
        })
      })
      //return 'LS0tLS1CRUdJTiBQR1AgU0lHTkVEIE1FU1NBR0UtLS0tLQpIYXNoOiBTSEE1MTIKCjEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5egotLS0tLUJFR0lOIFBHUCBTSUdOQVRVUkUtLS0tLQpWZXJzaW9uOiBLZXliYXNlIE9wZW5QR1AgdjIuMC44CkNvbW1lbnQ6IGh0dHBzOi8va2V5YmFzZS5pby9jcnlwdG8KCndzQmNCQUFCQ2dBR0JRSlZGdlFOQUFvSkVPbmJLclBBckVxWVRiZ0gvUlNzUW5WQ0dEQWkvSW1vYjFkQ3M2MWEKazJUSDBWSHdhOHFjbm00d1pSZ2FiOWh6UmhBL3R1UHFUUHRNTmYwT28wNGhCU1dxbzRML0lVbUorOVdac211awpPZ0JscU5aaHo1UU80VzNMVmV3M2JKUGRZKy9iVE5sd090ZFJZMDZNWU10MWJyYWs0MHNtZGg1NitkVG9HdEM0CnlBYlpxdjRsRTVGRTgrSW9zRzZVZWNxVHloYmNmZ3ljTnZVU2JyV3JsRGNPQ0M0N1h5U0x2VkpXb21RQnRKRFQKNUVMN3FxUk15Vk5NMWtBS01UeFEwSCtkWkJpaE9reXlZakdObVJsT2JETW9vNjk1bW16V3lDTXZvZlpETXAvTwpaNTZRazB0OHlEU0JOOWxBamJodVVmUGl6WnRYQTkyNkFSWXBKcFI5enUzT1kySnM4bC92cVdsdzNBKzU4M2s9Cj04ZzVwCi0tLS0tRU5EIFBHUCBTSUdOQVRVUkUtLS0tLQoK';
    }

    function saveRequestSignature(sig) {
      cachedRequestSignature = sig;
    }
  }
);