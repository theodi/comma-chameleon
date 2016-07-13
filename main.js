global.electron = require('electron')

global.app = electron.app
global.request = electron.request
global.BrowserWindow = electron.BrowserWindow
global.Menu = electron.Menu
global.Dialog = electron.dialog;

global.Fs = require('fs');
global.XLSX = require('xlsx');
global.ipc = require("electron").ipcMain;

global.utils = require('./main/utils');
global.datapackage = require('./main/datapackage');
global.github = require('./main/github');
global.schema = require('./main/schema')
global.excel = require('./main/excel')
global.fileActions = require('./main/file')
global.tools = require('./main/tools')
global.validate = require('./main/validate')

require('electron-debug')({showDevTools: true})
/*require('crash-reporter').start(
  {
    companyName: 'Open Data Institute'
  }
);*/

var template = require('./main/menu').menu
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
