var BrowserWindow = require('browser-window');
var Dialog = require('dialog');
var Fs = require('fs');
var ipc = require('ipc');
var path = require('path');

var exportToGithub = function() {
  var window = BrowserWindow.getFocusedWindow();

  github = new BrowserWindow({width: 450, height: 600, 'always-on-top': true});
  github.loadUrl('http://git-data-publisher.herokuapp.com/auth/github?referer=comma-chameleon');

  github.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl){
    match = newUrl.match(/git-data-publisher\.herokuapp\.com\/redirect\?api_key=([a-z0-9]+)/)
    if (match) {
      api_key = match[1]
      github.loadUrl('file://' + __dirname + '/../comma-chameleon/views/github.html')
      github.webContents.on('dom-ready', function() {
        github.webContents.send('apiKey', api_key)
      })
    }
  })

  github.on('closed', function() {
    datapackage = null;
  });

}

module.exports = {
  exportToGithub: exportToGithub
};
