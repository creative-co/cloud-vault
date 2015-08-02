describe("CodecService", function () {
  var my = setStage("CodecService", "ProjectionFactory");

  describe(".encrypt", function () {
    it("returns an encrypted projection", function () {
      var projection = my.ProjectionFactory(FIXTURES.demo_projection);

      var promise = my.initKeyManager()
        .then(function () {
          return my.CodecService.encrypt(projection)
        })
        .catch(function(x) {
          console.log('ERROR', x);
        })

      my.waitsForPromise(promise, function (value, error) {
        expect(error).toBeUndefined();
        expect(value.encrypted_content.length).toBeGreaterThan(100);
        expect(value.signed_team.length).toBeGreaterThan(100);
      })
    });
  });

});