process.env.NODE_ENV = 'test'

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

require('../../main')

var schema = require('../../browser/schema')

describe("methods access for datapackage object", function(){
  it('can successfully import an exported function and access private methods', function(){
    expect(schema.generateTemplate).to.be.a('function');
    expect(schema._private.templateFromSchema).to.be.a('function');
  })
});

describe("templateFromSchema", function() {
  it('can generate headers from a schema', function(done) {
    fileName = __dirname + '/../fixtures/schema.json'
    Fs.readFile(fileName, 'utf-8', function (err, data) {
      template = schema._private.templateFromSchema(data).split('\r\n')
      expect(template[0]).to.eq('"Post Unique Reference","Name","Grade","Job Title","Job/Team Function","Parent Department","Organisation","Unit","Contact Phone","Contact E-mail","Reports to Senior Post","Salary Cost of Reports (%)","FTE","Actual Pay Floor (%)","Actual Pay Ceiling (%)","Profession","Notes","Valid?"')
      expect(template[1]).to.eq(',,,,,,,,,,,,,,,,,')
      done();
    });
  })
})
