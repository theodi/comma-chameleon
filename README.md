[![Stories in Ready](https://badge.waffle.io/theodi/edward-csvhands.svg?label=ready&title=Ready)](http://waffle.io/theodi/edward-csvhands)

# Comma Chameleon

A desktop CSV editor with validation magic - Built with electron.js

## Setup

```
brew install node
cd app/
npm install
bower install
```

Then to open the app run:

```
electron .
```

## Building a new package

(This assumes you're running OSX)

```
brew install wine # This allows us to specify the icon for Windows pacakges
npm i electron-packager -g
electron-packager app/ comma-chameleon --platform=all --arch=all --version=0.30.4 --icon=resources/icon.icns --out=packages --overwrite
```
