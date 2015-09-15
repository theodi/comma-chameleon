process.env.NODE_ENV = 'test' // this variable is set to permit access to the packages private methods

var assert = require('assert')
var expect = require('expect.js')

/* global describe it */

describe('describe: test 1', function () {
  it('it: test 1', function () {
    assert(true)
  })
})
