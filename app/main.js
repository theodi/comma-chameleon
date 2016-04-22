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
  var template = [
    {
      label: 'Electron',
      submenu: [
        {
          label: 'About Electron',
          selector: 'orderFrontStandardAboutPanel:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Electron',
          accelerator: 'CmdOrCtrl+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'CmdOrCtrl+Shift+H',
          selector: 'hideOtherApplications:'
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          selector: 'terminate:'
        },
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: function() { utils.createWindow(); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Open..',
          accelerator: 'CmdOrCtrl+O',
          click: function() { file.openFile(); }
        },
        {
          label: 'Import Excel file',
          accelerator: 'CmdOrCtrl+I',
          click: function() { excel.importExcel(); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: function() { file.saveFile(); },
          enabled: false,
          id: 'save'
        },
        {
          label: 'Save As..',
          accelerator: 'Shift+CmdOrCtrl+S',
          click: function() { file.saveFileAs(); }
        },
        {
          label: 'Export as Datapackage',
          accelerator: 'CmdOrCtrl+D',
          click: function() { datapackage.exportDatapackage(); }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:'
        }
      ]
    },
    {

      label: 'Tools',
      submenu: [
        {
          label: 'Validate',
          accelerator: 'Shift+CmdOrCtrl+V',
          click: function() { validateFile(); }
        },
        {
          label: 'Fix Ragged Rows',
          click: function() { fixRaggedRowsFile(); }
        },
        {
          label: 'Generate template from Schema...',
          click: function() { schema.generateTemplate(); }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+CmdOrCtrl+I',
          click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
        },
        {
          label: 'Generate Header',
          click: function(){ generateSchemaFromHeader(); }
        }
      ]
    },

    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        }
      ]
    },
    {
      label: 'Help',
      submenu: []
    }
  ];

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create the browser window.
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
