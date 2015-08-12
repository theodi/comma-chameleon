A provisional fork from https://github.com/szwacz/electron-boilerplate, to get a unified way of running tests in electron

Setup

`brew install node`  
`npm install bower jasmine electron-prebuilt -g`

in root dir run `npm install`

`cd app/`

run `npm install` then `bower install`

cd ..

within root dir again run `npm start` - this is different than using electron . as 'electron prebuilt' is not implemented here

This fork was conducted to implement an end to end testing solution with Jasmine. The example tests in app/hello_world function
Integration with handsontables existing test suite is more difficult as they use a bespoke way of testing their jquery
Confirmation that electron tests pass is pending a documentation request with that principal repo
