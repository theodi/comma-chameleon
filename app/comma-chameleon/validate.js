'use strict'
var $ = require('./../bower_components/jquery/dist/jquery.js');
var _ = require('./../bower_components/lodash/lodash.js');
var validationNotes = require('./validation_notes.json')

var colors = {
  error: 'rgba(255, 76, 66, 0.6)',
  warning: 'rgba(255, 152, 66, 0.6)',
  info: 'rgba(99, 149, 215, 0.6)'
};

var validation = function(data) {
  $('#right-panel').removeClass("hidden")
  $('#message-panel').html("<div class=\"validation-load\"><p><span class=\"glyphicon glyphicon-refresh spinning\"></span></p><p>Loading validation results...</p></div>");
  getValidation(data).then(function(json_validation) {
    displayValidationMessages(json_validation.validation);
    highlightCells();
  });
}

var getValidation = function(content) {
  var request = require('request');
  content = new Buffer(content).toString("base64");
  content = "editor.csv;data:text/csv;base64," + content;
  return new Promise(function(resolve, reject) {
    request.post("http://csvlint.io/package.json", { formData: {"files_data[]": content } }, function(error, response, body) {

      if (error) return reject(error);

      var packageURL = JSON.parse(response.body).package.url;
      var interval = setInterval(function() {
        request.get(packageURL + ".json", function(error, response, body) {
          try {
            var validationURL = JSON.parse(body).package.validations[0].url;
            clearInterval(interval);
            request.get(validationURL + ".json", function(error, response, body) {
              if (error) return reject(error);
              resolve(JSON.parse(body));
            });
          } catch(e) {}
        });
      }, 1000);

    });
  });
}

var displayValidationMessages = function(validation) {
  var $messagePanel = $('#message-panel');
  $messagePanel.html("<h4>Validation results <img src='" + validation.badges.png  +"' /></h4>");
  var resultsTemplate = _.template('<p><%= validation.errors.length %> errors, <%= validation.warnings.length %> warnings and <%= validation.info.length %> info messages:</p>')
  $messagePanel.append(resultsTemplate({'validation': validation}));
  var printErrs = validation.errors[0];
  var messages = _.flatten([
    _.map(validation.errors,   function(d) { return _.extend({}, d, { msg_type: 'error' }) }),
    _.map(validation.warnings, function(d) { return _.extend({}, d, { msg_type: 'warning' }) }),
    _.map(validation.info,     function(d) { return _.extend({}, d, { msg_type: 'info' }) })
  ]);
  if (messages.length) {
    var elements = _.map(messages, function(message) {
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
      if (row === d.row - 1 || col === d.col - 1) {
      return { renderer: bgColorRenderer(colors[d.msg_type]) };
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

var messageTemplate = _.template('<div><h5><%= errorText(type) %></h5><p><%= errorGuidance(type, row, col) %></p></div>', {
  imports: {
    errorText: function(error) {
      return validationNotes.errors[error]
    },
    errorGuidance: function(error, row, column) {
      var guidance = validationNotes.errors[error + '_guidance_html']
      var guidance_template = _.template(guidance)
      return guidance_template({row: row, column: column})
    }
  }
});

$('button[data-dismiss=alert]').click(function() {
  $(this).parent('.alert').addClass('hidden')
})

module.exports = {
  validate: validation,
}

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    bgColorRenderer,
    clearHighlights,
    scrollToCell,
    displayValidationMessages,
    getValidation
  }
}
