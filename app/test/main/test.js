var assert = require('assert')
var expect = require('expect.js')
//import FileUtils from '../electron/file_utils';
//import FileUtils from './file_utils';
var FileUtils = require('./../../browser/file_utils')
var datapackage = require('./../../browser/datapackage')
/* global describe it */

describe('describe: test 1', function () {
  it('it: test 1', function () {
    //console.log(process.env.NODE_ENV);
    //console.log(JSON.stringify(process.env));
    assert(true)
  })
})


describe("testing an existing CSV edit object", function(){
  //console.log(JSON.stringify(process.env));
  //expect(datapackage.hello).to.be.a('function');
  it('can successfully import an exported function', function(){
    expect(datapackage.exportDatapackage).to.be.a('function');
    expect(datapackage.hello).to.be.a('function');
  })

  //expect(add).to.be.a('function');

});