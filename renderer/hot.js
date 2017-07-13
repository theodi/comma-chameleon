var Handsontable = require('./../bower_components/handsontable/dist/handsontable.full.js')
var loader = require('../renderer/loader.js')

var initialise = function (container) {
  var hot = new Handsontable(container, {
    colHeaders: true,
    rowHeaders: true,
    columnSorting: true,
    contextMenu: false,
    autoRowSize: true,
    enterBeginsEditing: false,
    tabMoves: function (event) {
      if (!event.shiftKey) {
        var selection = hot.getSelected()
        var next = hot.getCell(selection[0], selection[1] + 1)
        if (next === undefined) {
          hot.alter('insert_col', selection[1] + 1)
        }
      }
      return {row: 0, col: 1}
    },
    afterInit: function () {
      loader.showLoader('Loading...')
    },
    afterLoadData: function () {
      loader.hideLoader()
    },
    enterMoves: function (event) {
      if (!event.shiftKey) {
        var selection = hot.getSelected()
        var next = hot.getCell(selection[0] + 1, selection[1])
        if (next === null) {
          hot.alter('insert_row', selection[0] + 1)
          return {row: 1, col: 0 - selection[1]}
        } else {
          return {row: 1, col: 0}
        }
      } else {
        return {row: 1, col: 0}
      }
    }
  })
  return hot
}

var insertRowAbove = function (deselect) {
  hot.getActiveEditor().finishEditing(true)
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }
  var start = Math.min(range.from.row, range.to.row)
  hot.alter('insert_row', start)
  if (deselect) {
    hot.deselectCell()
  }
}

var insertRowBelow = function (deselect) {
  hot.getActiveEditor().finishEditing(true)
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }
  var end = Math.max(range.from.row, range.to.row)
  hot.alter('insert_row', (end + 1))
  if (deselect) {
    hot.deselectCell()
  }
}

var insertColumnLeft = function (deselect) {
  hot.getActiveEditor().finishEditing(true)
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }
  var start = Math.min(range.from.col, range.to.col)
  hot.alter('insert_col', start)
  if (deselect) {
    hot.deselectCell()
  }
}

var insertColumnRight = function (deselect) {
  hot.getActiveEditor().finishEditing(true)
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }
  var end = Math.max(range.from.col, range.to.col)
  hot.alter('insert_col', (end + 1))
  if (deselect) {
    hot.deselectCell()
  }
}

var removeRows = function () {
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }

  var start = Math.min(range.from.row, range.to.row)
  var end = Math.max(range.from.row, range.to.row)

  for (var row = start; row <= end; row++) {
    // rows are re-indexed after each remove
    // so always remove 'start'
    hot.alter('remove_row', start)
  }

  hot.deselectCell()
}

var removeColumns = function () {
  var range = hot.getSelectedRange()
  if (typeof range === 'undefined') { return }

  var start = Math.min(range.from.col, range.to.col)
  var end = Math.max(range.from.col, range.to.col)

  for (var col = start; col <= end; col++) {
    // cols are re-indexed after each remove
    // so always remove 'start'
    hot.alter('remove_col', start)
  }

  hot.deselectCell()
}

module.exports = {
  insertRowAbove: insertRowAbove,
  insertRowBelow: insertRowBelow,
  insertColumnLeft: insertColumnLeft,
  insertColumnRight: insertColumnRight,
  removeRows: removeRows,
  removeColumns: removeColumns,
  create: initialise
  // returns the HoT object
}
