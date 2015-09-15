/**
 * Created by stephenfortune on 15/09/15.
 */
'require strict';

var ipc = require('ipc');
var schemawizard = require('../schemawizard.js');
var rows = require('../ragged-rows');
var validation = require('../validate');

ipc.on('validate', function() {
  var data = $.csv.fromArrays(hot.getData());
  validation.validate(data);
});

ipc.on('schemaFromHeaders', function(){
  try {
    var assumedHeader = hot.getData()[0];
    var header = schemawizard.returnHeaderRow(assumedHeader);
    //console.log(header);
    ipc.send('jsonHeaders',schemawizard.createSchema(header));
    schemawizard.createSchema(header);
  } catch (err) {
    console.log("attempting to get the first row has failed");
    console.log(err);
  }

});

ipc.on('ragged_rows', function() {

  csv = hot.getData();
  console.log(typeof rows);
  console.log(typeof csv);
  rows.fixRaggedRows(csv);
});
