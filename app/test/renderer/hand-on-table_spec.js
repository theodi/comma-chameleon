/**
 * Created by stephenfortune on 16/09/15.
 */
var expect = require('chai').expect;
var should = require('chai').should();
var hotController = require('./../../comma-chameleon/hot.js'); // failing probably cause it cant access the bower_components
var handMadeHOT = require('./../../../bower_components/handsontable/dist/handsontable.full.js');

describe('loading Hands On Table library into workview', function(){

  it('constructs a Hands On Table element from source', function(){
    var hotView = document.createElement('div');
    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14, 13],
      ["2016", 30, 15, 12, 13]
    ];
    //var hotView = new handMadeHOT(hotView, '"col1","col2","col3"\r\n"Foo","Bar","Baz"');
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
    var hotView = document.createElement('div');
    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14, 13],
      ["2016", 30, 15, 12, 13]
    ];
    var hot = hotController.create(hotView);
    hot.loadData(data);
    expect(hot.getData()).to.equal(data);
  });

});