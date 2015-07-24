angular.module('vault').factory('ProjectionFactory', function () {
  function Projection(data) {
    this.projectId = data.project_id;
    this.title = data.title;
    this.decryptedContent = data.decryptedContent || "";
    this.team = data.team;
  }

  Projection.prototype.toParams = function() {
    return {
      title: this.title,
      encrypted_content: this.encryptedContent,
      signed_team: this.signedTeam,
      passphrases: this.passphrases
    }
  }

  return function (data) {
    return new Projection(data || {});
  }
});