angular.module('vault').service('CodecService', function ($q, $http, KeyManagerService, TriplesecService) {
  this.encrypt = function (projection) {
    return $q.when(projection.toParams())
      .then(encryptContent)
      .then(encryptPassphrase)
      .then(signTeamIfChanged) // team attribute may be ommitted if no changes
      .then(sanitizeSensitiveData);
  }


  /* PRIVATE */

  function encryptContent(proj) {
    return TriplesecService.genpw().
      then(function (pw) {
        proj.passphrase = pw;
        return TriplesecService.encrypt(proj.decryptedContent, pw);
      }).then(function (encrypted) {
        proj.encryptedContent = encrypted;
        return proj;
      });
  }

  function encryptPassphrase(proj) {
    proj.passphrases = {};
    var promises = _.map(proj.team, function (memberKbLogin) {
      return fetchPublicKeyFor(memberKbLogin)
        .then(function (memberKey) {
          return KeyManagerService.pgpEncryptForKey(proj.passphrase, memberKey)
        }).then(function (encryptedPassphrase) {
          proj.passphrases[memberKbLogin] = encryptedPassphrase;
        });
    });
    return $q.all(promises).then(function () {
      proj.passphrase = null; // security measure
      return proj;
    })
  }


  function signTeamIfChanged(proj) {

  }

  function sanitizeSensitiveData(proj) {
    return {hello: 123};
  }

  function fetchPublicKeyFor(kbLogin) {
    return $q(function (resolve, reject) {
      $.get("https://keybase.io/" + kbLogin + "/key.asc", resolve)
    })
  }


//this.encryptedContent = data.encrypted_content;
//this.passphrase = data.passphrase;

});
