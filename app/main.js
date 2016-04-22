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

require('electron-debug')({showDevTools: true})

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
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
          click: function() { openFile(); }
        },
        {
          label: 'Import Excel file',
          accelerator: 'CmdOrCtrl+I',
          click: function() { importExcel(); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: function() { saveFile(); },
          enabled: false,
          id: 'save'
        },
        {
          label: 'Save As..',
          accelerator: 'Shift+CmdOrCtrl+S',
          click: function() { saveFileAs(); }
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

function openFile() {
    Dialog.showOpenDialog(
        { filters: [
            { name: 'csv files', extensions: ['csv'] },
        ]}, function (fileNames) {
            if (fileNames === undefined) {
                return;
            } else {
                console.log("the file processed = "+JSON.stringify(fileNames));
                var fileName = fileNames[0];
                Fs.readFile(fileName, 'utf-8', function (err, data) {
                    utils.createWindow(data, fileName);
                    utils.enableSave();
                });
            }
        });
}

function saveFileAs() {
  window = BrowserWindow.getFocusedWindow();
  Dialog.showSaveDialog({ filters: [
    { name: 'text', extensions: ['csv'] }
  ]}, function (fileName) {
    if (fileName === undefined) return;
    window.webContents.send('saveData', fileName);
    utils.enableSave();
  });
}

function saveFile() {
  window = BrowserWindow.getFocusedWindow();
  fileName = window.getTitle();
  window.webContents.send('saveData', fileName);
}

function importExcel() {
  Dialog.showOpenDialog({ filters: [
    { name: 'text', extensions: ['xlsx', 'xls'] }
  ]}, function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    var workbook = XLSX.readFile(fileName);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    popup = new BrowserWindow({width: 300, height: 150, 'always-on-top': true});
    popup.loadUrl('file://' + __dirname + '/comma-chameleon/views/select_worksheet.html');
    popup.webContents.on('did-finish-load', function() {
      popup.webContents.send('loadSheets', workbook.SheetNames);

      ipc.once('worksheetSelected', function(e, sheet_name) {
        data = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name]);
        popup.close();
        utils.createWindow(data);
      });

      ipc.once('worksheetCanceled', function() {
        popup.close();
      });
    });

    popup.on('closed', function() {
      popup = null;
    });
  });
}

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
