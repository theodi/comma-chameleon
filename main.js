var app = require('app');  // Module to control application life.
var request = require('request');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var Dialog = require('dialog');
var Fs = require('fs');
var XLSX = require('xlsx');
var ipc = require('ipc');

var datapackage = require('./datapackage');

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
          click: function() { createWindow(); }
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
          label: 'Save As..',
          accelerator: 'Shift+CmdOrCtrl+S',
          click: function() { saveFile(); }
        },
        {
          label: 'Export as Datapackage',
          accelerator: 'CmdOrCtrl+D',
          click: function() { datapackage.exportDatapackage(); }
        },
        {
          label: 'Validate',
          accelerator: 'CmdOrCtrl+V',
          click: function() { validateFile(); }
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
          label: 'Generate Header',
          click: function(){ generateSchemaFromHeader(); }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function() { BrowserWindow.getFocusedWindow().reload(); }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+CmdOrCtrl+I',
          click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
        },
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
  createWindow();
});

function createWindow(data, title) {
  data = typeof data !== 'undefined' ? data : '"","",""';
  title = typeof title !== 'undefined' ? title : "Untitled.csv";

  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle(title);
    mainWindow.webContents.send('loadData', data);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function ipcTest(){
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('ipcTest');
}

function openFile() {
    Dialog.showOpenDialog(
        { filters: [
            { name: 'csv files', extensions: ['csv'] },
            { name: 'json schemas', extensions: ['json'] }
        ]}, function (fileNames) {
            if (fileNames === undefined) {
                return;
            } else {
                console.log("the file processed = "+JSON.stringify(fileNames));
                var fileName = fileNames[0];
                Fs.readFile(fileName, 'utf-8', function (err, data) {
                    createWindow(data, fileName);
                });
            }
        });
}

function saveFile() {
  window = BrowserWindow.getFocusedWindow();
  Dialog.showSaveDialog({ filters: [
    { name: 'text', extensions: ['csv'] }
  ]}, function (fileName) {
    if (fileName === undefined) return;
    window.webContents.send('saveData', fileName);
  });
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
    popup.loadUrl('file://' + __dirname + '/select_worksheet.html');

    popup.webContents.on('did-finish-load', function() {
      popup.webContents.send('loadSheets', workbook.SheetNames);

      ipc.once('worksheetSelected', function(e, sheet_name) {
        data = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name]);
        popup.close();
        createWindow(data);
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
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('schemaFromHeaders');
}
