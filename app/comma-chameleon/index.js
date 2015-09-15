/**
 * Created by stephenfortune on 15/09/15.
 */
'require strict';

var ipc = require('ipc');
var schemawizard = require('../schemawizard.js');

ipc.on('validate', function() {
  validate();
});

ipc.on('schemaFromHeaders', function(){
  try {
    var assumedHeader = hot.getData()[0];
    console.log(typeof assumedHeader); // fine

  } catch (err) {
    console.log("attempting to get the first row has failed");
    console.log(err);
  }
  var header = schemawizard.returnHeaderRow(assumedHeader);
  ipc.send('jsonHeaders',schemawizard.createSchema(header));
  schemawizard.createSchema(header);
});

ipc.on('ragged_rows', function() {
  var rows = require('../ragged-rows');
  csv = hot.getData();
  console.log(typeof rows);
  console.log(typeof csv);
  rows.fixRaggedRows(csv);
});
