const fs = require('fs');
const $ = jQuery = require('./../bower_components/jquery/dist/jquery.js');
require('./../bower_components/jquery-csv/src/jquery.csv.js')

var formats = {
  csv: {
    label: 'Comma separated',
    filters: [
      { name: 'csv files', extensions: ['csv'] }
    ],
    options: { separator: ',', delimiter: '"'}
  },
  tsv: {
    label: 'Tab separated',
    filters: [
      { name: 'tsv files', extensions: ['tsv'] },
      { name: 'txt files', extensions: ['txt'] },
      { name: 'dat files', extensions: ['dat'] },
    ],
    options: { separator: "\t", delimiter: '"'}
  },
  semicolon: {
    label: 'Semicolon separated',
    filters: [
      { name: 'csv files', extensions: ['csv'] }
    ],
    options: { separator: ';', delimiter: '"'}
  },
  //.. + we can add more
}

var openFile = function(hot, data, format) {
  // if function is called without a format param
  // jquery-csv will assume default delimiter/separator values
  var arrays = $.csv.toArrays(data, format);
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
  formats: formats,
  open: openFile,
  save: saveFile
}
