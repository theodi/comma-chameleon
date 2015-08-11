describe("open file", function() {

  var Fs = require('fs');

  // Suggest two tests for open file - dialog test and, uploaded file to contents of table?

  it("should be able to open a file from a dialog", function() {
    var mockDialog = jasmine.createSpy('dialog');
    // mock $ to return {dialog: mock that return {dialog: mockDialog}}
    var mock$ = spyOn(window, '$').andReturn({
      dialog:jasmine.createSpy('$').andReturn({
        dialog: mockDialog
      })
    })

    openFile()

    //demonstrates use of custom matcher
    expect(hot.getSettings()).toEqual(csv);
  });

  it("should open the file asynchronously", function() {

  }

  it("should be able to match the contents of the file and the table", function() {

  }

}
