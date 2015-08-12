// How to use:
// getValidation("Example,CSV,content\na,b,c\n")
//  .then(function(validation) {console.log(validation)})

function getValidation(content) {
  request = require('request');
  content = new Buffer(content).toString("base64");
  content = "editor.csv;data:text/csv;base64," + content;
  return new Promise(function(resolve, reject) {
    request.post("http://csvlint.io/package.json", { formData: {"files_data[]": content } }, function(error, response, body) {

      if (error) return reject(error);

      var packageURL = JSON.parse(response.body).package.url;
      var interval = setInterval(function() {
        request.get(packageURL + ".json", function(error, response, body) {
          try {
            var validationURL = JSON.parse(body).package.validations[0].url;
            clearInterval(interval);
            request.get(validationURL + ".json", function(error, response, body) {
              if (error) return reject(error);
              resolve(JSON.parse(body));
            });
          } catch(e) {}
        });
      }, 1000);

    });
  });
}

function validate() {
  data = hot.getData().map(function(d) { return d.join(",") }).join("\n")
  json_data = '{"version":"0.1","licence":"http://opendatacommons.org/licenses/odbl/","validation":{"url":"http://csvlint.io/validation/55ca092f63737668de000069","source":"http://theodi.github.io/hot-drinks/hot-drinks.csv","state":"warnings","errors":[],"warnings":[{"type":"malformed_header","category":"schema","row":1,"col":null}],"info":[{"type":"assumed_header","category":"structure","row":null,"col":null},{"type":"nonrfc_line_breaks","category":"structure","row":null,"col":null}],"standardisedCSV":"http://csvlint.io/validation/55ca092f63737668de000069.csv","badges":{"svg":"http://csvlint.io/validation/55ca092f63737668de000069.svg","png":"http://csvlint.io/validation/55ca092f63737668de000069.png"}}}'
  json_data_2 = getValidation("Interns,LOL,,,,a\nas,f").then(function(json_validation) {
    errors = json_validation.validation.errors
    warnings = json_validation.validation.warnings
    info_messages = json_validation.validation.info
    console.error(errors)
    console.warn(warnings)
    console.info(info_messages);
  });
}
