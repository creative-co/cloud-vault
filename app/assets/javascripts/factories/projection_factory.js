angular.module('vault').factory('ProjectionFactory', function () {
  function Projection(data) {
    this.projectId = data.project_id;
    this.title = data.title || 'New Vault';
    this.encryptedContent = data.encrypted_content;
    this.decryptedContent = "";
    this.team = data.team || [];
    this.passphrase = data.passphrase;
  }

  return function (data) {
    return new Projection(data || {});
  }
});