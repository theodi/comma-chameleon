/**
 * Created by stephenfortune on 15/09/15.
 */
process.env.NODE_ENV = 'test' // this variable is set to permit access to the packages private methods

var assert = require('assert')
var expect = require('expect.js')
var datapackage = require('./../../browser/datapackage')

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
    }
    var vocab = datapackage._private.inputToVocab(input); // creates object
    //console.log(vocab);
    expect(vocab).to.only.have.keys(['description', 'keywords', 'license', 'name', 'title', 'resources']);
    expect(vocab['resources'][0]).to.only.have.keys(['name', 'path', 'mediatype', 'schema']);
    //expect(datapackage._private.inputToVocab).to.be('Array');
    //expect({ a: 'b', c: 'd' }).to.only.have.keys(['a', 'c']);

  });
})