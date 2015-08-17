var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();

var rowAbove = new MenuItem({
  label: 'Insert row above',
  click: function() {
    hot.alter('insert_row', hot.getSelected()[0] - 1)
    hot.deselectCell()
  }
})

var rowBelow = new MenuItem({
  label: 'Insert row below',
  click: function() {
    hot.alter('insert_row', hot.getSelected()[0] + 1)
    hot.deselectCell()
  }
})

var columnLeft = new MenuItem({
  label: 'Insert column left',
  click: function() {
    hot.alter('insert_col', hot.getSelected()[1] - 1)
    hot.deselectCell()
  }
})

var columnRight = new MenuItem({
  label: 'Insert column right',
  click: function() {
    hot.alter('insert_col', hot.getSelected()[1] + 1)
    hot.deselectCell()
  }
})

var removeRow = new MenuItem({
  label: 'Remove entire row',
  click: function() {
    hot.alter('remove_row', hot.getSelected()[0])
    hot.deselectCell()
  }
})

var removeCol = new MenuItem({
  label: 'Remove entire column',
  click: function() {
    hot.alter('remove_col', hot.getSelected()[1])
    hot.deselectCell()
  }
})

menu.append(rowAbove);
menu.append(rowBelow);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(columnLeft);
menu.append(columnRight);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(removeRow);
menu.append(removeCol);
