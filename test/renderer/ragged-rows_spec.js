/**
 * Created by stephenfortune on 15/09/15.
 */
/* eslint-env mocha */
process.env.NODE_ENV = 'test'

var expect = require('chai').expect

var hotController = require('./../../renderer/hot.js')
var raggedRows = require('./../../renderer/ragged-rows.js')

before(function () {
  rpanel = document.createElement('div')
  rpanel.setAttribute('id', 'right-panel')
  mpanel = document.createElement('div')
  mpanel.setAttribute('id', 'message-panel')
  document.body.appendChild(mpanel)
  document.body.appendChild(rpanel)
})

beforeEach(function () {
  hotView = document.createElement('div')
  // document.body.appendChild(hotView);
  hot = hotController.create(hotView)
})

describe('testing ragged row functions against 2D array', function () {
  it('well formed array results in no DOM change', function () {
    var data = [
      ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      ['2014', 10, 11, 12, 13],
      ['2015', 20, 11, 14, 11],
      ['2016', 30, 15, 12, 13]
    ]

    hot.loadData(data)
    raggedRows.fixRaggedRows(hot.getData())
    expect(mpanel.innerText).to.not.have.string('has been added to file')
  })

  it('checks a loaded CSV and returns prompt on first discovery of ragged row', function () {
    var data = [
      ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      ['2014', 10, 11, 12, 13],
      ['2015', 20, 11, 14],
      ['2016', 30, 15, 12, 13]
    ]

    hot.loadData(data)
    raggedRows.fixRaggedRows(hot.getData(), true)
    expect(mpanel.innerText).to.have.string('has been added to file')
  })

  it('ragged array and yes to prompt equates to change on HandsOnTable object', function () {
    var data = [
      ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      ['2014', 10, 11, 12, 13],
      ['2015', 20, 11, 14],
      ['2016', 30, 15, 12, 13]
    ]

    hot.loadData(data)
    raggedRows.fixRaggedRows(hot.getData(), true)
    expect(mpanel.innerText).to.have.string('has been added to file')
  })

  it('if ragged rows present and user consent it parses the entire CSV', function () {
    var data = [
      ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      ['2014', 10, 11, 12, 13],
      ['2015', 20, 11, 14],
      ['2016', 30, 15, 12, 13],
      ['2014', 10, 11, 12, 13],
      ['2015', 20, 11, 14],
      ['2016', 30, 15, 12, 13]
    ]

    hot.loadData(data)
    raggedRows.fixRaggedRows(hot.getData(), true)
    expect(mpanel.innerText).to.have.string('has been added to file')
  })
})
