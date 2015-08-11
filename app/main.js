'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

var Menu = require('menu');
var Dialog = require('dialog');
var Fs = require('fs');


var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 800,
    height: 600
});

app.on('ready', function () {

    var template = [
        {
            label: 'CSV E',
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
                    label: 'Save As..',
                    accelerator: 'Shift+CmdOrCtrl+S',
                    click: function() { saveFile(); }
                },
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
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function() { getCurrentWindow().reload(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+CmdOrCtrl+I',
                    click: function() { getCurrentWindow().toggleDevTools(); }
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

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    //mainWindow.title = title;

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    if (env.name === 'development') {
        //devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});

function createWindow(data, title) {
    data = typeof data !== 'undefined' ? data : '"","",""';
    title = typeof title !== 'undefined' ? title : "Untitled.csv";

    var newWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    newWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the devtools.
    newWindow.openDevTools();
    newWindow.title = title;

    newWindow.webContents.on('did-finish-load', function() {
        newWindow.webContents.send('loadData', data);
    });

    // Emitted when the window is closed.
    newWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        newWindow = null;
    });
}

function openFile() {
    Dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['csv'] }
    ]}, function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        Fs.readFile(fileName, 'utf-8', function (err, data) {
            createWindow(data, fileName);
        });
    });
}

function saveFile() {
    var window = BrowserWindow.getFocusedWindow();
    Dialog.showSaveDialog({ filters: [
        { name: 'text', extensions: ['csv'] }
    ]}, function (fileName) {
        if (fileName === undefined) return;
        window.webContents.send('saveData', fileName);
    });
}
