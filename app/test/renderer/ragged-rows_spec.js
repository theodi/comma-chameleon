/**
 * Created by stephenfortune on 15/09/15.
 */
process.env.NODE_ENV = 'test'

var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should();

var hotController = require('./../../comma-chameleon/hot.js');


beforeEach(function () {
  hotView = document.createElement('div');
  hot = hotController.create(hotView);
});


describe('testing ragged row functions against 2D array', function(){

  it('checks a loaded CSV and returns prompt on first discovery of ragged row', function(){

    var panel = document.createElement('div');
    panel.id = "#right-panel";

    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14],
      ["2016", 30, 15, 12, 13]
    ];

    hot.loadData(data);
    //raggedRows.fixRaggedRows(hot.getData());

  });

  it('if ragged rows present and user consent it parses the entire CSV', function(){

  })

  it('well formed array results in no DOM change', function(){

    tableState = '';
    // pass a non ragged array
    // tableState should be unchanged

  });

  it('at least one ragged array triggers a prompt', function(){
    // expect prompt
    // expect change in hidden status

  });

  it('ragged array and yes to prompt equates to change on HandsOnTable object', function(){

  });


})