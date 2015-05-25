angular.module('vault').service('KeyManagerService', function ($q) {
    var sharedKeyManager = null;

    this.loadPublicKey = function (inKey) {
      return doImportArmored(inKey).then(function (mgr) {
        sharedKeyManager = mgr;
      });
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

    this.pgpEncryptForMyself = function (data) {
      return doEncrypt(data, sharedKeyManager);
    }

    this.pgpEncryptForKey = function (data, publicKey) {
      return doImportArmored(publicKey).then(function (manager) {
        return doEncrypt(data, manager);
      })
    }

    this.pgpDecrypt = function (armored) {
      return doDecrypt(armored, sharedKeyManager);
    }

    // PRIVATE FUNCTIONS

    function doImportArmored(inKey) {
      return $q(function (resolve, reject) {
        kbpgp.KeyManager.import_from_armored_pgp({armored: inKey}, function (err, keyManager) {
          err ? reject("loadKey: " + err) : resolve(keyManager);
        })
      });
    }

    function doEncrypt(data, manager) {
      return $q(function (resolve, reject) {
        var params = {msg: data, encrypt_for: manager};
        kbpgp.box(params, function (err, resultString) {
          err ? reject(err) : resolve(resultString);
        });
      });
    }

    function doDecrypt(data, manager) {
      return $q(function (resolve, reject) {
        var ring = new kbpgp.keyring.KeyRing;
        ring.add_key_manager(manager);
        var params = {keyfetch: ring, armored: data};
        kbpgp.unbox(params, function (err, literals) {
          err ? reject(err) : resolve(literals[0].toString());
        });
      });
    }
  }
);