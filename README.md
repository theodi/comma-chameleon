[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)
[![Build Status](https://travis-ci.org/theodi/comma-chameleon.svg?branch=master)](https://travis-ci.org/theodi/comma-chameleon)

# Comma Chameleon

A desktop CSV editor with validation magic - Built with electron.js

## Download app

Choose a platform:

* [OSX](https://github.com/theodi/comma-chameleon/releases/download/0.1.0/comma-chameleon-darwin-x64.tar.gz)
* [Linux 32 bit](https://github.com/theodi/comma-chameleon/releases/download/0.1.0/comma-chameleon-linux-ia32.tar.gz)
* [Linux 64 bit](https://github.com/theodi/comma-chameleon/releases/download/0.1.0/comma-chameleon-linux-x64.tar.gz)
* [Windows 32 bit](https://github.com/theodi/comma-chameleon/releases/download/0.1.0/comma-chameleon-win32-ia32.tar.gz)
* [Windows 64 bit](https://github.com/theodi/comma-chameleon/releases/download/0.1.0/comma-chameleon-win32-x64.tar.gz)

##Development setup

you can use npm to install all relevant packages using the following set of commands
```
brew install node
npm install
npm install -g bower
bower install --config.cwd=app/
```

Then to open the app run:

```
npm start
```

## Testing

[Electron-Mocha](https://github.com/jprichardson/electron-mocha) has been adopted for testing, it enables both DOM and node.js testing and provides command line options to enable testing of both.

Assuming you have installed `electron-mocha` globally (via `npm i electron-mocha -g`), you can run the tests like this:

```
npm run mocha-all
```

Or to run the main and renderer tests separately, you can run:

```
npm run mocha-main  # run tests for the runtime components provided by Electron
npm run mocha-renderer # run tests that execute client side
```

Otherwise you can run:

```
electron-mocha app/test/main/
electron-mocha --renderer app/test/renderer/ # run tests that execute client side
```

## Building a new package

(This assumes you're running OSX)

```
brew install wine # This allows us to specify the icon for Windows pacakges
npm i electron-packager -g
script/build
```
