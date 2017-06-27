var Handsontable = require('./../bower_components/handsontable/dist/handsontable.full.js');
var loader = require('../renderer/loader.js');

var initialise = function(container) {

  var hot = new Handsontable(container, {
    colHeaders: true,
    rowHeaders: true,
    fixedRowsTop: 0,
    columnSorting: true,
    contextMenu: false,
    autoRowSize: true,
    enterBeginsEditing: false,
    tabMoves: function(event) {
      if (!event.shiftKey) {
        var selection = hot.getSelected();
        next = hot.getCell(selection[0], selection[1] + 1);
        if (next === undefined) {
         hot.alter('insert_col', selection[1] + 1);
        }
      }
      return {row: 0, col: 1};
    },
    afterInit: function() {
      loader.showLoader('Loading...');
    },
    afterLoadData: function() {
      loader.hideLoader();
    },
    enterMoves: function(event) {
      if (!event.shiftKey) {
        var selection = hot.getSelected();
        next = hot.getCell(selection[0] + 1, selection[1]);
        if (next === null) {
         hot.alter('insert_row', selection[0] + 1);
         return {row: 1, col: 0 - selection[1]};
       } else {
         return {row: 1, col: 0};
       }
     } else {
       return {row: 1, col: 0};
     }
    }
  });
  return hot;
};

var insertRowAbove = function(deselect) {
  hot.getActiveEditor().finishEditing(true);
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }
  var start = Math.min(range.from.row, range.to.row);
  hot.alter('insert_row', start);
  if (deselect) {
    hot.deselectCell();
  }
};

var insertRowBelow = function(deselect) {
  hot.getActiveEditor().finishEditing(true);
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }
  var end = Math.max(range.from.row, range.to.row);
  hot.alter('insert_row', (end + 1));
  if (deselect) {
    hot.deselectCell();
  }
};

var insertColumnLeft = function(deselect) {
  hot.getActiveEditor().finishEditing(true);
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }
  var start = Math.min(range.from.col, range.to.col);
  hot.alter('insert_col', start);
  if (deselect) {
    hot.deselectCell();
  }
};

var insertColumnRight = function(deselect) {
  hot.getActiveEditor().finishEditing(true);
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }
  var end = Math.max(range.from.col, range.to.col);
  hot.alter('insert_col', (end + 1));
  if (deselect) {
    hot.deselectCell();
  }
};

var removeRows = function() {
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }

  var start = Math.min(range.from.row, range.to.row);
  var end   = Math.max(range.from.row, range.to.row);

  for (var row = start; row <= end; row++) {
    // rows are re-indexed after each remove
    // so always remove 'start'
    hot.alter('remove_row', start);
  }

  hot.deselectCell();
};

var removeColumns = function() {
  var range = hot.getSelectedRange();
  if (typeof range === 'undefined') { return; }

  var start = Math.min(range.from.col, range.to.col);
  var end   = Math.max(range.from.col, range.to.col);

  for (var col = start; col <= end; col++) {
    // cols are re-indexed after each remove
    // so always remove 'start'
    hot.alter('remove_col', start);
  }

  hot.deselectCell();
};

var unfreeze = function(){
    hot.updateSettings({fixedRowsTop: 0});
    hot.render();
};

var freezeRows = function(){
    var selected = hot.getSelected(); // get the selected row
    console.log(selected);
    if(selected[3]+1 === hot.countCols()){
      // clunky but functional workaround to 0 indexed array and sum comparison
        hot.updateSettings({fixedRowsTop: selected[0]});
        // TODO some color coding too, not straightFWD
        hot.render();
        hot.deselectCell();

    } else {
        window.alert("you have selected an invalid range, please select an entire single row");
    }
    hot.deselectCell();
};

module.exports = {
  insertRowAbove: insertRowAbove,
  insertRowBelow: insertRowBelow,
  insertColumnLeft: insertColumnLeft,
  insertColumnRight: insertColumnRight,
  removeRows: removeRows,
  removeColumns: removeColumns,
  freezeRows: freezeRows,
  unfreeze: unfreeze,
  create: initialise,
  // returns the HoT object
};
