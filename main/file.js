function makeCustomFormat(separator, delimiter) {
  // assemble a format object describing a custom format
  return {
    label: 'Custom',
    filters: [],
    options: { separator: separator, delimiter: delimiter},
    mime_type: 'text/plain',
    default_extension: 'txt',
  };
}

function openFile(format) {
  Dialog.showOpenDialog({
      filters: format.filters
    },
    function(fileNames) {
      readFile(fileNames, format);
    }
  );
}

function openCustom() {
  var window = BrowserWindow.getFocusedWindow();
  var dialog = new BrowserWindow({width: 200, height: 400});
  dialog.once('closed', function() {
    ipc.removeAllListeners('formatSelected');
    dialog = null;
  });
  ipc.once('formatSelected', function(event, data) {
    var format = makeCustomFormat(data.separator, data.delimiter);
    openFile(format);
  });
  dialog.loadURL('file://' + __dirname + '/../views/custom_format.html');
}

function saveFileAs(format, window) {
  if (!window) {
    window = BrowserWindow.getFocusedWindow();
  }
  Dialog.showSaveDialog({ filters: format.filters }, function (fileName) {
    if (fileName === undefined) return;
    window.webContents.send('saveData', fileName, format);
    utils.enableSave();
    window.format = format;
  });
}

function saveAsCustom() {
  var window = BrowserWindow.getFocusedWindow();
  var dialog = new BrowserWindow({width: 200, height: 400});
  dialog.once('closed', function() {
    ipc.removeAllListeners('formatSelected');
    dialog = null;
  });
  ipc.once('formatSelected', function(event, data) {
    var format = makeCustomFormat(data.separator, data.delimiter);
    saveFileAs(format, window);
  });
  dialog.loadURL('file://' + __dirname + '/../views/custom_format.html');
}

function saveFile() {
  var window = BrowserWindow.getFocusedWindow();
  var fileName = window.getTitle();
  window.webContents.send('saveData', fileName, window.format);
}

function readFile(fileNames, format) {
  if (fileNames === undefined) {
    return;
  } else {
    var fileName = fileNames[0];
    Fs.readFile(fileName, 'utf-8', function (err, data) {
        utils.createWindow(data, fileName, format);
        utils.enableSave();
    });
  }
}

module.exports = {
  openFile,
  openCustom,
  readFile,
  saveFileAs,
  saveAsCustom,
  saveFile
};
