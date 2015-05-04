angular.module('vault').factory('ProjectionFactory', function () {
  function Projection(data) {
    this.projectId = data.project_id;
    this.title = data.title;
    this.decryptedContent = data.decryptedContent || "";
    this.team = data.team;
    this.teamChanged = false;
  }

  Projection.prototype.toParams = function() {
    return _.clone(this);
  }

  return function (data) {
    return new Projection(data || {});
  }
});