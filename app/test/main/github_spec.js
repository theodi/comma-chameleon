process.env.NODE_ENV = 'test'

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var github = require('./../../browser/github')
var sinon = require('sinon')

var Fs = require('fs');
var BrowserWindow = require('browser-window');

describe('github', function() {

  describe('checkForAPIKey', function() {
    it('extracts the API key from a URL', function() {
      url = 'http://octopub.herokuapp.com/redirect?api_key=foobarbaz'
      expect(github._private.checkForAPIKey(url)[0]).to.eq(url)
      expect(github._private.checkForAPIKey(url)[1]).to.eq('foobarbaz')
    })

    it('returns nothing when the url does not match', function() {
      url = 'http://octopub.herokuapp.com/foo'
      expect(github._private.checkForAPIKey(url)).to.eq(null)
    })
  })

  describe('writeData', function() {
    it('writes a data to a file', function() {
      data = 'here,is,some,data'
      path = github._private.writeData(data)
      expect(Fs.readFileSync(path, 'utf8')).to.eq(data)
    })
  })

  describe('postData', function() {
    it('posts data to the right place', function() {
      dataset = {
        "name": 'My awesome dataset',
        "description": 'My awesome description',
        "publisher-name": "Publisher Name",
        "publisher-url": "http://example.com",
        "license": "CC-ZERO",
        "frequency": "monthly"
      }

      file = __dirname + '/../fixtures/fixture.csv';

      stub = sinon.stub(github._private.request, 'post')

      github._private.postData(dataset, file, "bogus-key")

      expect(stub.calledWithMatch({
        url: 'http://octopub.herokuapp.com/datasets',
        json: true,
        formData: {
         'api_key': 'bogus-key',
         'dataset[name]': 'My awesome dataset',
         'dataset[description]': 'My awesome description',
         'dataset[publisher-name]': 'Publisher Name',
         'dataset[publisher-url]': 'http://example.com',
         'dataset[license]': 'CC-ZERO',
         'dataset[frequency]': 'monthly',
         'files[][title]': 'a file',
         'files[][description]': 'some words',
         'files[][file]': sinon.match.instanceOf(Fs.ReadStream)
        }
      })).to.eq(true)

    })
  })

})
