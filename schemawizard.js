/**
 * Created by stephenfortune on 13/08/15.
 */
var ipc = require('ipc');
var exports = module.exports = {};

exports.createSchema = function(headerArray){
  // a JSON parser

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

// create the right JSON object
//var EGschema = {
//  "fields": [
//    {
//      "name": "FirstName",
//      "constraints": {
//        "required": true
//      }
//    },
//    {
//      "name": "LastName",
//      "constraints": {
//        "required": true
//      }
//    },
//    {
//      "name": "Insult",
//      "constraints": {
//        "required": true
//      }
//    }
//  ]
//};
