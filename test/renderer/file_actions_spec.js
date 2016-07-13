process.env.NODE_ENV = 'test'

var chai = require('chai')

var assert = chai.assert
var expect = chai.expect
var should = chai.should();

var $ = require('./../../bower_components/jquery/dist/jquery.js');
var hotController = require('../../renderer/hot.js');
var rows = require('./../../renderer/ragged-rows');
var file_actions = require('./../../renderer/file-actions');
var fs = require('fs');

beforeEach(function () {
  hotView = document.createElement('div');
  document.body.appendChild(hotView);
  hot = hotController.create(hotView);
});

describe('open file', function() {

  it('opens a file', function() {
    data = "foo,bar,baz\r\n1,2,3\r\n4,5,6"
    file_actions.open(hot, data)
    expect(hot.getData()).to.eql([['foo', 'bar', 'baz'],['1','2','3'],['4','5','6']])
  })

})

describe('save file', function() {

  it('saves a file', function() {
    data = "foo,bar,baz\r\n1,2,3\r\n4,5,6"
    file_actions.open(hot, data)
    file_actions.save(hot, '/tmp/mycsv.csv')

    fs.readFile('/tmp/mycsv.csv', 'utf-8', function (err, d) {
      expect(d).to.eq(data)
    })

    expect(document.title).to.eq('/tmp/mycsv.csv')
  })

})
