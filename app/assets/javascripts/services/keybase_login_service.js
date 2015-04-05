angular.module('vault').service('KeybaseLoginService', function ($q, $http) {

  this.login = function (kbLogin, kbPassword) {
    return getSalt(kbLogin)
      .then(prepareEncryptor(kbLogin, kbPassword))
      .then(doLogin)
      .then(extractMe)
  }

  /* PRIVATE */

  //var LOGIN_URL = "https://keybase.io/_/api/1.0/login.json";
  var LOGIN_URL = "/keybase_proxy/login.json";
  //var GETSALT_URL = "https://keybase.io/_/api/1.0/getsalt.json";
  var GETSALT_URL = "/keybase_proxy/getsalt.json";

  function prepareEncryptor(kbLogin, kbPassword) {
    return function doCrypto(salt_response) {
      var pwh = doScrypt(kbPassword, salt_response.salt)
      var hmac_pwh = doHmac(pwh, salt_response.login_session)
      return {
        email_or_username: kbLogin,
        login_session: salt_response.login_session,
        hmac_pwh: hmac_pwh
      };
    }
  }

  function toPromise(httpResult) {
    return $q(function (resolve, reject) {
      httpResult.success(function (response) {
        if (response.status.code == 0) {
          resolve(response);
        } else {
          reject(response);
        }
      }).error(reject)
    })
  }

  function extractMe(response) {
    return response.me;
  }

  function getSalt(kbLogin) {
    return toPromise($http.post(GETSALT_URL, {kb: {email_or_username: kbLogin}}))
  }

  function doLogin(params) {
    return toPromise($http.post(LOGIN_URL, {kb: params}));
  }

  // see https://keybase.io/docs/api/1.0/call/login
  function doScrypt(pw, salt) {
    var scrypt = scrypt_module_factory(41943040);  // 40 MB
    var p = scrypt.encode_utf8(pw);
    var s = hex2bin(salt);
    var arr = scrypt.crypto_scrypt(p, s, 32768, 8, 1, 224);
    return bin2hex(arr.subarray(192));
  }

  function doHmac(key, text) { // key is pwh, UInt8Array
    var shaObj = new jsSHA(text, 'B64');
    return shaObj.getHMAC(key, 'HEX', "SHA-512", "HEX");
  }

  function hex2bin(str) {
    var result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));
      str = str.substring(2, str.length);
    }
    return result;
  }

  function bin2hex(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      str += ((arr[i] < 16) ? "0" : "") + arr[i].toString(16);
    }
    return str;
  }
});