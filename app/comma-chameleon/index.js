/**
 * Created by stephenfortune on 15/09/15.
 */
'require strict';

var ipc = require('ipc');


ipc.on('validate', function() {
  validate();
});

ipc.on('schemaFromHeaders', function(){
  ipc.send('jsonHeaders',schemawizard.createSchema(returnHeaderRow()));
  schemawizard.createSchema(returnHeaderRow());
});

ipc.on('ragged_rows', function() {
  var rows = require('../ragged-rows');
  csv = hot.getData();
  console.log(typeof rows);
  console.log(typeof csv);
  rows.fixRaggedRows(csv);
});
