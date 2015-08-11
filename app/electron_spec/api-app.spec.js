// Generated by CoffeeScript 1.9.3
(function() {
  var BrowserWindow, app, assert, remote;

  assert = require('assert');

  remote = require('remote');

  app = remote.require('app');

  BrowserWindow = remote.require('browser-window');

  describe('app module', function() {
    describe('app.getVersion()', function() {
      return it('returns the version field of package.json', function() {
        return assert.equal(app.getVersion(), '0.1.0');
      });
    });
    describe('app.setVersion(version)', function() {
      return it('overrides the version', function() {
        assert.equal(app.getVersion(), '0.1.0');
        app.setVersion('test-version');
        assert.equal(app.getVersion(), 'test-version');
        return app.setVersion('0.1.0');
      });
    });
    describe('app.getName()', function() {
      return it('returns the name field of package.json', function() {
        return assert.equal(app.getName(), 'Electron Boilerplate Test');
      });
    });
    describe('app.setName(name)', function() {
      return it('overrides the name', function() {
        assert.equal(app.getName(), 'Electron Boilerplate Test');
        app.setName('test-name');
        assert.equal(app.getName(), 'test-name');
        return app.setName('Electron Boilerplate Test');
      });
    });
    return describe('focus/blur event', function() {
      var w;
      w = null;
      beforeEach(function() {
        if (w != null) {
          w.destroy();
        }
        return w = new BrowserWindow({
          show: false,
          width: 400,
          height: 400
        });
      });
      afterEach(function() {
        if (w != null) {
          w.destroy();
        }
        return w = null;
      });
      return it('should emit focus event', function(done) {
        app.once('browser-window-blur', function(e, window) {
          assert.equal(w.id, window.id);
          return done();
        });
        app.once('browser-window-focus', function(e, window) {
          assert.equal(w.id, window.id);
          return w.emit('blur');
        });
        return w.emit('focus');
      });
    });
  });

}).call(this);
