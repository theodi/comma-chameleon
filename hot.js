var ipc = require('ipc');
var fs = require('fs');

var container = document.getElementById("editor");
var hot = new Handsontable(container, {
  colHeaders: true,
  rowHeaders: true,
  columnSorting: true,
  contextMenu: false
});

container.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  if (hot.getSelected()[0] == 0) {
    rowAbove.enabled = false
  }
  if (hot.getSelected()[1] == 0) {
    columnLeft.enabled = false
  }
  menu.popup(remote.getCurrentWindow());
  rowAbove.enabled = true
  columnLeft.enabled = true
}, false);

ipc.on('loadData', function(data) {
  csv = $.csv.toArrays(data);
  hot.loadData(csv);
});

ipc.on('saveData', function(fileName) {
  data = hot.getData().map(function(d) { return d.join(",") }).join("\n")
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
});
