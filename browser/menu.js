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
        type: 'separator'
      },
      {
        label: 'Open..',
        accelerator: 'CmdOrCtrl+O',
        click: function() { fileActions.openFile(); }
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
        click: function() { fileActions.saveFile(); },
        enabled: false,
        id: 'save'
      },
      {
        label: 'Save As..',
        accelerator: 'Shift+CmdOrCtrl+S',
        click: function() { fileActions.saveFileAs(); }
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
        click: function() { tools.validateFile(); }
      },
      {
        label: 'Fix Ragged Rows',
        click: function() { tools.fixRaggedRowsFile(); }
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
        click: function(){ tools.generateSchemaFromHeader(); }
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
