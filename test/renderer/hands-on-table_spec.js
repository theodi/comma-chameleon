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
      fixedRowsTop: 0,
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

describe('insertRowAbove tests', function() {

  it('adds a row above (first row)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(0,0,0,4); //select whole row
      hotController.insertRowAbove(true);
      assert.deepEqual(hot.getData(), [
        [null, null, null, null, null],
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2014", 10, 11, 12, 13],
        ["2015", 20, 11, 14, 13],
        ["2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a row above (middle)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(2,0,2,0); //select only one cell
      hotController.insertRowAbove(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2014", 10, 11, 12, 13],
        [null, null, null, null, null],
        ["2015", 20, 11, 14, 13],
        ["2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a row above (end row)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(3,2,3,4); //select partial row
      hotController.insertRowAbove(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2014", 10, 11, 12, 13],
        ["2015", 20, 11, 14, 13],
        [null, null, null, null, null],
        ["2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

});

describe('insertRowBelow tests', function() {

  it('adds a row below (first row)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(0,0,0,4); //select whole row
      hotController.insertRowBelow(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        [null, null, null, null, null],
        ["2014", 10, 11, 12, 13],
        ["2015", 20, 11, 14, 13],
        ["2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a row below (middle)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(1,2,1,2); //select only one cell
      hotController.insertRowBelow(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2014", 10, 11, 12, 13],
        [null, null, null, null, null],
        ["2015", 20, 11, 14, 13],
        ["2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a row below (end row)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(2,0,3,3); //select rectangular area
      hotController.insertRowBelow(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2014", 10, 11, 12, 13],
        ["2015", 20, 11, 14, 13],
        ["2016", 30, 15, 12, 13],
        [null, null, null, null, null],
      ]);
    });
    hot.loadData(data);
  });

});

describe('insertColumnLeft tests', function() {

  it('adds a column to the left (first col)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(0,0,3,0); //select whole column
      hotController.insertColumnLeft(true);
      assert.deepEqual(hot.getData(), [
        [null, "", "Ford", "Volvo", "Toyota", "Honda"],
        [null, "2014", 10, 11, 12, 13],
        [null, "2015", 20, 11, 14, 13],
        [null, "2016", 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a column to the left (middle)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(2,2,2,2); //select only one cell
      hotController.insertColumnLeft(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", null, "Volvo", "Toyota", "Honda"],
        ["2014", 10, null, 11, 12, 13],
        ["2015", 20, null, 11, 14, 13],
        ["2016", 30, null, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a column to the left (last col)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(1,4,2,4); //select partial column
      hotController.insertColumnLeft(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", null, "Honda"],
        ["2014", 10, 11, 12, null, 13],
        ["2015", 20, 11, 14, null, 13],
        ["2016", 30, 15, 12, null, 13],
      ]);
    });
    hot.loadData(data);
  });

});

describe('insertColumnRight tests', function() {
  it('adds a column to the left (first col)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(0,0,3,0); //select whole column
      hotController.insertColumnRight(true);
      assert.deepEqual(hot.getData(), [
        ["", null, "Ford", "Volvo", "Toyota", "Honda"],
       ["2014", null, 10, 11, 12, 13],
        ["2015", null, 20, 11, 14, 13],
        ["2016", null, 30, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a column to the left (middle)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(1,1,1,1); //select only one cell
      hotController.insertColumnRight(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", null, "Volvo", "Toyota", "Honda"],
        ["2014", 10, null, 11, 12, 13],
        ["2015", 20, null, 11, 14, 13],
        ["2016", 30, null, 15, 12, 13],
      ]);
    });
    hot.loadData(data);
  });

  it('adds a column to the left (last col)', function() {
    hot.addHook('afterLoadData', function() {
      hot.selectCell(1,3,2,4); //select a rectangular range
      hotController.insertColumnRight(true);
      assert.deepEqual(hot.getData(), [
        ["", "Ford", "Volvo", "Toyota", "Honda", null],
        ["2014", 10, 11, 12, 13, null],
        ["2015", 20, 11, 14, 13, null],
        ["2016", 30, 15, 12, 13, null],
      ]);
    });
    hot.loadData(data);
  });
});

describe('freeze rows and columns', function () {
    it('freezes the upper most row', function () {
        hot.addHook('afterLoadData', function() {
          // tests happen here
            var settings = hot.getSettings();
            assert.strictEqual(settings.fixedRowsTop, 0);

            hot.selectCell(1,0,1,4);
            hotController.freezeRows();
            var settings = hot.getSettings();
            assert.strictEqual(settings.fixedRowsTop, 1);
        });
        hot.loadData(data);
    });
});