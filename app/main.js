global.app = require('app');  // Module to control application life.
global.request = require('request');
global.BrowserWindow = require('browser-window');  // Module to create native browser window.
global.Menu = require('menu');
global.Dialog = require('dialog');
global.Fs = require('fs');
global.XLSX = require('xlsx');
global.ipc = require('ipc');
global.utils = require('./browser/utils');

var datapackage = require('./browser/datapackage');
var schema = require('./browser/schema')
var excel = require('./browser/excel')
var file = require('./browser/file')

require('electron-debug')({showDevTools: true})
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var template = require('./browser/menu').menu

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  utils.createWindow();
});

// tools

function validateFile() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('validate');
}

function generateSchemaFromHeader() {
  // requires that schema.js has loaded
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('schemaFromHeaders');
}

function fixRaggedRowsFile() {
  // requires that ragged-rows.js has loaded
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('ragged_rows');
}
