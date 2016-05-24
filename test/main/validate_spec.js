process.env.NODE_ENV = 'test'

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');

require('../../main')
var validate = require('./../../browser/validate');

var Fs = require('fs');

describe('validate', function() {

  it('generates the correct command path', function() {
    expect(validate._private.csvlintPath()).to.match(/bin\/csvlint \-\-json/)
  })

  it('writes a tmp file', function() {
    data = 'here,is,some,data'
    path = validate._private.writeTmpFile(data)
    expect(Fs.readFileSync(path, 'utf8')).to.eq(data)
  })

})
