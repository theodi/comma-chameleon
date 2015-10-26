'use strict'

  // Fills undefined cells with an empty string, keeping the table in a
  // rectangular format

  var amendRows = function(worksheet) {

    var ragged_rows = 0;
    //
    for (var y = 0; y < worksheet.length; y++) {
      for (var x = 0; x < getMaxColumns(worksheet); x++) {
        if (hot.getDataAtCell(y,x) === undefined) {
          // only triggers if a cell returns undefined
          if (ragged_rows == 0) {
            // this is a way of prompting once and then proceeding to fix every other ragged instance
            if (confirm("Your file has ragged rows, do you want to correct this?")) {

              ragged_rows = 1
              reportFix(worksheet,y,x);
              //$messagePanel.append('<p>' + fixCell(worksheet,y,x) + '<p>')
            }
            else {ragged_rows = -1}
          }
          else if (ragged_rows == 1) {
            reportFix(worksheet,y,x);
            //$messagePanel.append('<p>' + fixCell(worksheet,y,x) + '<p>')
          }
        }
      }
    }
    updateTable(worksheet)
  }

  var reportFix = function(sheet,y,x){
    //$('#right-panel').removeClass("hidden");
    //var $messagePanel = $('#message-panel');
    var messagePanel = document.getElementById('message-panel');

    //console.dir(messagePanel);
    //$messagePanel.append('<p>' + fixCell(sheet,y,x) + '<p>');
    messagePanel.innerHTML += '<p>' + fixCell(sheet,y,x) + '<p>';
  }

  function getMaxColumns(csv_array) {
    var max_columns = 0
    for (var i = 0; i < csv_array.length; i++) {
      var col_length = csv_array[i].length
      if (col_length > max_columns) {
        max_columns = col_length
      }
    }
    return max_columns
  }

  function fixCell(csv_array,y,x) {
    csv_array[y].push("")
    var logMsg = "Cell (" + String.fromCharCode(97 + x).toUpperCase() + "," + (y + 1) + ") has been added to file";
    console.log(logMsg)
    return logMsg
  }

  var updateTable = function(csv_array) {
    hot.updateSettings ({
      data: csv_array,
    });
  }

module.exports = {
  fixRaggedRows: amendRows
};
if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    maxColumns: getMaxColumns,
    fix: fixCell,
    update: updateTable
  }
}