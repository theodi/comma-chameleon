// Generated by CoffeeScript 1.9.3
(function() {
  var assert, clipboard, nativeImage, path;

  assert = require('assert');

  clipboard = require('clipboard');

  nativeImage = require('native-image');

  path = require('path');

  describe('clipboard module', function() {
    var fixtures;
    fixtures = path.resolve(__dirname, 'fixtures');
    describe('clipboard.readImage()', function() {
      return it('returns NativeImage intance', function() {
        var i, p;
        p = path.join(fixtures, 'assets', 'logo.png');
        i = nativeImage.createFromPath(p);
        clipboard.writeImage(p);
        return assert.equal(clipboard.readImage().toDataUrl(), i.toDataUrl());
      });
    });
    describe('clipboard.readText()', function() {
      return it('returns unicode string correctly', function() {
        var text;
        text = '千江有水千江月，万里无云万里天';
        clipboard.writeText(text);
        return assert.equal(clipboard.readText(), text);
      });
    });
    describe('clipboard.readHtml()', function() {
      return it('returns markup correctly', function() {
        var markup, text;
        text = '<string>Hi</string>';
        markup = process.platform === 'darwin' ? '<meta charset=\'utf-8\'><string>Hi</string>' : process.platform === 'linux' ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><string>Hi</string>' : '<string>Hi</string>';
        clipboard.writeHtml(text);
        return assert.equal(clipboard.readHtml(), markup);
      });
    });
    return describe('clipboard.write()', function() {
      return it('returns data correctly', function() {
        var i, markup, p, text;
        text = 'test';
        p = path.join(fixtures, 'assets', 'logo.png');
        i = nativeImage.createFromPath(p);
        markup = process.platform === 'darwin' ? '<meta charset=\'utf-8\'><b>Hi</b>' : process.platform === 'linux' ? '<meta http-equiv="content-type" ' + 'content="text/html; charset=utf-8"><b>Hi</b>' : '<b>Hi</b>';
        clipboard.write({
          text: "test",
          html: '<b>Hi</b>',
          image: p
        });
        assert.equal(clipboard.readText(), text);
        assert.equal(clipboard.readHtml(), markup);
        return assert.equal(clipboard.readImage().toDataUrl(), i.toDataUrl());
      });
    });
  });

}).call(this);
