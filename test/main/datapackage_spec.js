/**
 * Created by stephenfortune on 15/09/15.
 */
process.env.NODE_ENV = 'test' // this variable is set to permit access to the packages private methods

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var datapackage = require('./../../main/datapackage')

describe("methods access for datapackage object", function(){
  //console.log(JSON.stringify(process.env));
  //expect(datapackage.hello).to.be.a('function');
  it('can successfully import an exported function and access private methods', function(){
    expect(datapackage.exportDatapackage).to.be.a('function');
    expect(datapackage._private.inputToVocab).to.be.a('function');
    expect(datapackage._private.zipPackage).to.be.a('function');
  })

  //expect(add).to.be.a('function');
});

describe("testing datapackage", function(){

  it("generates a vocabulary from an array", function(){
    var input = {
      description: 'description',
      keywords: 'tags',
      license: 'cc-by-sa',
      name: 'name',
      title: 'title'
    };

    var vocab = datapackage._private.inputToVocab(input, {}, {
      label: 'Comma separated',
      filters: [
        { name: 'csv files', extensions: ['csv'] }
      ],
      options: { separator: ',', delimiter: '"'},
      mime_type: 'text/csv',
      default_extension: 'csv',
    }); // creates object

    expect(vocab).to.have.all.keys('description','keywords', 'license', 'name', 'title', 'resources');
    expect(vocab['resources'][0]).to.have.all.keys('name', 'path', 'mediatype', 'schema');

  });
});
