global.electron = require('electron')

global.app = electron.app
global.request = electron.request
global.BrowserWindow = electron.BrowserWindow
global.Menu = electron.Menu
global.Dialog = electron.dialog;

global.Fs = require('fs');
global.XLSX = require('xlsx');
global.ipc = require("electron").ipcMain;

global.utils = require('./browser/utils');
global.datapackage = require('./browser/datapackage');
global.github = require('./browser/github');
global.schema = require('./browser/schema')
global.excel = require('./browser/excel')
global.fileActions = require('./browser/file')
global.tools = require('./browser/tools')
global.validate = require('./browser/validate')

require('electron-debug')({showDevTools: true})
/*require('crash-reporter').start(
  {
    companyName: 'Open Data Institute'
  }
);*/

var template = require('./browser/menu').menu
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  utils.createWindow();
});
