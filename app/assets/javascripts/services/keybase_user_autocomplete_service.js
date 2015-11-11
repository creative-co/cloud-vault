angular.module('vault').service('KeybaseUserAutocompleteService', function ($http) {
  this.search = function(query) {
    return fetchCompletions(query);
  };

  /* PRIVATE */

  var USER_AUTOCOMPLETE_URL = "/keybase_proxy/user_autocomplete.json";

  function fetchCompletions(query) {
    return $http.get(USER_AUTOCOMPLETE_URL, toParams(query))
        .then(extractCompletions);
  }

  function toParams(query) {
    return {
      params: {
        kb: {
          q: query
        }
      }
    };
  }

  function extractCompletions(response) {
    return response.data.completions || [];
  }
});
