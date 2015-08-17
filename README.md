[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)

# Comma Chameleon

A desktop CSV editor with validation magic - Built with electron.js

<<<<<<< HEAD
## Download app

Choose a platform:

* [OSX](https://raw.githubusercontent.com/theodi/comma-chameleon/master/packages/comma-chameleon-darwin-x64.tar.gz)
* [Linux 32 bit](https://raw.githubusercontent.com/theodi/comma-chameleon/master/packages/comma-chameleon-linux-ia32.tar.gz)
* [Linux 64 bit](https://raw.githubusercontent.com/theodi/comma-chameleon/master/packages/comma-chameleon-linux-x64.tar.gz)
* [Windows 32 bit](https://raw.githubusercontent.com/theodi/comma-chameleon/master/packages/comma-chameleon-win32-ia32.tar.gz)
* [Windows 64 bit](https://raw.githubusercontent.com/theodi/comma-chameleon/master/packages/comma-chameleon-win32-x64.tar.gz)

## Development setup

```
brew install node
npm install bower electron-prebuilt -g
cd app/
=======
## Setup

```
brew install node
npm install bower jasmine electron-prebuilt -g
npm install
bower install
```

Then to open the app run:

```
electron .
```
<<<<<<< HEAD

## Building a new package

(This assumes you're running OSX)

```
brew install wine # This allows us to specify the icon for Windows pacakges
npm i electron-packager -g
script/build
```

