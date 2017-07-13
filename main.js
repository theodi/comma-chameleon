global.electron = require('electron')

global.app = electron.app
global.request = electron.request
global.BrowserWindow = electron.BrowserWindow
global.Menu = electron.Menu
global.Dialog = electron.dialog

global.Fs = require('fs')
global.XLSX = require('xlsx')
global.ipc = require('electron').ipcMain

global.utils = require('./main/utils')
global.datapackage = require('./main/datapackage')
global.github = require('./main/github')
global.schema = require('./main/schema')
global.excel = require('./main/excel')
global.fileActions = require('./main/file')
global.tools = require('./main/tools')
global.validate = require('./main/validate')
global.help = require('./main/help')

require('electron-debug')({showDevTools: true})
/* require('crash-reporter').start(
  {
    companyName: 'Open Data Institute'
  }
); */

var template = require('./main/menu').menu
var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  filename = null
  if (process.env.NODE_ENV === 'development') {
    if (process.argv[2] && process.argv[2][0] !== '-') {
      filename = process.argv[2]
    }
  } else {
    if (process.argv[1] && process.argv[1][0] !== '-') {
      filename = process.argv[1]
    }
  }

  if (filename) {
    fileActions.readFile([filename])
  } else {
    utils.createWindow()
  }
})
