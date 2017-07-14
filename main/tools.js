function generateSchemaFromHeader () {
  var window = BrowserWindow.getFocusedWindow()
  window.webContents.send('schemaFromHeaders')
}

function fixRaggedRowsFile () {
  var window = BrowserWindow.getFocusedWindow()
  window.webContents.send('ragged_rows')
}

module.exports = {
  generateSchemaFromHeader,
  fixRaggedRowsFile
}
