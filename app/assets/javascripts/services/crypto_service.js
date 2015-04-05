angular.module('vault').service('CryptoService', function (KeybaseLoginService) {
  var me = null;

  this.login = function (credentials) {
    return KeybaseLoginService
      .login(credentials.kbLogin, credentials.kbPassword)
      .then(function (userInfo) {
        console.log(userInfo);
        me = userInfo;
      })
  }

  this.requestHeaders = function () {
    return {
      'X-Kb-Login': kbLogin(),
      'X-Kb-Signature': requestSignature()
    }
  }

  this.me = function() {
    return me;
  }

  /* PRIVATE */

  kbLogin = function () {
    return me && me.basics.username;
  }

  requestSignature = function () {
    // TODO: this is  CSRF_TOKEN -> PGP -> BASE64
    // it's lifetime is 10 minutes, should be re-generated often
    return 'LS0tLS1CRUdJTiBQR1AgU0lHTkVEIE1FU1NBR0UtLS0tLQpIYXNoOiBTSEE1MTIKCjEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5egotLS0tLUJFR0lOIFBHUCBTSUdOQVRVUkUtLS0tLQpWZXJzaW9uOiBLZXliYXNlIE9wZW5QR1AgdjIuMC44CkNvbW1lbnQ6IGh0dHBzOi8va2V5YmFzZS5pby9jcnlwdG8KCndzQmNCQUFCQ2dBR0JRSlZGdlFOQUFvSkVPbmJLclBBckVxWVRiZ0gvUlNzUW5WQ0dEQWkvSW1vYjFkQ3M2MWEKazJUSDBWSHdhOHFjbm00d1pSZ2FiOWh6UmhBL3R1UHFUUHRNTmYwT28wNGhCU1dxbzRML0lVbUorOVdac211awpPZ0JscU5aaHo1UU80VzNMVmV3M2JKUGRZKy9iVE5sd090ZFJZMDZNWU10MWJyYWs0MHNtZGg1NitkVG9HdEM0CnlBYlpxdjRsRTVGRTgrSW9zRzZVZWNxVHloYmNmZ3ljTnZVU2JyV3JsRGNPQ0M0N1h5U0x2VkpXb21RQnRKRFQKNUVMN3FxUk15Vk5NMWtBS01UeFEwSCtkWkJpaE9reXlZakdObVJsT2JETW9vNjk1bW16V3lDTXZvZlpETXAvTwpaNTZRazB0OHlEU0JOOWxBamJodVVmUGl6WnRYQTkyNkFSWXBKcFI5enUzT1kySnM4bC92cVdsdzNBKzU4M2s9Cj04ZzVwCi0tLS0tRU5EIFBHUCBTSUdOQVRVUkUtLS0tLQoK';
  }
});