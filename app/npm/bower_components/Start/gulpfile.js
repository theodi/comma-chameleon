"use strict";

var gulp = require('gulp');

var clean = require('gulp-clean');
var compass = require('gulp-compass'); 
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify'); 
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var ftp = require('gulp-ftp');

// ---- AppConfig ---- //

var appConfig = {
    dev: {
        scss: 'public/dev/scss/',
        js: 'public/dev/js/',
        img: 'public/dev/img/',
    },
    assets: {
        css: 'public/assets/css/',
        js: 'public/assets/js/',
        img: 'public/assets/img/',
    },
    ftp : {
        host: '' ,
        user: '',
        pass: '',
        remotePath: '',
    },
}

// ---- Compile and Minify ---- //

gulp.task('css', function() {
    gulp.src(appConfig.dev.scss + '*.scss')
        .pipe(compass({
            css: appConfig.assets.css,
            sass: appConfig.dev.scss,
            image: appConfig.assets.img
        }))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(appConfig.assets.css))
        .pipe(notify('Task CSS was executed successfully'))
        .pipe(livereload());
});


// ---- Lint, Concat and Minify ---- //

gulp.task('js', function() {
    gulp.src(appConfig.dev.js + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(appConfig.assets.js))
        .pipe(notify('Task JS was executed successfully'))
        .pipe(livereload());
});

// ---- Compress img ---- //

gulp.task('img', function () {
    gulp.src(appConfig.dev.img + '**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(appConfig.assets.img))
        .pipe(notify('Task IMG was executed successfully'))
        .pipe(livereload());
});

// ---- Deploy FTP ---- //

gulp.task('deploy', function () {
    gulp.src('src/*')
        .pipe(ftp({
            host: appConfig.ftp.host,
            user: appConfig.ftp.user,
            pass: appConfig.ftp.pass,
            remotePath: appConfig.ftp.remotePath
        }))
        .pipe(notify('Task DEPLOY was executed successfully'));
});

gulp.task('watch', function() {
    gulp.watch(appConfig.dev.js + '**/*.js', ['js']);
    gulp.watch(appConfig.dev.scss + '**/*.scss', ['css']);
    gulp.watch(appConfig.dev.img + '**/*', ['img']);
});
