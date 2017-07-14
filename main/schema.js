function generateTemplate () {
  Dialog.showOpenDialog(
    { filters: [
          { name: 'json schemas', extensions: ['json'] }
    ]}, function (fileNames) {
    if (fileNames === undefined) {

    } else {
      var fileName = fileNames[0]
      Fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err) throw err
        data = templateFromSchema(data)
        if (data) {
          utils.createWindow(data, 'Untitled.csv')
          utils.enableSave()
        }
      })
    }
  })
}

function templateFromSchema (schema) {
  try {
    schema = JSON.parse(schema)
    var header = schema.fields.map(function (field) {
      return '"' + field.name + '"'
    })
    var row = new Array(schema.fields.length)
    return header.join(',') + '\r\n' + row.join(',')
  } catch (err) {
    Dialog.showMessageBox({
      type: 'error',
      buttons: ['OK'],
      title: 'Error parsing schema file',
      message: "Sorry, we couldn't parse your schema file.\r\nPlease check your file and try again"
    })
  }
}

module.exports = {
  generateTemplate: generateTemplate
}

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    templateFromSchema: templateFromSchema
  }
}
