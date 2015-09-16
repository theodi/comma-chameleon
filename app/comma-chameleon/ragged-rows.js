'use strict'

ipc.on('ragged_rows', function() {
  csv = hot.getData();
  fixRaggedRows(csv);
});

// Fills undefined cells with an empty string, keeping the table in a
// rectangular format

function confirmRaggedRows(csv_sheet){
  var ragged_rows = false;
  var resume = 0;
  for (var y = 0; y < csv_sheet.length; y++) {
    for (var x = 0; x < getMaxColumns(csv_sheet); x++) {
      if (hot.getDataAtCell(y,x) === undefined) {
        ragged_rows = true;
        resume = y;
        return({ragged: ragged_rows, resume: y});
      }
    }
  }
}

function fixRaggedRows(csv_sheet, row) {
  var $messagePanel = $('#message-panel');
  var ragged_rows = 0;
  var y = row === undefined ? 0 : row;
  // eval to left of colon if true and right of colon if false

  for (y; y < csv_sheet.length; y++) {
    for (var x = 0; x < getMaxColumns(csv_sheet); x++) {
      if (hot.getDataAtCell(y,x) === undefined) {
        fixCell(csv_sheet,y,x);
        var amendment = logChanges(x,y);
        $('#right-panel').removeClass("hidden");
        $messagePanel.append('<p>' + amendment + '<p>')
      }
    }
  }
  updateTable(csv_sheet);
}

function getMaxColumns(csv_array) {
  var max_columns = 0
  for (var i = 0; i < csv_array.length; i++) {
    var col_length = csv_array[i].length;
    if (col_length > max_columns) {
      max_columns = col_length
    }
  }
  return max_columns
}

function fixCell(csv_array,row) {
  csv_array[row].push("")
}

function logChanges(col,row){
  var logMsg = "Cell (" + String.fromCharCode(97 + col).toUpperCase() + "," + (row + 1) + ") has been added to file"
  return logMsg
}

function updateTable(csv_array) {
  hot.updateSettings ({
    data: csv_array
  });
}
