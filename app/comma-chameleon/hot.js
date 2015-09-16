var ipc = require('ipc');
var fs = require('fs');
var validationNotes = require('../validation_notes.json')

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
  try {
    csv = $.csv.toArrays(data);
    hot.loadData(csv);
    var proceed = confirmRaggedRows(csv) === undefined ? false : confirmRaggedRows(csv); // assign to false for when window opens or dud file loads
    if(proceed["ragged"] && prompt_consent()){fixRaggedRows(csv, proceed["resume"]);}
  } catch(e) {
    alert('An error has occurred: '+e.message)
  }
});

ipc.on('saveData', function(fileName) {
  data = $.csv.fromArrays(hot.getData());
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
});

ipc.on('getCSV', function() {
  data = $.csv.fromArrays(hot.getData());
  ipc.send('sendCSV', data);
})
