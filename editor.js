/**
 * Created by stephenfortune on 12/08/15.
 */

var fs = require("fs");
var clipboard = require('clipboard');
var ipc = require('ipc');

var container = document.getElementById("jsoneditor");
var editor = new JSONEditor(container);
editor.setMode('text');

var jsonSchema;

document.getElementById("change-to-code-editor").addEventListener("click", function(){
  console.log("you're pressing the code view");
  editor.setMode('code');
});

document.getElementById("change-to-text-editor").addEventListener("click", function(){
  editor.setMode('text');
});

document.getElementById("change-to-tree-view").addEventListener("click", function(){
  editor.setMode('tree');
});

//document.getElementById("save-schema").addEventListener("click", function(){
//  ipc.send('saveSchema', editor.get());
//});

ipc.on('schemaSave', function(){
  console.log(editor.get());
  ipc.send('saveSchema', editor.get());
});

ipc.on('loadSchema', function(data){
  console.log("are you receivin loadSchema?");
  try {
    var json = JSON.parse(data);
  } catch (jsonErr) {
    console.log(jsonErr);
  }
  jsonSchema = json;
  editor.set(json);
  //document.getElementById("save-schema").className = 'btn btn-primary';
  // workaround to set the button for saving to be anabled only when schema loaded
  var json = editor.get();
});
