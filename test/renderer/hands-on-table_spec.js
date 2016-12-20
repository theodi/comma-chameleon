/**
 * Created by stephenfortune on 16/09/15.
 */
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var hotController = require('./../../renderer/hot.js'); // failing probably cause it cant access the bower_components
var handMadeHOT = require('./../../bower_components/handsontable/dist/handsontable.full.js');

beforeEach(function () {
  hotView = document.createElement('div');
  hot = hotController.create(hotView);
  data = [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2014", 10, 11, 12, 13],
    ["2015", 20, 11, 14, 13],
    ["2016", 30, 15, 12, 13],
  ];
});

describe('loading Hands On Table library into workview', function(){

  it('constructs a Hands On Table element from source', function(){
    var hot = new handMadeHOT(hotView,{
      data: data,
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true,
      contextMenu: false
    });
    expect(hot.getData()).to.equal(data);
  });

  it('constructs hands on table from programs source files', function(){
    hot.addHook('afterLoadData', function() {
      expect(hot.getData()).to.equal(data);
    });
    hot.loadData(data);
  });

});
