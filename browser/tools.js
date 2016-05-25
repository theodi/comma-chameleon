function generateSchemaFromHeader() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('schemaFromHeaders');
}

function fixRaggedRowsFile() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('ragged_rows');
}

module.exports = {
  generateSchemaFromHeader,
  fixRaggedRowsFile
};
