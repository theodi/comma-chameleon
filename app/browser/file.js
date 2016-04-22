function openFile() {
  Dialog.showOpenDialog({
      filters: [
        {
          name: 'csv files',
          extensions: ['csv']
        }
      ]
    },
    function(fileNames) {
      readFile(fileNames)
    }
  );
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

function readFile(fileNames) {
  if (fileNames === undefined) {
    return;
  } else {
    var fileName = fileNames[0];
    Fs.readFile(fileName, 'utf-8', function (err, data) {
        utils.createWindow(data, fileName);
        utils.enableSave();
    });
  }
}

module.exports = {
  openFile,
  saveFileAs,
  saveFile
};
