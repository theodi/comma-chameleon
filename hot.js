var ipc = require('ipc');
var fs = require('fs');

var container = document.getElementById("editor");
var hot = new Handsontable(container, {
  colHeaders: true,
  rowHeaders: true,
  columnSorting: true,
  contextMenu: false
});

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  if (hot.getSelected()[0] == 0) {
    rowAbove.enabled = false
  }
  if (hot.getSelected()[1] == 0) {
    columnLeft.enabled = false
  }
  menu.popup(remote.getCurrentWindow());
  rowAbove.enabled = true
  columnLeft.enabled = true
}, false);

ipc.on('loadData', function(data) {
  csv = $.csv.toArrays(data);
  hot.loadData(csv);
  refactorColumns(csv);
});

ipc.on('saveData', function(fileName) {
  data = hot.getData().map(function(d) { return d.join(",") }).join("\n")
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
});

ipc.on('validate', function() {
  validate();
});

// How to use:
// getValidation("Example,CSV,content\na,b,c\n")
//  .then(function(validation) {console.log(validation)})

function getValidation(content) {
  request = require('request');
  content = new Buffer(content).toString("base64");
  content = "editor.csv;data:text/csv;base64," + content;
  return new Promise(function(resolve, reject) {
    request.post("http://csvlint.io/package.json", { formData: {"files_data[]": content } }, function(error, response, body) {

      if (error) return reject(error);

      var packageURL = JSON.parse(response.body).package.url;
      var interval = setInterval(function() {
        request.get(packageURL + ".json", function(error, response, body) {
          try {
            var validationURL = JSON.parse(body).package.validations[0].url;
            clearInterval(interval);
            request.get(validationURL + ".json", function(error, response, body) {
              if (error) return reject(error);
              resolve(JSON.parse(body));
            });
          } catch(e) {}
        });
      }, 1000);

    });
  });
}

// Splits validation returned from CSVLint into errors, warnings and info messages

function validate() {
  data = hot.getData().map(function(d) { return d.join(",") }).join("\r\n")
  getValidation(data).then(function(json_validation) {
    errors = json_validation.validation.errors
    warnings = json_validation.validation.warnings
    info_messages = json_validation.validation.info
    console.error(errors)
    console.warn(warnings)
    console.info(info_messages);
  });
}

function refactorColumns(csv) {
  col_add = getMaxColumns(csv) - hot.countCols()
  // adds a column by default if the amount parameter is 0, hence conditional
  if (col_add != 0) {
    hot.alter('insert_col', null, col_add)
  }
}

function getMaxColumns(csv) {
  max_columns = 0
  for (var i = 0; i < csv.length; i++) {
    col_length = csv[i].length
    if (col_length > max_columns) {
      max_columns = col_length
    }
  }
  return max_columns
}
