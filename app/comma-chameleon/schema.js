var schemawizard = require('../schemawizard.js');

ipc.on('schemaFromHeaders', function(){
  ipc.send('jsonHeaders',schemawizard.createSchema(returnHeaderRow()));
  schemawizard.createSchema(returnHeaderRow());
});

function returnHeaderRow() {
  // function that extracts header data for use in schema wizard
  try {
    headerArray = hot.getData()[0];
  } catch (err) {
    console.log("attempting to get the first row has failed");
  }

  hot.getData()[0].forEach(function (contents) {
    if (contents === "" || contents === null) {
      headerArray = false;
    }
  });
  return headerArray;
}
