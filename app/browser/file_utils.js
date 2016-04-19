/**
 * Created by stephenfortune on 19/08/15.
 */
'use strict';
var ipc = require('ipc');
var Dialog = require('dialog');
var BrowserWindow = require('browser-window');

module.exports = function(){
  // above line is a constructor for the entire class assigned to any var $_ = require('file_utils')

  var total_length = 100;
  var publisher = "theODI";
  var body_text;

  // functions and attributes are defined as you would in any class definition
  var fileAttributes = {
    length: 10,
    author: 'Stephen Fortune'
  }


  var readFile = function(){
    var window = BrowserWindow.getFocusedWindow();
    Dialog.showOpenDialog(
      { filters: [
        { name: 'text', extensions: ['json'] }
      ]},
      // callback
      function (fileNames) {
        if (fileNames === undefined) {
          return;
        } else{
          window.webContents.send('loadData', fileNames);
        }
      });
  }

  var saveFile = function(){
    var window = BrowserWindow.getFocusedWindow();
    Dialog.showSaveDialog({ filters: [
      { name: 'text', extensions: ['json'] }
    ]}, function (fileName) {
      if (fileName === undefined) return;
      window.webContents.send('saveData', fileName);
    });
  }

  var openFile = function(fileObj){
    var fileName = fileObj[0];
    Fs.readFile(fileName, 'utf-8', function (err, data) {
      loadElements(data, fileName);
    });
  }

  var setAttr = function(param){
    fileAttributes['new_val'] = param;
  }

  // the return block is where you create your getters for use by other modules

  return {
    get length(){ return fileAttributes.length},
    get author(){ return fileAttributes.author},
    get fileDetails(){ return fileAttributes},
    readFile: readFile,
    save: saveFile,
    open: openFile,
    setAttr: setAttr,
    total_length: total_length,
    text_content: body_text
  };
};
