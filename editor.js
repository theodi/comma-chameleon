/**
 * Created by stephenfortune on 12/08/15.
 */

var fs = require("fs");
var clipboard = require('clipboard');
var ipc = require('ipc');

var container = document.getElementById("jsoneditor");
var editor = new JSONEditor(container);

ipc.on('loadSchema', function(data){
  try {
    var json = JSON.parse(data);
  } catch (jsonErr) {
    console.log(jsonErr);
  }

  editor.set(json);
  var json = editor.get();
});


