angular.module('vault').service('KeybaseUserLookupService', function ($http) {
  'use strict';
  var USER_LOOKUP_URL = "https://keybase.io/_/api/1.0/user/lookup.json";

  var cache = {};

  this.lookup = function (kbLogin) {
    var future = cache[kbLogin];
    future = future || (cache[kbLogin] = doLookupQuery(kbLogin));
    return future;
  };

  function doLookupQuery(kbLogin) {
    var future = {
      kbLogin: kbLogin
    };

    future.promise = $http.get(USER_LOOKUP_URL, {
      params: {fields: "pictures,profile", usernames: kbLogin},
      headers: {'X-Csrf-Token': undefined, 'X-Requested-With': undefined}
    }).then(function (response) {
      var info = response.data.them[0];
      future.fullName = info.profile.full_name;
      future.avatarUrl = info.pictures.primary.url;
    });

    return future;
  }
});
