

  ipc.on('ragged_rows', function() {
    csv = hot.getData();
    fixRaggedRows(csv);
  });



  // Fills undefined cells with an empty string, keeping the table in a
  // rectangular format

  function fixRaggedRows(csv_array) {
    var $messagePanel = $('#message-panel');
    ragged_rows = 0;
    //
    for (var y = 0; y < csv_array.length; y++) {
      for (var x = 0; x < getMaxColumns(csv_array); x++) {
        if (hot.getDataAtCell(y,x) === undefined) {
          if (ragged_rows == 0) {
            if (confirm("Your file has ragged rows, do you want to correct this?")) {
              $('#right-panel').removeClass("hidden")
              ragged_rows = 1
              $messagePanel.append('<p>' + fixCell(csv_array,y,x) + '<p>')
            }
            else {ragged_rows = -1}
          }
          else if (ragged_rows == 1) {
            $messagePanel.append('<p>' + fixCell(csv_array,y,x) + '<p>')
          }
        }
      }
    }
    updateTable(csv_array)
  }

  function getMaxColumns(csv_array) {
    max_columns = 0
    for (var i = 0; i < csv_array.length; i++) {
      col_length = csv_array[i].length
      if (col_length > max_columns) {
        max_columns = col_length
      }
    }
    return max_columns
  }

  function fixCell(csv_array,y,x) {
    csv_array[y].push("")
    logMsg = "Cell (" + String.fromCharCode(97 + x).toUpperCase() + "," + (y + 1) + ") has been added to file"
    console.log(logMsg)
    return logMsg
  }

  function updateTable(csv_array) {
    hot.updateSettings ({
      data: csv_array,
    });
  }

//module.exports = function(){
//
//}