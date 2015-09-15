/**
 * Created by stephenfortune on 15/09/15.
 */
var assert = require('assert')

/* global describe it */

describe('describe: test 2', function () {
  it('it: test 2', function () {
    console.log(JSON.stringify(process.env));
    window.localStorage.setItem('blah', 'hello storage!!')
    assert.strictEqual('test', 'test')
    console.log(window.localStorage.getItem('blah'))
    console.dir({name: 'jp'})
  })
})