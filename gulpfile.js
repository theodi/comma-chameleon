var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;
var argv = require('yargs').argv

var build = require('./scripts/build')
var pageBuild = require('./scripts/page-build')

gulp.task('page-build', function() {
  pageBuild.start();
});

gulp.task('build', function() {
  if (argv.platform == undefined) {
    build.cleanup();
    build.buildAll();
    build.zipPackages();
  } else {
    build.cleanup();
    build.buildPlatform(argv.platform);
    build.zipPackages();
  }
});

gulp.task('prebuild', function() {
  if (!fs.existsSync('./bin')) build.getCSVLint(require('os').platform())
  pageBuild.start();
});
