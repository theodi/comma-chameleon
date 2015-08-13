var BrowserWindow = require('browser-window');
var Dialog = require('dialog');
var Fs = require('fs');
var ipc = require('ipc');

var exports = module.exports = {};

exports.exportDatapackage = function() {
  var window = BrowserWindow.getFocusedWindow();

  datapackage = new BrowserWindow({width: 450, height: 600, 'always-on-top': true});
  datapackage.loadUrl('file://' + __dirname + '/datapackage.html');

  datapackage.on('closed', function() {
    datapackage = null;
  });

  ipc.once('sendDatapackage', function(e, data) {
    var data = datapackageJson(data)

    Dialog.showSaveDialog({
      filters: [
        { name: 'text', extensions: ['zip'] }
      ],
      defaultPath: 'datapackage.zip'
    }, function (fileName) {
      if (fileName === undefined) return;
      datapackage.close();
      window.webContents.send('getCSV');

      ipc.once('sendCSV', function(e, csv) {
        generateDatapackage(fileName, data, csv)
      });
    });
  });

  ipc.once('datapackageCanceled', function() {
    datapackage.close();
  });
}

function datapackageJson(data) {
  //debugger
  data.keywords = data.keywords.split(",")
  data.resources = [
    {
      "name": data.name,
      "path": "data/" + data.name + ".csv",
      "mediatype": "text/csv"
    }
  ]
  return data
}

function generateDatapackage(fileName, data, csv) {
  zip = new require('node-zip')();
  zip.file('datapackage.json', JSON.stringify(data,null, 4));
  zip.file('data/' + data.name + '.csv', csv);
  zipData = zip.generate({base64:false,compression:'DEFLATE'});
  Fs.writeFileSync(fileName, zipData, 'binary');
}
