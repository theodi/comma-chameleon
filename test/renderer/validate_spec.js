process.env.NODE_ENV = 'test'

var chai = require('chai')

var assert = chai.assert
var expect = chai.expect
var should = chai.should();

var validate = require('./../../comma-chameleon/validate');
var $ = require('./../../bower_components/jquery/dist/jquery.js');

before(function(){
  $(document.body).append("<div id='editor'></div>")
  $(document.body).append("<div id='message-panel'></div>")
})

describe("displayValidationMessages", function() {

  beforeEach(function() {
      validation = {
        "url": "http://csvlint.io/validation/571742a0637376726f000192",
        "source": null,
        "state": "warnings",
        "errors": [],
        "warnings": [
          {
            "type": "inconsistent_values",
            "category": "schema",
            "row": null,
            "col": 13
          },
          {
            "type": "inconsistent_values",
            "category": "schema",
            "row": null,
            "col": 23
          }
        ],
        "info": [
          {
            "type": "assumed_header",
            "category": "structure",
            "row": null,
            "col": null
          }
        ],
        "standardisedCSV": "http://csvlint.io/validation/571742a0637376726f000192.csv",
        "badges": {
          "svg": "http://csvlint.io/validation/571742a0637376726f000192.svg",
          "png": "http://csvlint.io/validation/571742a0637376726f000192.png"
        }
      }

    })

    it('should display validation results', function() {
      validate._private.displayValidationMessages(validation)
      expect($('#message-panel').html()).to.have.string('Validation result')
      expect($('#message-panel img').attr('src')).to.equal('http://csvlint.io/validation/571742a0637376726f000192.png')
      expect($('#message-panel p').html()).to.have.string('0 errors, 2 warnings and 0 info messages')
      expect($('#message-panel div:eq(0)').html()).to.have.string('<h5>Inconsistent value</h5><p>The data in column M is inconsistent with others values in the same column.\n</p>')
      expect($('#message-panel div:eq(1)').html()).to.have.string('<h5>Inconsistent value</h5><p>The data in column W is inconsistent with others values in the same column.\n</p>')
    })

    it('should display a message is the CSV is valid', function() {
      validation.warnings = []
      validation.errors = []
      validation.info = []
      validate._private.displayValidationMessages(validation)
      expect($('#message-panel').html()).to.have.string('CSV Valid!')
    })

    it('does not display minus info messages', function() {
      validation.info = []
      validate._private.displayValidationMessages(validation)
      expect($('#message-panel p').html()).to.have.string('0 errors, 2 warnings and 0 info messages')
    })

})

describe('numToCol', function() {

  it('returns a single lettered column', function() {
    expect(validate._private.numToCol(6)).to.equal("F")
    expect(validate._private.numToCol(1)).to.equal("A")
  })

  it('returns a double lettered column', function() {
    expect(validate._private.numToCol(27)).to.equal("AA")
    expect(validate._private.numToCol(32)).to.equal("AF")
    expect(validate._private.numToCol(58)).to.equal("BF")
  })

})
