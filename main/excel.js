function importExcel() {
  Dialog.showOpenDialog({ filters: [
    { name: 'text', extensions: ['xlsx', 'xls'] }
  ]}, function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    var workbook = XLSX.readFile(fileName);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    popup = new BrowserWindow({width: 300, height: 150});
    popup.loadURL('file://' + __dirname + '/../views/select_worksheet.html');
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

module.exports = {
  importExcel
};
