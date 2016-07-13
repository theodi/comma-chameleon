global.electron = require('electron')

global.BrowserWindow = electron.BrowserWindow
global.Dialog = electron.dialog;

var Fs = require('fs');
var ipc = require("electron").ipcMain;
var path = require('path');
var temp = require('temp');
var request = require('request');
var querystring = require('querystring');
var escape = require('escape-regexp');
var slug = require('slug');
var tmpdir = require('os-tmpdir')();

var rootURL = 'https://octopub.io'

var loadWindow = function(githubWindow, apiKey, viewName) {
  githubWindow.loadURL('file://' + __dirname + '/../views/' + viewName + '.html')
  githubWindow.webContents.on('dom-ready', function() {
    githubWindow.webContents.send('apiKey', apiKey)
  })
}

var checkForAPIKey = function(url) {
  regex = escape(rootURL + '/redirect?api_key=') + '([a-z0-9]+)'
  match = url.match(new RegExp(regex))
  return match
}

var writeData = function(csv, filename) {
  path = tmpdir + '/' + slug(filename, {lower: true}) + '.csv'
  Fs.writeFileSync(path, csv, 'utf8');
  return path
}

var postData = function(dataset, file, apiKey) {
  var opts = {
    url: rootURL + '/datasets',
    json: true,
    formData: {
      'api_key': apiKey,
      'dataset[name]': dataset.name,
      'dataset[description]': dataset.description,
      'dataset[publisher_name]': dataset['publisher_name'],
      'dataset[publisher_url]': dataset['publisher_url'],
      'dataset[license]': dataset.license,
      'dataset[frequency]': dataset.frequency,
      'files[][title]': dataset.file_name,
      'files[][description]': dataset.file_description,
      'files[][file]': Fs.createReadStream(file),
    }
  }

  request.post(opts, function(err, resp, body) {
    displayResult(body)
  })
}

var putData = function(dataset, file, apiKey) {
  var opts = {
    url: rootURL + '/datasets/' + dataset.dataset,
    json: true,
    formData: {
      'api_key': apiKey,
      'files[][title]': dataset.file_name,
      'files[][description]': dataset.file_description,
      'files[][file]': Fs.createReadStream(file),
    }
  }

  request.put(opts, function(err, resp, body) {
    if (resp.statusCode >= 400) {
      githubWindow.webContents.send('schemaError')
    } else {
      displayResult(body)
    }
  })
}

var displayResult = function(dataset) {
  githubWindow.loadURL('file://' + __dirname + '/../views/github-success.html')
  githubWindow.webContents.on('dom-ready', function() {
    githubWindow.webContents.send('ghPagesUrl', dataset.gh_pages_url)
  })
}

var uploadToGithub = function(parentWindow, data, apiKey) {
  parentWindow.webContents.send('getCSV');

  ipc.once('sendCSV', function(e, csv) {
    dataset = querystring.parse(data);
    file = writeData(csv, dataset.file_name);
    postData(dataset, file, apiKey);
  })
}

var exportToGithub = function() {
  authAndLoad('github')

  ipc.once('sendToGithub', function(e, data, apiKey) {
    uploadToGithub(parentWindow, data, apiKey);
  })
}

var authAndLoad = function(viewName) {
  parentWindow = BrowserWindow.getFocusedWindow();

  githubWindow = new BrowserWindow({width: 450, height: 600});
  githubWindow.loadURL(rootURL + '/auth/github?referer=comma-chameleon');

  githubWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl){
    match = checkForAPIKey(newUrl);
    if (match) {
      loadWindow(githubWindow, match[1], viewName)
    }
  })

  githubWindow.on('closed', function() {
    githubWindow = null;
  });
}

var addFileToGithub = function() {
  authAndLoad('choose-repo')

  ipc.on('addFileToExisting', function(e, data, apiKey) {
    parentWindow.webContents.send('getCSV');

    ipc.once('sendCSV', function(e, csv) {
      dataset = querystring.parse(data);
      file = writeData(csv, dataset.file_name);
      putData(dataset, file, apiKey)
    })
  })
}

module.exports = {
  exportToGithub: exportToGithub,
  addFileToGithub: addFileToGithub
};

if (process.env.NODE_ENV === 'test') {
  module.exports._private = {
    loadWindow: loadWindow,
    checkForAPIKey: checkForAPIKey,
    writeData: writeData,
    postData: postData,
    putData: putData,
    uploadToGithub: uploadToGithub,
    request: request
  }
}
