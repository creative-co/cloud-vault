describe("CodecService", function () {
  var my = setStage("CodecService", "ProjectionFactory");

  describe(".encrypt", function () {
    it("returns an encrypted projection", function () {
      var projection = my.ProjectionFactory(FIXTURES.demo_projection);

      var promise = my.initKeyManager()
        .then(function () {
          return my.CodecService.encrypt(projection)
        });

      my.waitsForPromise(promise, function (value, error) {
        expect(error).toBeUndefined();
        expect(value.encryptedContent.length).toBeGreaterThan(100);
      })
    });
  });

});