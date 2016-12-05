function openFile(format) {
  Dialog.showOpenDialog({
      filters: format.filters
    },
    function(fileNames) {
      readFile(fileNames, format);
    }
  );
}

function saveFileAs(format) {
  window = BrowserWindow.getFocusedWindow();
  Dialog.showSaveDialog({ filters: format.filters }, function (fileName) {
    if (fileName === undefined) return;
    window.webContents.send('saveData', fileName, format);
    utils.enableSave();
    window.format = format;
  });
}

function saveFile() {
  window = BrowserWindow.getFocusedWindow();
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
  saveFileAs,
  saveFile
};
