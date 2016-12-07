const {remote} = require('electron');
const {Menu, MenuItem} = remote;

var menu = new Menu();

var rowAbove = new MenuItem({
  label: 'Insert row above',
  click: function() {
    var range = hot.getSelectedRange();
    var start = Math.min(range.from.row, range.to.row);
    hot.alter('insert_row', start);
    hot.deselectCell();
  }
});

var rowBelow = new MenuItem({
  label: 'Insert row below',
  click: function() {
    var range = hot.getSelectedRange();
    var end = Math.max(range.from.row, range.to.row);
    hot.alter('insert_row', (end + 1));
    hot.deselectCell();
  }
});

var columnLeft = new MenuItem({
  label: 'Insert column left',
  click: function() {
    var range = hot.getSelectedRange();
    var start = Math.min(range.from.col, range.to.col);
    hot.alter('insert_col', start);
    hot.deselectCell();
  }
});

var columnRight = new MenuItem({
  label: 'Insert column right',
  click: function() {
    var range = hot.getSelectedRange();
    var end = Math.max(range.from.col, range.to.col);
    hot.alter('insert_col', (end + 1));
    hot.deselectCell();
  }
});

var removeRow = new MenuItem({
  label: 'Remove row(s)',
  click: function() {
    var range = hot.getSelectedRange();

    var start = Math.min(range.from.row, range.to.row);
    var end   = Math.max(range.from.row, range.to.row);

    for (var row = start; row <= end; row++) {
      // rows are re-indexed after each remove
      // so always remove 'start'
      hot.alter('remove_row', start);
    }

    hot.deselectCell();
  }
});

var removeCol = new MenuItem({
  label: 'Remove column(s)',
  click: function() {
    var range = hot.getSelectedRange();

    var start = Math.min(range.from.col, range.to.col);
    var end   = Math.max(range.from.col, range.to.col);

    for (var col = start; col <= end; col++) {
      // cols are re-indexed after each remove
      // so always remove 'start'
      hot.alter('remove_col', start);
    }

    hot.deselectCell();
  }
});

menu.append(rowAbove);
menu.append(rowBelow);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(columnLeft);
menu.append(columnRight);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(removeRow);
menu.append(removeCol);
