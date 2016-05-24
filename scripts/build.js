'use strict';
let execSync = require('child_process').execSync;
let exec = require('child_process').exec;
let path = require('path');
var pageBuild = require('./page-build')

let csvlintVersion = '0.3.1'
let electronVersion = '1.0.1'

let platforms = {
  "darwin": 'csvlint-' + csvlintVersion + '-osx.tar.gz',
  "linux": 'csvlint-' + csvlintVersion + '-linux-x86.tar.gz',
  "win32": 'csvlint-' + csvlintVersion + '-win32.zip'
}

let getCSVLint = function(platform) {
  var filename = platforms[platform]
  execSync('curl -L -O --fail https://github.com/theodi/csvlint.sh/releases/download/'+ csvlintVersion +'/' + filename)
  if (platform == "win32") {
    execSync('unzip ' + filename)
    execSync('mv csvlint-'+ csvlintVersion +'-win32/ bin/')
    execSync('rm csvlint-'+ csvlintVersion +'-win32.zip')
  } else {
    execSync('mkdir bin/')
    execSync('tar -zxf '+ filename +' -C bin/ --strip=1')
    execSync('rm csvlint-'+ csvlintVersion +'-*.tar.gz')
  }
}

let buildPlatform = function(platform) {
  pageBuild.start()
  getCSVLint(platform)
  execSync('electron-packager . comma-chameleon --platform='+ platform +' --arch=all --version='+ electronVersion +' --icon=resources/icon.icns --out=packages --overwrite')
  execSync('rm -rf bin/')
}

let zipPackages = function() {
  var folders = execSync('find ./packages/* -maxdepth 0 -type d').toString().trim()
  var packages = folders.split("\n")
  var folderName

  packages.forEach((p) => {
    folderName = path.basename(p)
    execSync('tar -zcf ./packages/'+ folderName +'.tar.gz -C ./packages '+ folderName)
  })
}

let buildAll = function() {
  cleanup();

  Object.keys(platforms).forEach((platform) => {
    buildPlatform(platform)
  })
}

let cleanup = function() {
  execSync('rm -rf bin/')
}

module.exports = {
  buildAll,
  buildPlatform,
  zipPackages,
  cleanup,
  platforms,
  getCSVLint
};
