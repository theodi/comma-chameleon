var ipc = require('electron').ipcRenderer;
var fs = require('fs');

var hotController = require('../renderer/hot.js');
var schemawizard = require('../renderer/schemawizard.js');
var rows = require('../renderer/ragged-rows.js');
var validation = require('../renderer/validate.js');
var file = require('../renderer/file-actions.js');

var container = document.getElementById("editor");
var hot = hotController.create(container);

container.ondragover = function () {
  return false;
};

container.ondragleave = container.ondragend = function () {
  return false;
};

container.ondrop = function (e) {
  e.preventDefault();
  var f = e.dataTransfer.files[0];
  fs.readFile(f.path, 'utf-8', function (err, data) {
    // if we're dragging a file in, default the format to comma-separated
    arrays = file.open(hot, data, file.formats.csv.options);
    rows.fixRaggedRows(arrays);
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

ipc.on('loadData', function(e, data, format) {
  arrays = file.open(hot, data, format)
  rows.fixRaggedRows(arrays);
});

ipc.on('saveData', function(e, fileName, format) {
  file.save(hot, fileName, format);
});

ipc.on('resized', function() {
  hot.render()
});

ipc.on('getCSV', function(e, format) {
  if (typeof format === 'undefined') {
    var data = $.csv.fromArrays(hot.getData());
  } else {
    var data = $.csv.fromArrays(hot.getData(), format.options);
  }
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

ipc.on('fetchData', function() {
  console.log('recieving')
  csv = $.csv.fromArrays(hot.getData());
  console.log(csv)
  ipc.send('dataSent', csv)
})

ipc.on('validationStarted', function() {
  validation.showLoader()
})

ipc.on('validationResults', function(e, results) {
  validation.displayResults(results)
})
