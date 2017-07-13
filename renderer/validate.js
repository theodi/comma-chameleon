'use strict'
var Handsontable = require('./../bower_components/handsontable/dist/handsontable.full.js')
var $ = require('./../bower_components/jquery/dist/jquery.js')
var _ = require('./../bower_components/lodash/lodash.js')
var validationNotes = require('./validation_notes.json')

var colors = {
  error: 'rgba(255, 76, 66, 0.6)',
  warning: 'rgba(255, 152, 66, 0.6)',
  info: 'rgba(99, 149, 215, 0.6)'
}

var displayResults = function (results) {
  displayValidationMessages(JSON.parse(results).validation)
  highlightCells()
}

var displayValidationMessages = function (validation) {
  var $messagePanel = $('#message-panel')
  $messagePanel.html("<h4>Validation results <img src='../assets/img/" + validation.state + ".svg' /></h4>")
  var resultsTemplate = _.template('<p><%= validation.errors.length %> errors and <%= validation.warnings.length %> warnings. Click on an error message to see where the error occurred:</p>')
  var messages = _.flatten([
    _.map(validation.errors, function (d) { return _.extend({}, d, { msg_type: 'error' }) }),
    _.map(validation.warnings, function (d) { return _.extend({}, d, { msg_type: 'warning' }) })
  ])
  if (messages.length > 0) {
    $messagePanel.append(resultsTemplate({'validation': validation}))
    var elements = _.map(messages, function (message) {
      return $(messageTemplate(message)).data(message)
        .addClass('message')
        .addClass('validation-' + message.msg_type)
    })
    $messagePanel.append(elements)
  } else {
    $messagePanel.append('<p>Congratulations! Your CSV appears to be valid.</p>')
  }
}

var highlightCells = function () {
  clearHighlights()

  $('#message-panel').on('click', '.message', function () {
    highlightCell($(this).data())
  })
}

var highlightCell = function (d) {
  scrollToCell(d.row, d.col)
  hot.updateSettings({
    // set the new renderer for every cell
    cells: function (row, col, prop) {
      if (d.row && d.col) {
        if (row === d.row - 1 && col === d.col - 1) {
          return { renderer: bgColorRenderer(colors[d.msg_type]) }
        }
      } else {
        if (row === d.row - 1 || col === d.col - 1) {
          return { renderer: bgColorRenderer(colors[d.msg_type]) }
        }
      }
      return {}
    }
  })
}

var scrollToCell = function (row, col) {
  if (row === null && col === null) return
  row = row || 1
  col = col || 1
  hot.selectCell(row - 1, col - 1)
  hot.deselectCell()
}

var clearHighlights = function () {
  hot.updateSettings({
    cells: null
  })
}

var bgColorRenderer = function (color) {
  return function errorRenderer (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
    td.style.background = color
  }
}

var messageTemplate = _.template('<div><h5><%= errorText(data) %></h5><p><%= errorGuidance(data) %></p></div>', {
  imports: {
    errorText: function (data) {
      return validationNotes.errors[data.type]
    },
    errorGuidance: function (data) {
      var guidance = validationNotes.errors[data.type + '_guidance_html']
      var guidance_template = _.template(guidance)
      data.column = numToCol(data.col)
      return guidance_template(data)
    },
    numToCol: numToCol
  },
  variable: 'data'
})

var numToCol = function (number) {
  var numeric = (number - 1) % 26
  var letter = chr(65 + numeric)
  var number2 = parseInt((number - 1) / 26)
  if (number2 > 0) {
    return numToCol(number2) + letter
  } else {
    return letter
  }
}

var chr = function (codePt) {
  if (codePt > 0xFFFF) {
    codePt -= 0x10000
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF))
  }
  return String.fromCharCode(codePt)
}

$('button[data-dismiss=alert]').click(function () {
  $(this).parent('.alert').addClass('hidden')
})

module.exports = {
  displayResults
}

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    bgColorRenderer,
    clearHighlights,
    scrollToCell,
    displayValidationMessages,
    numToCol
  }
}
