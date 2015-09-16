//var ipc = require('ipc');
//var fs = require('fs');
//var validationNotes = require('../validation_notes.json')
//var rows = require('../ragged-rows');
Handsontable = require('./../../bower_components/handsontable/dist/handsontable.full.js');

var initialise = function(container){

  var hot = new Handsontable(container, {
    colHeaders: true,
    rowHeaders: true,
    columnSorting: true,
    contextMenu: false
  });
  return hot;
}

module.exports = {
  create: initialise
}

