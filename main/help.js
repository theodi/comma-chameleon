global.electron = require('electron')

global.BrowserWindow = electron.BrowserWindow
global.Dialog = electron.dialog

var showKeyboardHelp = function () {
  var showKeyboardHelp = new BrowserWindow({width: 600, height: 600})
  showKeyboardHelp.loadURL('file://' + __dirname + '/../views/keyboard_help.html')

  showKeyboardHelp.on('closed', function () {
    showKeyboardHelp = null
  })
}

module.exports = {
  showKeyboardHelp: showKeyboardHelp
}
