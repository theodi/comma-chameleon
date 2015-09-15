/**
 * Created by stephenfortune on 15/09/15.
 */
var assert = require('assert')

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

  it('loads a web page with HTML', function(){
    var html = '<div></div><div></div><div></div>';
    //console.log($(document.body).append(html));
    //console.log(window.document.body);
    window.document.body.appendChild(html);
    //window.document.body.append(html);
    //$(document.body).append(html);
    console.log(document.body);

  })

});