function validateFile() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('validate');
}

function generateSchemaFromHeader() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('schemaFromHeaders');
}

function fixRaggedRowsFile() {
  window = BrowserWindow.getFocusedWindow();
  window.webContents.send('ragged_rows');
}

module.exports = {
  validateFile,
  generateSchemaFromHeader,
  fixRaggedRowsFile
};
