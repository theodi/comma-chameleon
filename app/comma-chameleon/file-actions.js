var fs = require('fs');
var $ = jQuery = require('./../bower_components/jquery/dist/jquery.js');
require('./../bower_components/jquery-csv/src/jquery.csv.js')

var openFile = function(hot, data) {
  var arrays = $.csv.toArrays(data);
  hot.loadData(arrays);
  return arrays
}

var saveFile = function(hot, fileName) {
  data = $.csv.fromArrays(hot.getData());
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
}

module.exports = {
  open: openFile,
  save: saveFile
}
