beforeEach(function () {

  //this helper works

  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    },
    toBeInArray: function (arr) {
      return ($.inArray(this.actual, arr) > -1);
    },
    toBeAroundValue: function (val) {
      this.message = function (val) {
        return [
          "Expected " + this.actual + " to be around " + val + " (between " + (val - 1) + " and " + (val + 1) + ")",
          "Expected " + this.actual + " NOT to be around " + val + " (between " + (val - 1) + " and " + (val + 1) + ")"
        ];
      };
      return (this.actual >= val - 1 && this.actual <= val + 1);
    }
  });
});

