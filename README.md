[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)
[![Build Status](https://travis-ci.org/theodi/comma-chameleon.svg?branch=master)](https://travis-ci.org/theodi/comma-chameleon)
[![Dependency Status](https://dependencyci.com/github/theodi/comma-chameleon/badge)](https://dependencyci.com/github/theodi/comma-chameleon)

# Comma Chameleon

A desktop CSV editor with validation magic - Built with electron.js

## Download app

Choose a platform from the [Releases page](https://github.com/theodi/comma-chameleon/releases/latest)

## Development setup

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

## Architecture

Comma Chameleon is built using [Electron.js](electron.atom.io), a framework that allows developers to build desktop applications using web technology.

There are two parts of the application, the main process and the renderer process. The main process deals with things like carrying out file operations, validating CSVs, rendering views, and exporting to Github. The renderer acts very much like client side javascript in a web browser, dealing with things like presentation, and user interactions.

### IPC messaging

Electron passes and listens for messages between main and renderer using the IPC module, one for the [main process](https://github.com/electron/electron/blob/master/docs/api/ipc-main.md) and one for the [renderer process](https://github.com/electron/electron/blob/master/docs/api/ipc-renderer.md).

For example, when importing an Excel file, the main process [reads the Excel file](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L7) and [opens a new window in the renderer process](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L12). Once the window has opened, the main process [sends the worksheet names to the renderer process](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L14), which are then [displayed to the user](https://github.com/theodi/comma-chameleon/blob/master/views/views-content/select_worksheet.html#L18). Once a user selects a worksheet, the renderer process [sends a message back to the main process](https://github.com/theodi/comma-chameleon/blob/master/views/views-content/select_worksheet.html#L27), and the main process [converts the relevant worksheet to CSV and loads it into a new window](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L17).

### Views

To keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), the HTML views are written using [Handlebars](http://handlebarsjs.com/), see the [`views-content`](https://github.com/theodi/comma-chameleon/blob/master/views/views-content) folder. The views are then built using the [page-build.js](https://github.com/theodi/comma-chameleon/blob/master/scripts/page-build.js) script, which also gets run when the app is started with the `npm start` command.

### External (non-js) dependencies

Comma Chameleon relies on [CSVlint.sh](https://github.com/theodi/csvlint.sh) to carry out CSV validation. This is not included in the repo, and is downloaded and installed by the [build.js](https://github.com/theodi/comma-chameleon/blob/master/scripts/build.js) script. As with the page build script, this script is also run when the app is started with the `npm start` command.

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
