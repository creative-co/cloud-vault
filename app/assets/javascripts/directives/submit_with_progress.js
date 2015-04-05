angular.module('vault').directive('submitWithProgress', function ($parse) {
  return {
    link: function (scope, el, attrs) {
      var getter = $parse(attrs.submitWithProgress);
      el.on("submit", function () {
        el.addClass('in-progress');
        getter(scope).finally(function () {
          el.removeClass('in-progress');
        })
      })
    }
  }
});