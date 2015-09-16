/**
 * Created by stephenfortune on 15/09/15.
 */
var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should();
/* global describe it */

describe('describe: test 2', function () {
  it('it: test 2', function () {
    window.localStorage.setItem('blah', 'hello storage!!')
    assert.strictEqual('test', 'test')
    console.log(window.localStorage.getItem('blah'))
    console.dir({name: 'jp'})
  })
})

describe('populate a web page and check that everything is there', function(){

  it('has document', function () {
    var div = document.createElement('div');
    expect(div.nodeName).eql('DIV');
  });


  it('loads a web page and confirms that changes to DIV are evaluated', function(){
    var div = document.createElement('div');
    var targetdiv = document.createElement('div');
    targetdiv.innerHTML = "populated";
    expect(targetdiv === div);
    //targetdiv.innerText.should.equal(div.innerText)
    expect(targetdiv.innerText).to.not.equal(div.innerText)
  })

});