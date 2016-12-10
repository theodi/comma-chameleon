var hotController = require('../renderer/hot.js');

const {remote} = require('electron');
const {Menu, MenuItem} = remote;

var menu = new Menu();

var rowAbove = new MenuItem({
  label: 'Insert row above',
  click: function() {
    hotController.insertRowAbove();
  }
});

var rowBelow = new MenuItem({
  label: 'Insert row below',
  click: function() {
    hotController.insertRowBelow();
  }
});

var columnLeft = new MenuItem({
  label: 'Insert column left',
  click: function() {
    hotController.insertColumnLeft();
  }
});

var columnRight = new MenuItem({
  label: 'Insert column right',
  click: function() {
    hotController.insertColumnRight();
  }
});

var removeRow = new MenuItem({
  label: 'Remove row(s)',
  click: function() {
    hotController.removeRows();
  }
});

var removeCol = new MenuItem({
  label: 'Remove column(s)',
  click: function() {
    hotController.removeColumns();
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
