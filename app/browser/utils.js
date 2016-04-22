function createWindow(data, title) {
  data = typeof data !== 'undefined' ? data : '"","",""';
  title = typeof title !== 'undefined' ? title : "Untitled.csv";

  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadUrl('file://' + __dirname + '/../comma-chameleon/views/index.html');

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle(title);
    mainWindow.webContents.send('loadData', data);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('resize', function() {
    mainWindow.webContents.send('resized');
  })
}

function enableSave() {
  item = Menu.getApplicationMenu().items[1].submenu.items[5]
  item.enabled = true
}

module.exports = {
  createWindow,
  enableSave
};
