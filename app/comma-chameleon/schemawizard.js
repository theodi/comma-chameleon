/**
 * Created by stephenfortune on 13/08/15.
 */
'require strict';
// do not know how to handle exports when creating an object

var headerToVocab = function(headerArray){
  // a JSON parser

  if(headerArray == false){
    // throw exception
    alert("Your first row doesn't contain the correct content for generating header data.\n It may be empty, try deleting the first row or naming it descriptively");
    return;
  }

  var schemaInWaiting = {
    "fields": []
  };
  headerArray.forEach(function(header){
    schemaInWaiting["fields"].push(
      {
        "name": header,
        "constraints": {
          "required": true
        }
      }
    );
  });
  return schemaInWaiting;
}

var headerRow = function(rowArray) {
  // function that extracts header data for use in schema wizard
  // TODO feel like handsontable must have this functionality built in
  rowArray.forEach(function (contents) {
    if (contents === "" || contents === null) {
      headerArray = false;
    }
  });
  return rowArray;
}

module.exports = {
  returnHeaderRow: headerRow,
  createSchema: headerToVocab
}