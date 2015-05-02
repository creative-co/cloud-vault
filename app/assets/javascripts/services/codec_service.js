angular.module('vault').service('CodecService', function ($q, KeyManagerService) {
  this.encrypt = function (projection) {
    return $q.when(projection.toParams())
      .then(encryptContent)
      .then(signTeamIfPresent) // team attribute may be ommitted if no changes
      .then(sanitizeSensitiveData);
  }


  /* PRIVATE */

  function encryptContent(object) {

  }

  function signTeamIfPresent(object) {

  }

  function sanitizeSensitiveData(object) {
    return {hello: 123};
  }


//this.encryptedContent = data.encrypted_content;
//this.passphrase = data.passphrase;

});
