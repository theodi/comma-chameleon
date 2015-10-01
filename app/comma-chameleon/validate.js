//ipc.on('validate', function() {
//  validate();
//});
'use strict'
// How to use:
// getValidation("Example,CSV,content\na,b,c\n")
//  .then(function(validation) {console.log(validation)})

// Splits validation returned from CSVLint into errors, warnings and info messages

function validation(data) {
  //var data = $.csv.fromArrays(hot.getData());
  //console.log(JSON.stringify(data));
  $('#right-panel').removeClass("hidden")
  $('#message-panel').html("<div class=\"validation-load\"><p><span class=\"glyphicon glyphicon-refresh spinning\"></span></p><p>Loading validation results...</p></div>");
  getValidation(data).then(function(json_validation) {
    var errors = json_validation.validation.errors;
    var warnings = json_validation.validation.warnings;
    var info_messages = json_validation.validation.info;
    console.error(errors)
    console.warn(warnings)
    console.info(info_messages);
    displayValidationMessages(json_validation.validation);
  });
}

function getValidation(content) {
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

function displayValidationMessages(validation) {
  console.log(JSON.stringify(validation,null, 2));
  var $messagePanel = $('#message-panel');
  $messagePanel.html("<h4>Validation results <img src='" + validation.badges.png  +"' /></h4>");
  var resultsTemplate = _.template('<p><%= validation.errors.length %> errors, <%= validation.warnings.length %> warnings and <%= validation.info.length %> info messages:</p>')
  $messagePanel.append(resultsTemplate({'validation': validation}));
//TODO the errorText function below is truncated and isn't doing what it should be doing
  var printErrs = validation.errors[0];
  console.log(errorText(type));
  console.log(errorGuidance(type, row, col));
  var messageTemplate = _.template('<div><h5><%= errorText(type) %></h5><p><%= errorGuidance(type, row, col) %></p></div>');
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

  clearHighlights();

  $messagePanel.on('click', '.message', function() {
    highlightCell($(this).data());
  });
}

var colors = {
  error: 'rgba(255, 76, 66, 0.6)',
  warning: 'rgba(255, 152, 66, 0.6)',
  info: 'rgba(99, 149, 215, 0.6)'
};

function highlightCell(d) {
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

function scrollToCell(row, col) {
  if (row == null && col == null) return;
  row = row || 1;
  col = col || 1;
  hot.selectCell(row-1, col-1);
  hot.deselectCell();
}

function clearHighlights() {
  hot.updateSettings({
    cells: null
  });
}

function bgColorRenderer(color) {
  return function errorRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.background = color;
  }
}



$('button[data-dismiss=alert]').click(function() {
  $(this).parent('.alert').addClass('hidden')
})

module.exports = {
  validate: validation,
  apiReq: getValidation,
  display: displayValidationMessages
}
if (process.env.NODE_ENV === 'test') {
  module.exports._private = {

  }
}