angular.module('vault').service('KeyManagerService', function ($q) {
    var sharedKeyManager = null;

    this.loadPublicKey = function (inKey) {
      return $q(function (resolve, reject) {
        kbpgp.KeyManager.import_from_armored_pgp({armored: inKey}, function (err, keyManager) {
          err ? reject("loadKey: " + err) : resolve(keyManager);
        })
      }).then(function (mgr) {
        sharedKeyManager = mgr;
      })
    }

    this.mergePgpPrivate = function (privateKey) {
      return $q(function (resolve, reject) {
        sharedKeyManager.merge_pgp_private({armored: privateKey}, function (err) {
          err ? reject(err) : resolve();
        });
      });
    }

    // this is  CSRF_TOKEN -> PGP -> BASE64
    this.buildRequestSignature = function (csrfToken) {
      var params = {msg: csrfToken, sign_with: sharedKeyManager};
      return $q(function (resolve, reject) {
        kbpgp.box(params, function (err, result_string, result_buffer) {
          err ? reject(err) : resolve(Base64.encode(result_string))
        })
      })
    }

    this.pgpEncrypt = function (data) {

    }

    this.pgpDecrypt = function (armored) {

    }
  }
);