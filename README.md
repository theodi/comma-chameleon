[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)
[![Build Status](https://travis-ci.org/theodi/comma-chameleon.svg?branch=master)](https://travis-ci.org/theodi/comma-chameleon)
[![Dependency Status](https://dependencyci.com/github/theodi/comma-chameleon/badge)](https://dependencyci.com/github/theodi/comma-chameleon)

# Comma Chameleon

[Comma Chameleon](https://comma-chameleon.io/) is a desktop CSV editor (built with [Electron.js](electron.atom.io)) that provides a simple interface for editing data.

See <https://comma-chameleon.io/> for features and screenshots or download the app and start using it now!

Follow the [public feature roadmap for Comma Chameleon](https://trello.com/b/2xc7Q0kd/labs-public-toolbox-roadmap?menu=filter&filter=label:Comma%20Chameleon)

## Summary of features

Validate your CSV on the fly using [CSVlint](http://csvlint.io/), so you can be sure your data is reuse-ready before you publish it  
Comma Chameleon lets you export your data as a [Data Package](http://data.okfn.org/doc/data-package), ready for publication and reuse  
Integrate with [Octopub](https://octopub.io/) and publish your data to Github  

## Download and Install App

Choose a platform from the [Releases page](https://github.com/theodi/comma-chameleon/releases/latest).

Drag the application to your applications folder. If you encounter a warning message informing you the application cannot be opened due to emanating from an unknown developer try the following. This occurs due to Mac OS quarantining applications where it cannot determine the certificate used to sign the application.  
Steps:

Right click the app, then option+click on Open.

### Development

#### Requirements

[`node` and `npm`](https://nodejs.org/en/download/)

You can use npm to install all relevant packages and development dependencies using the following set of commands.  Node and Bower install the dependencies contained in `package.json` and `bower.json` respectively

```
npm install -g bower electron
npm install
bower install
```

#### External (non-JS) dependencies

Comma Chameleon relies on [CSVlint.sh](https://github.com/theodi/csvlint.sh) to carry out CSV validation. This is not included in the repo, and is downloaded and installed by the [build.js](https://github.com/theodi/comma-chameleon/blob/master/scripts/build.js) script. As with the page build script, this script is also run when the app is started with the `npm start` command.

#### Development: Running the full application locally

To open the app run:

```
npm start
```

This will download the non-JS dependencies (namely [CSVlint.sh](https://github.com/theodi/csvlint.sh)), build the [handlebars](http://handlebarsjs.com/) views (from `comma-chameleon/views-content`) and start the app.


#### Application Architecture

Comma Chameleon is built using [Electron.js](electron.atom.io), a framework that allows developers to build desktop applications using web technology.

There are two parts of the application, the main process and the renderer process. The main process deals with things like carrying out file operations, validating CSVs, rendering views, and exporting to Github. The renderer acts very much like client side JS in a web browser, dealing with things like presentation, and user interactions.

##### IPC messaging

Electron passes and listens for messages between main and renderer using the IPC module, one for the [main process](https://github.com/electron/electron/blob/master/docs/api/ipc-main.md) and one for the [renderer process](https://github.com/electron/electron/blob/master/docs/api/ipc-renderer.md).

For example, when importing an Excel file, the main process [reads the Excel file](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L7) and [opens a new window in the renderer process](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L12). Once the window has opened, the main process [sends the worksheet names to the renderer process](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L14), which are then [displayed to the user](https://github.com/theodi/comma-chameleon/blob/master/views/views-content/select_worksheet.html#L18). Once a user selects a worksheet, the renderer process [sends a message back to the main process](https://github.com/theodi/comma-chameleon/blob/master/views/views-content/select_worksheet.html#L27), and the main process [converts the relevant worksheet to CSV and loads it into a new window](https://github.com/theodi/comma-chameleon/blob/master/main/excel.js#L17).

##### Views

To keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), the HTML views are written using [Handlebars](http://handlebarsjs.com/), see the [`views-content`](https://github.com/theodi/comma-chameleon/blob/master/views/views-content) folder. The views are then built using the [page-build.js](https://github.com/theodi/comma-chameleon/blob/master/scripts/page-build.js) script, which also gets run when the app is started with the `npm start` command.

### Tests

[Electron-Mocha](https://github.com/jprichardson/electron-mocha) has been adopted for testing, it enables both DOM and node.js testing and provides command line options to enable testing of both.

Assuming you have installed `electron-mocha` globally (via `npm i electron-mocha -g`), you can run the tests like this:

```
npm test
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

### Deployment: Packaging

#### Building a new package

(This assumes you're running OSX)

[Install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
```
brew install wine # This allows us to specify the icon for Windows pacakges
npm i electron-packager -g
gulp build
```

You can also build a package for a specific platform by running `gulp build --platform={one of 'linux', 'darwin' or 'win32'}`.
