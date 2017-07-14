function importExcel () {
  Dialog.showOpenDialog({ filters: [
    { name: 'text', extensions: ['xlsx', 'xls'] }
  ]}, function (fileNames) {
    if (fileNames === undefined) return
    var fileName = fileNames[0]
    var workbook = XLSX.readFile(fileName)
    var firstSheetName = workbook.SheetNames[0]
    var worksheet = workbook.Sheets[firstSheetName]

    var popup = new BrowserWindow({width: 300, height: 150})
    popup.loadURL(`file://${__dirname}/../views/select_worksheet.html`)
    popup.webContents.on('did-finish-load', function () {
      popup.webContents.send('loadSheets', workbook.SheetNames)

      ipc.once('worksheetSelected', function (e, SheetName) {
        var data = XLSX.utils.sheet_to_csv(workbook.Sheets[SheetName])
        popup.close()
        utils.createWindow(data)
      })

      ipc.once('worksheetCanceled', function () {
        popup.close()
      })
    })

    popup.on('closed', function () {
      popup = null
    })
  })
}

module.exports = {
  importExcel
}
