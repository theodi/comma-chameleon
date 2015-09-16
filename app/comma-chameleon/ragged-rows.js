'use strict'

  // Fills undefined cells with an empty string, keeping the table in a
  // rectangular format

//var detectRaggedRows = function(csv_array){
//    var ragged = false;
//    var cellContent = ""
//  var column_length = getMaxColumns(csv_array);
//  for (var y = 0; y < csv_array.length; y++) {
//    for (var x = 0; x < column_length; x++) {
//      cellContent = (hot.getDataAtCell(y,x);
//      if (hot.getDataAtCell(y,x) === undefined) {
//        var ragged = true;
//        if (ragged_rows == 0) {
//          userPrompt();
//        }
//        else if (ragged_rows == 1) {
//          $messagePanel.append('<p>' + fixCell(csv_array,y,x) + '<p>')
//        }
//      }
//    }
//  }
//}

//var userPrompt function(){
//  var amend = confirm("Your file has ragged rows, do you want to correct this?");
//  var ragged_rows = 0;
//  if(amend == true){
//    ragged_rows = 1
//  }
//  if(ragged_rows == 1){
//    fix();
//    updateFeedback();
//  }
//}
//
//var fix = function(){
//  csv_array[y].push("");
//}
//
//var updateFeedback = function(){
//  var $messagePanel = $('#message-panel');
//  var logMsg = "Cell (" + String.fromCharCode(97 + x).toUpperCase() + "," + (y + 1) + ") has been added to file";
//  $messagePanel.append('<p>' + logMsg + '<p>');
//}

  var amendRows = function(worksheet) {
    var $messagePanel = $('#message-panel');
    var ragged_rows = 0;
    //
    for (var y = 0; y < worksheet.length; y++) {
      for (var x = 0; x < getMaxColumns(worksheet); x++) {
        if (hot.getDataAtCell(y,x) === undefined) {
          // only triggers if a cell returns undefined
          if (ragged_rows == 0) {
            // this is a way of prompting once and then proceeding to fix every other ragged instance
            if (confirm("Your file has ragged rows, do you want to correct this?")) {
              $('#right-panel').removeClass("hidden");
              ragged_rows = 1
              $messagePanel.append('<p>' + fixCell(worksheet,y,x) + '<p>')
            }
            else {ragged_rows = -1}
          }
          else if (ragged_rows == 1) {
            $messagePanel.append('<p>' + fixCell(worksheet,y,x) + '<p>')
          }
        }
      }
    }
    updateTable(worksheet)
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