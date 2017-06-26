/*jshint loopfunc: true */
var file_formats = require('../renderer/file-actions.js').formats;

// build 'Open..' and 'Save As..' submenus
var open_submenu = [];
var save_submenu = [];
for (var format in file_formats) {
  var open_option = {
    label: file_formats[format].label,
    click: (function(format) {
      return function() {
        fileActions.openFile(format);
      };
    }(file_formats[format])),
  };
  if (format === 'csv') {
    open_option.accelerator = 'CmdOrCtrl+O';
  }
  open_submenu.push(open_option);

  var save_option = {
    label: file_formats[format].label,
    click: (function(format) {
      return function() {
        fileActions.saveFileAs(format);
      };
    }(file_formats[format])),
  };
  if (format === 'csv') {
    save_option.accelerator = 'Shift+CmdOrCtrl+S';
  }
  save_submenu.push(save_option);
}
open_submenu.push({
  label: 'Custom',
  click: function() {
    fileActions.openCustom();
  },
});
save_submenu.push({
  label: 'Custom',
  click: function() {
    fileActions.saveAsCustom();
  },
});


exports.menu = [
  {
    label: 'Comma Chameleon',
    submenu: [
      {
        label: 'About Comma Chameleon',
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
        label: 'Hide Comma Chameleon',
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
        label: 'New from Schema...',
        click: function() { schema.generateTemplate(); }
      },
      {
        type: 'separator'
      },
      {
        label: 'Open File..',
        submenu: open_submenu,
      },
      {
        label: 'Import Excel file',
        click: function() { excel.importExcel(); }
      },
      {
        type: 'separator'
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function() { fileActions.saveFile(); },
        id: 'save'
      },
      {
        label: 'Save As..',
        submenu: save_submenu,
      },
      {
        label: 'Export as Datapackage',
        accelerator: 'CmdOrCtrl+D',
        click: function() { datapackage.exportDatapackage(); }
      },
      {
        label: 'Github',
        submenu: [
          {
            label: 'Export to Github',
            accelerator: 'CmdOrCtrl+G',
            click: function() { github.exportToGithub(); }
          },
          {
            label: 'Add file to Github',
            accelerator: 'CmdOrCtrl+Shift+G',
            click: function() { github.addFileToGithub(); }
          }
        ]
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editUndo');
        }
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editRedo');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editCut');
        }
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editCopy');
        }
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editPaste');
        }
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('editSelectAll');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Freeze/Unfreeze Rows',
          click: function(){

          }
      },
      {
        type: 'separator'
      },
      {
        label: 'Insert row above',
        accelerator: 'CmdOrCtrl+I',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertRowAbove');
        }
      },
      {
        label: 'Insert row below',
        accelerator: 'CmdOrCtrl+K',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertRowBelow');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Insert column left',
        accelerator: 'CmdOrCtrl+J',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertColumnLeft');
        }
      },
      {
        label: 'Insert column right',
        accelerator: 'CmdOrCtrl+L',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('insertColumnRight');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Remove row(s)',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('removeRows');
        }
      },
      {
        label: 'Remove column(s)',
        click: function() {
          BrowserWindow.getFocusedWindow().webContents.send('removeColumns');
        }
      },
    ]
  },
  {

    label: 'Tools',
    submenu: [
      {
        label: 'Fix Ragged Rows',
        click: function() { tools.fixRaggedRowsFile(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
      },
      {
        label: 'Generate Header',
        click: function(){ tools.generateSchemaFromHeader(); }
      },
      {
        type: 'separator'
      },
      {
        label: 'Validate',
        accelerator: 'Shift+CmdOrCtrl+V',
        click: function() { validate.validateFile(); }
      },
      {
        label: 'Validate with schema',
        click: function() { validate.validateWithSchema(); }
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
    submenu: [
      {
        label: 'Editor Keyboard Shortcuts',
        click: function() {
          help.showKeyboardHelp();
        }
      }
    ]
  }
];
