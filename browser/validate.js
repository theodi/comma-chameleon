var Fs = require('fs');
var temp = require('temp');
var exec = require('child_process').exec;
var ipc = require("electron").ipcMain;
var path = require('path')

function validateFile() {
  window = BrowserWindow.getFocusedWindow()
  window.webContents.send('fetchData')
  window.webContents.send('validationStarted')
  ipc.on('dataSent', function(e, csv) {
    file = writeTmpFile(csv)
    exec(csvlintPath() + file, function(error, stdout){
      window.webContents.send('validationResults', stdout)
    });
  })
}

function writeTmpFile(csv) {
  tmpPath = temp.path({ suffix: '.csv' })
  Fs.writeFileSync(tmpPath, csv, 'utf8');
  return tmpPath
}

function csvlintPath() {
  p = require('path').join(__dirname, '..', 'bin', 'csvlint')
  return p + ' --json '
}

module.exports = {
  validateFile
};

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    writeTmpFile,
    csvlintPath
  }
}
