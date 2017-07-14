'use strict'
var $ = require('./../bower_components/jquery/dist/jquery.js')

var showLoader = function (message) {
  $('#right-panel').removeClass('hidden')
  $('#message-panel').html(
    '<div class="validation-load"><p><span class="glyphicon glyphicon-refresh spinning"></span></p><p>' + message + '</p></div>'
  )
}

var hideLoader = function () {
  $('#right-panel').addClass('hidden')
}

module.exports = {
  showLoader,
  hideLoader
}
