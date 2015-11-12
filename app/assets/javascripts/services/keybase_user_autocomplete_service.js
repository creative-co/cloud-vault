angular.module('vault').service('KeybaseUserAutocompleteService', function ($http) {
  'use strict';

  var USER_AUTOCOMPLETE_URL = "https://keybase.io/_/api/1.0/user/autocomplete.json",
      DEFAULT_AVATAR = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8dO_bQQOokgRcDwoYkgkgLCLFq9KbqZXSXPncHBoPj01zIj9M';

  this.search = function(query) {
    return $http.get(USER_AUTOCOMPLETE_URL, {
      params: toParams(query),
      headers: {
        'X-Csrf-Token': undefined,
        'X-Requested-With': undefined
      }
    }).then(processSuggestions);
  };

  function toParams(query) {
    return {
      q: query
    };
  }

  function processSuggestions(response) {
    var completions = response.data.completions;
    return _.reduce(completions, function(memo, item) {
      var proccessed = {};
      proccessed.thumbnail = item.thumbnail || DEFAULT_AVATAR;
      proccessed.uid = item.uid;
      proccessed.username = item.components.username.val;
      proccessed.name = item.components.full_name && item.components.full_name.val;
      proccessed.components = proccessComponents(item.components);
      proccessed.websites = processWebsites(item.components.websites);
      memo.push(proccessed);
      return memo;
    }, []);
  }

  function proccessComponents(components) {
    var orders = [
      'username', 'full_name', 'github', 'reddit',
      'twitter', 'coinbase', 'hackernews'
    ];
    return _.reduce(components, function(memo, value, field) {
      if (field !== 'websites') {
        var idx = orders.indexOf(field);
        if (idx > -1) {
          memo[idx] = {
            field: field,
            val: value.val
          };
        }
      }
      return memo;
    }, {});
  }

  function processWebsites(arr) {
    return _.reduce(arr, function(memo, hsh) {
      var value = hsh.val;
      if (!_.contains(memo, value)) {
        memo.push(value);
      }
      return memo;
    }, []);
  }
});
