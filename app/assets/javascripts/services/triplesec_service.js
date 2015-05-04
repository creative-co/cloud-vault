angular.module('vault').service('TriplesecService', function ($q) {
  var triplesec = kbpgp.triplesec;

  this.encrypt = function (message, passphrase) {
    return $q(function (resolve, reject) {
      triplesec.encrypt({
        data: new triplesec.Buffer(message),
        key: new triplesec.Buffer(passphrase),
      }, function (err, buf) {
        err ? reject(err) : resolve(buf.toString('base64'))
      });
    })
  }

  this.decrypt = function (base64Message, passphrase) {
    return $q(function (resolve, reject) {
      triplesec.decrypt({
        data: new triplesec.Buffer(base64Message, 'base64'),
        key: new triplesec.Buffer(passphrase),
      }, function (err, buf) {
        err ? reject(err) : resolve(buf.toString());
      });
    });
  }

  this.genpw = function () {
    return $q(function (resolve) {
      kbpgp.rand.SRF().random_nbit(1024, resolve)
    }).then(function (bigintResult) {
      return bigintResult.toString(36)
    })
  }
});