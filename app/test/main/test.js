process.env.NODE_ENV = 'test' // this variable is set to permit access to the packages private methods

var assert = require('assert')
var expect = require('expect.js')
//import FileUtils from '../electron/file_utils';
//import FileUtils from './file_utils';
var FileUtils = require('./../../browser/file_utils')
var datapackage = require('./../../browser/datapackage')
/* global describe it */

describe('describe: test 1', function () {
  it('it: test 1', function () {
    assert(true)
  })
})


describe("testing an existing CSV edit object", function(){
  //console.log(JSON.stringify(process.env));
  //expect(datapackage.hello).to.be.a('function');
  it('can successfully import an exported function and access private methods', function(){
    expect(datapackage.exportDatapackage).to.be.a('function');
    expect(datapackage._private.packageToJson).to.be.a('function');
    expect(datapackage._private.zipPackage).to.be.a('function');
  })

  //expect(add).to.be.a('function');

});