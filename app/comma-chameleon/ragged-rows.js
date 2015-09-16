'use strict'

ipc.on('ragged_rows', function() {
  csv = hot.getData();
  //var confirmation = confirmRaggedRows(csv);
  //if(confirmation["ragged"] && prompt()){
  //  //fixRaggedRows();
  //}
  //console.log(confirmation["ragged"]);
  //console.log(confirmRaggedRows(csv)["ragged"]);
  //if(confirmRaggedRows(csv)["ragged"] && prompt()){
  //  console.log("conulted baybee");
  //}
  //console.log(Object.getOwnPropertyNames(confirmRaggedRows(csv)));
  fixRaggedRows(csv);
});

// Fills undefined cells with an empty string, keeping the table in a
// rectangular format

//function gogo(){
//  if(confirmRaggedRows(csv))
//}

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

function prompt_consent(){
  return confirm("Your file has ragged rows, do you want to correct this?");
}

function fixRaggedRows(csv_sheet, kwa) {
  var $messagePanel = $('#message-panel');
  var ragged_rows = 0;
  var y = kwa === undefined ? 0 : kwa;
  // eval to left of colon if true and right of colon if false

  for (y; y < csv_sheet.length; y++) {
    for (var x = 0; x < getMaxColumns(csv_sheet); x++) {
      if (hot.getDataAtCell(y,x) === undefined) {
        $('#right-panel').removeClass("hidden");
        $messagePanel.append('<p>' + fixCell(csv_sheet,y,x) + '<p>')
      }
    }
  }

  updateTable(csv_sheet);
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
  var logMsg = "Cell (" + String.fromCharCode(97 + x).toUpperCase() + "," + (y + 1) + ") has been added to file"
  //console.log(logMsg)
  return logMsg
}

function updateTable(csv_array) {
  hot.updateSettings ({
    data: csv_array,
  });
}
