'use strict'
var $ = require('./../bower_components/jquery/dist/jquery.js');
var _ = require('./../bower_components/lodash/lodash.js');
var validationNotes = require('./validation_notes.json')

var colors = {
  error: 'rgba(255, 76, 66, 0.6)',
  warning: 'rgba(255, 152, 66, 0.6)',
  info: 'rgba(99, 149, 215, 0.6)'
};

var showLoader = function() {
  $('#right-panel').removeClass("hidden")
  $('#message-panel').html("<div class=\"validation-load\"><p><span class=\"glyphicon glyphicon-refresh spinning\"></span></p><p>Loading validation results...</p></div>");
}

var displayResults = function(results) {
  displayValidationMessages(JSON.parse(results).validation);
  highlightCells();
}

var displayValidationMessages = function(validation) {
  var $messagePanel = $('#message-panel');
  $messagePanel.html("<h4>Validation results <img src='../img/"+ validation.state +".svg' /></h4>");
  var resultsTemplate = _.template('<p><%= validation.errors.length %> errors, <%= validation.warnings.length %> warnings and <%= Math.max(0, validation.info.length - 1) %> info messages. Click on an error message to see where the error occurred:</p>')
  $messagePanel.append(resultsTemplate({'validation': validation}));
  var printErrs = validation.errors[0];
  var messages = _.flatten([
    _.map(validation.errors,   function(d) { return _.extend({}, d, { msg_type: 'error' }) }),
    _.map(validation.warnings, function(d) { return _.extend({}, d, { msg_type: 'warning' }) }),
    _.map(validation.info,     function(d) { return _.extend({}, d, { msg_type: 'info' }) })
  ]);
  if (messages.length) {
    var elements = _.map(messages, function(message) {
      // Assumed header doesn't make sense in this context, so remove it
      if (message.type == 'assumed_header') { return; }
      return $(messageTemplate(message)).data(message)
        .addClass('message')
        .addClass('validation-' + message.msg_type);
    });
    $messagePanel.append(elements);
  } else {
    $messagePanel.append('<p>CSV Valid!</p>');
  }
}

var highlightCells = function() {
  clearHighlights();

  $('#message-panel').on('click', '.message', function() {
    highlightCell($(this).data());
  });
}

var highlightCell = function(d) {
  scrollToCell(d.row, d.col);
  hot.updateSettings({
    // set the new renderer for every cell
    cells: function (row, col, prop) {
      if (d.row && d.col) {
        if (row === d.row - 1 && col === d.col - 1) {
          return { renderer: bgColorRenderer(colors[d.msg_type]) };
        }
      } else {
        if (row === d.row - 1 || col === d.col - 1) {
          return { renderer: bgColorRenderer(colors[d.msg_type]) };
        }
      }
      return {};
    }
  });
}

var scrollToCell = function(row, col) {
  if (row == null && col == null) return;
  row = row || 1;
  col = col || 1;
  hot.selectCell(row-1, col-1);
  hot.deselectCell();
}

var clearHighlights = function() {
  hot.updateSettings({
    cells: null
  });
}

var bgColorRenderer = function(color) {
  return function errorRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.background = color;
  }
}

var messageTemplate = _.template('<div><h5><%= errorText(data) %></h5><p><%= errorGuidance(data) %></p></div>', {
  imports: {
    errorText: function(data) {
      return validationNotes.errors[data.type]
    },
    errorGuidance: function(data) {
      var guidance = validationNotes.errors[data.type + '_guidance_html']
      var guidance_template = _.template(guidance)
      data.column = numToCol(data.col)
      return guidance_template(data)
    },
    numToCol: numToCol
  },
  variable: 'data'
});

var numToCol = function(number){
    var numeric = (number - 1) % 26;
    var letter = chr(65 + numeric);
    var number2 = parseInt((number - 1) / 26);
    if (number2 > 0) {
        return numToCol(number2) + letter;
    } else {
        return letter;
    }
}

var chr = function(codePt) {
  if (codePt > 0xFFFF) {
      codePt -= 0x10000;
      return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
  }
  return String.fromCharCode(codePt);
}

$('button[data-dismiss=alert]').click(function() {
  $(this).parent('.alert').addClass('hidden')
})

module.exports = {
  showLoader,
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
