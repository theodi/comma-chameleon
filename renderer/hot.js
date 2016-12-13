Handsontable = require('./../bower_components/handsontable/dist/handsontable.full.js');
var loader = require('../renderer/loader.js');

var initialise = function(container) {

  var hot = new Handsontable(container, {
    colHeaders: true,
    rowHeaders: true,
    columnSorting: true,
    contextMenu: false,
    autoRowSize: true,
    enterBeginsEditing: false,
    tabMoves: function(event) {
      var selection = hot.getSelected();
      next = hot.getCell(selection[0], selection[1] + 1)
      if (next == null) {
       hot.alter('insert_col', selection[1] + 1);
      }
      return {row: 0, col: 1}
    },
    afterInit: function() {
      loader.showLoader('Loading...');
    },
    afterLoadData: function() {
      loader.hideLoader();
    },
  });
  return hot;
};

module.exports = {
  create: initialise,
  // returns the HoT object
}
