var BrowserWindow = require('browser-window');
var Dialog = require('dialog');
var Fs = require('fs');
var ipc = require('ipc');
var path = require('path');

var exportToGithub = function() {
  var window = BrowserWindow.getFocusedWindow();

  github = new BrowserWindow({width: 450, height: 600, 'always-on-top': true});
  //github.loadUrl('file://' + __dirname + '/../comma-chameleon/views/github.html');
  github.loadUrl('https://git-data-publisher.herokuapp.com/auth/github?format=json');

  github.on('closed', function() {
    datapackage = null;
  });
}

module.exports = {
  exportToGithub: exportToGithub
};
