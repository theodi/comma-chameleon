/**
 * Created by stephenfortune on 15/09/15.
 */
'require strict';

var ipc = require('ipc');
var fs = require('fs');
var hotController = require('../hot.js');
var schemawizard = require('../schemawizard.js');
var rows = require('../ragged-rows');
var validation = require('../validate');

var container = document.getElementById("editor");
var hot = hotController.create(container);

function openFile(data) {
  try {
    csv = $.csv.toArrays(data);
    hot.loadData(csv);
    rows.fixRaggedRows(csv);
  } catch(e) {
    alert('An error has occurred: '+e.message)
  }
}

container.ondragover = function () {
  return false;
};

container.ondragleave = container.ondragend = function () {
  return false;
};

container.ondrop = function (e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  console.log('File you dragged here is', file.path);
  fs.readFile(file.path, 'utf-8', function (err, data) {
    openFile(data)
  });
};

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

// runtime renderer call & response

ipc.on('loadData', function(data) {
  openFile(data)
});

ipc.on('saveData', function(fileName) {
  data = $.csv.fromArrays(hot.getData());
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
});

ipc.on('resized', function() {
  hot.render()
});

ipc.on('getCSV', function() {
  data = $.csv.fromArrays(hot.getData());
  ipc.send('sendCSV', data);
})

ipc.on('validate', function() {
  var data = $.csv.fromArrays(hot.getData());
  validation.validate(data);
});

ipc.on('schemaFromHeaders', function(){
  try {
    var assumedHeader = hot.getData()[0];
    var header = schemawizard.returnHeaderRow(assumedHeader);
    //console.log(header);
    ipc.send('jsonHeaders',schemawizard.createSchema(header));
    schemawizard.createSchema(header);
  } catch (err) {
    console.log("attempting to get the first row has failed");
    console.log(err);
  }
});

ipc.on('ragged_rows', function() {
  csv = hot.getData();
  console.log(typeof rows);
  console.log(typeof csv);
  rows.fixRaggedRows(csv);
});
