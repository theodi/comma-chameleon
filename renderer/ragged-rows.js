'use strict'

  // Fills undefined cells with an empty string, keeping the table in a
  // rectangular format

var amendRows = function (worksheet, autoConfirm) {
  autoConfirm = typeof autoConfirm !== 'undefined' ? autoConfirm : false

  var raggedRows = 0
  var maxColumns = getMaxColumns(worksheet)
    //
  for (var y = 0; y < worksheet.length; y++) {
    for (var x = 0; x < maxColumns; x++) {
      if (hot.getDataAtCell(y, x) === undefined) {
          // only triggers if a cell returns undefined
        if (raggedRows === 0) {
            // this is a way of prompting once and then proceeding to fix every other ragged instance
          if (autoConfirm === true || window.confirm('Your file has ragged rows, do you want to correct this?')) {
            raggedRows = 1
            reportFix(worksheet, y, x)
          } else {
            raggedRows = -1
          }
        } else if (raggedRows === 1) {
          reportFix(worksheet, y, x)
        }
      }
    }
  }
  updateTable(worksheet)
}

var reportFix = function (sheet, y, x) {
  document.querySelector('#right-panel').classList.remove('hidden')

  var messagePanel = document.getElementById('message-panel')
  messagePanel.innerHTML += '<p>' + fixCell(sheet, y, x) + '<p>'
}

function getMaxColumns (csvArray) {
  var maxColumns = 0
  for (var i = 0; i < csvArray.length; i++) {
    var colLength = csvArray[i].length
    if (colLength > maxColumns) {
      maxColumns = colLength
    }
  }
  return maxColumns
}

function fixCell (csvArray, y, x) {
  csvArray[y].push('')
  var logMsg = 'Cell (' + String.fromCharCode(97 + x).toUpperCase() + ',' + (y + 1) + ') has been added to file'
  console.log(logMsg)
  return logMsg
}

var updateTable = function (csvArray) {
  hot.updateSettings({
    data: csvArray
  })
}

module.exports = {
  fixRaggedRows: amendRows
}
if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    maxColumns: getMaxColumns,
    fix: fixCell,
    update: updateTable
  }
}
