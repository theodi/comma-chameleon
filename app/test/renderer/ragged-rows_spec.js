/**
 * Created by stephenfortune on 15/09/15.
 */
process.env.NODE_ENV = 'test'

var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should();

var hotController = require('./../../comma-chameleon/hot.js');
var raggedRows = require('./../../comma-chameleon/ragged-rows.js');
var $ = require('./../../bower_components/jquery/dist/jquery.js');

before(function(){
  rpanel = document.createElement('div');
  rpanel.setAttribute("id", "right-panel");
  mpanel = document.createElement('div');
  mpanel.setAttribute("id","message-panel");
  document.body.appendChild(mpanel);
  document.body.appendChild(rpanel);
})

beforeEach(function () {
  hotView = document.createElement('div');
  //document.body.appendChild(hotView);
  hot = hotController.create(hotView);
});


describe('testing ragged row functions against 2D array', function(){

  it('well formed array results in no DOM change', function(){

    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14, 11],
      ["2016", 30, 15, 12, 13]
    ];

    hot.loadData(data);
    raggedRows.fixRaggedRows(hot.getData());
    expect(mpanel.innerText).to.not.have.string('has been added to file');

  });

  it('checks a loaded CSV and returns prompt on first discovery of ragged row', function(){

    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14],
      ["2016", 30, 15, 12, 13]
    ];

    hot.loadData(data);
    raggedRows.fixRaggedRows(hot.getData());
    //TODO code that automates the answer of yes to modal dialog
    //TODO a spy that confirms modal dialog closed
    //expect(mpanel.innerText).to.have.string('has been added to file'); TODO uncomment once the above refactor done

  });

  it('ragged array and yes to prompt equates to change on HandsOnTable object', function(){
    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14],
      ["2016", 30, 15, 12, 13]
    ];

    hot.loadData(data);
    raggedRows.fixRaggedRows(hot.getData());
    //TODO code that automates the answer of yes to modal dialog
    //expect(mpanel.innerText).to.have.string('has been added to file'); TODO uncomment once the above refactor done
  });


  it('if ragged rows present and user consent it parses the entire CSV', function(){

    var data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14],
      ["2016", 30, 15, 12, 13],
      ["2014", 10, 11, 12, 13],
      ["2015", 20, 11, 14],
      ["2016", 30, 15, 12, 13]
    ];

    hot.loadData(data);
    raggedRows.fixRaggedRows(hot.getData());
    //expect(mpanel.innerText).to.have.string('has been added to file');
    //TODO - an assertion that determines that the above should have been added twice

  });


})