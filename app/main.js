global.app = require('app');  // Module to control application life.
global.request = require('request');
global.BrowserWindow = require('browser-window');  // Module to create native browser window.
global.Menu = require('menu');
global.Dialog = require('dialog');
global.Fs = require('fs');
global.XLSX = require('xlsx');
global.ipc = require('ipc');

global.utils = require('./browser/utils');
global.datapackage = require('./browser/datapackage');
global.schema = require('./browser/schema')
global.excel = require('./browser/excel')
global.file = require('./browser/file')
global.tools = require('./browser/tools')

require('electron-debug')({showDevTools: true})
require('crash-reporter').start();

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
