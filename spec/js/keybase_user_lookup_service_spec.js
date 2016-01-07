describe("KeybaseUserLookupService", function () {
  var my = setStage("KeybaseUserLookupService", "$httpBackend");

  beforeEach(function () {
    var profile = {full_name: "Vladimir Yartsev"};
    var pictures = {primary: {url: "https://s3.amazonaws.com/keybase_processed_uploads/a6c390132d03d80cd53b191d8dd35405_200_200_square_200.jpeg"}};
    my.$httpBackend.when('GET', 'https://keybase.io/_/api/1.0/user/lookup.json?fields=pictures,profile&usernames=vovayartsev')
      .respond({them: [{profile: profile, pictures: pictures}]});
  });


  describe(".prefetch", function () {
    // TODO: populate cache with multiple users' profiles
    // so that subsequent resolve() calls don't do network requests
  });

  describe(".lookup", function () {
    it("returns a future which later resolves to user's profile", function () {
      var future = my.KeybaseUserLookupService.lookup('vovayartsev');

      expect(future.kbLogin).toEqual('vovayartsev');
      expect(future.fullName).toBeUndefined();

      my.waitsForPromise(future.promise, function (value, error) {
        expect(error).toBeUndefined();
        expect(future.kbLogin).toEqual('vovayartsev');
        expect(future.fullName).toEqual('Vladimir Yartsev');
        expect(future.avatarUrl).toBeDefined();
      });

      my.$httpBackend.flush();
    });
  });

});