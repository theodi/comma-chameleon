var Fs = require('fs')
var temp = require('temp')
var exec = require('child_process').exec
var ipc = require('electron').ipcMain
var path = require('path')

function validateWithSchema () {
  var window = BrowserWindow.getFocusedWindow()
  Dialog.showOpenDialog(
    { filters: [
          { name: 'json schemas', extensions: ['json'] }
    ]}, function (fileNames) {
    if (fileNames === undefined) {

    } else {
      var fileName = fileNames[0]
      validateFile(fileName, window)
    }
  })
}

function validateFile (schema, window) {
  if (window === undefined) {
    window = BrowserWindow.getFocusedWindow()
  }
  window.webContents.send('fetchData')
  window.webContents.send('validationStarted')
  ipc.once('dataSent', function (e, csv) {
    var file = writeTmpFile(csv)
    exec(csvlintPath(schema) + file, function (error, stdout) {
      if (error) throw error
      window.webContents.send('validationResults', stdout)
    })
  })
}

function writeTmpFile (csv) {
  var tmpPath = temp.path({ suffix: '.csv' })
  Fs.writeFileSync(tmpPath, csv, 'utf8')
  return tmpPath
}

function csvlintPath (schema) {
  var p = require('path').join(__dirname, '..', 'bin', 'csvlint')
  if (schema !== undefined) {
    p += ' --schema=' + schema
  }
  return p + ' --json '
}

module.exports = {
  validateFile,
  validateWithSchema
}

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    writeTmpFile,
    csvlintPath
  }
}
