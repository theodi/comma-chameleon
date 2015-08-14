/**
 * Created by stephenfortune on 13/08/15.
 */
var ipc = require('ipc');
var exports = module.exports = {};

exports.createSchema = function(headerArray){
  // a JSON parser

  if(headerArray == false){
    // throw exception
    alert("your first row doesn't contain the correct content for generating header data.\n It may be empty, try deleting the first row or naming it descriptively");
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
    console.log(JSON.stringify(schemaInWaiting,null,4));
  });
  console.log(schemaInWaiting,null,4);
  return schemaInWaiting;
}
