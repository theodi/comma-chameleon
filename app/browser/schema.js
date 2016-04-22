function generateTemplate() {
  Dialog.showOpenDialog(
      { filters: [
          { name: 'json schemas', extensions: ['json'] }
      ]}, function (fileNames) {
          if (fileNames === undefined) {
              return;
          } else {
              var fileName = fileNames[0];
              Fs.readFile(fileName, 'utf-8', function (err, data) {
                  data = templateFromSchema(data);
                  utils.createWindow(data, 'Untitled.csv');
                  utils.enableSave();
              });
          }
      });
}

function templateFromSchema(schema) {
  schema = JSON.parse(schema)
  header = schema.fields.map(function(field) {
    return '"' + field.name + '"'
  })
  row = new Array(schema.fields.length)
  return header.join(',') + '\r\n' + row.join(',')
}

module.exports = {
  generateTemplate,
};

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    templateFromSchema
  }
}
