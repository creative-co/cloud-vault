describe("Key manager", function () {
  var my = setStage("KeyManagerService");

  describe(".pgpEncryptForKey", function () {
    it("returns an encrypted string", function () {
      var promise = my.KeyManagerService.pgpEncryptForKey("Hello World", FIXTURES.demo_public_key);
      my.waitsForPromise(promise, function (value, error) {
        expect(error).toBeUndefined();
        expect(value.length).toBeGreaterThan(100);
      })
    });
  });

  describe(".pgpEncryptForMyself --> .pgpDecrypt", function () {
    it("returns the original string", function () {
      var promise = my.KeyManagerService.loadPublicKey(FIXTURES.demo_public_key)
        .then(function () {
          return my.KeyManagerService.mergePgpPrivate(FIXTURES.demo_private_key);
        })
        .then(function () {
          return my.KeyManagerService.pgpEncryptForMyself("Hello World");
        })
        .then(function (encrypted) {
          return my.KeyManagerService.pgpDecrypt(encrypted);
        });

      my.waitsForPromise(promise, function (value, error) {
        expect(error).toBeUndefined();
        expect(value).toBe("Hello World")
      })
    });
  });

});