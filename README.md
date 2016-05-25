[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)
[![Build Status](https://travis-ci.org/theodi/comma-chameleon.svg?branch=master)](https://travis-ci.org/theodi/comma-chameleon)

# Comma Chameleon

A desktop CSV editor with validation magic - Built with electron.js

## Download app

Choose a platform from the [Releases page](https://github.com/theodi/comma-chameleon/releases/latest)

##Development setup

you can use npm to install all relevant packages using the following set of commands
```
brew install node
npm install
npm install -g bower
bower install
```

Then to open the app run:

```
npm start
```

This will download the non-js dependencies (namely [CSVlint.sh](https://github.com/theodi/csvlint.sh)), build the [handlebars](http://handlebarsjs.com/) views (from `comma-chameleon/views-content`) and start the app.

## Testing

[Electron-Mocha](https://github.com/jprichardson/electron-mocha) has been adopted for testing, it enables both DOM and node.js testing and provides command line options to enable testing of both.

Assuming you have installed `electron-mocha` globally (via `npm i electron-mocha -g`), you can run the tests like this:

```
npm run test
```

Or to run the main and renderer tests separately, you can run:

```
npm run test-main  # run tests for the runtime components provided by Electron
npm run test-renderer # run tests that execute client side
```

Otherwise you can run:

```
electron-mocha test/main/
electron-mocha --renderer test/renderer/ # run tests that execute client side
```

## Building a new package

(This assumes you're running OSX)

```
brew install wine # This allows us to specify the icon for Windows pacakges
npm i electron-packager -g
gulp build
```

You can also build a package for a specific platform by running `gulp build --platform={one of 'linux', 'darwin' or 'win32'}`.
