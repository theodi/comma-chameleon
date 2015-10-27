Handsontable = require('./../bower_components/handsontable/dist/handsontable.full.js');

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
  create: initialise,
  // returns the HoT object
}

