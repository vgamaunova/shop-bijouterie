 var gulp = require('gulp'),
    arg = require('yargs').argv,
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    vfs = require('vinyl-fs'),
    argv = require('yargs').argv,
    reload = browserSync.reload,
    connect = require('gulp-connect'),
    concat = require('gulp-concat');


var path = {
    build: {
        html: 'assets/',
        js: 'assets/js/',
        css: 'css/',
        img: 'assets/images/',
        fonts: 'assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        sass: 'scss/*.scss',
        img: 'src/images/*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        sass: 'scss/**/*.scss',
        img: 'src/images/*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './assets'
};



gulp.task('sass', function () {
    var minify = (arg.minifycss === true);

    gulp.src(path.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(minify, minifyCSS({keepBreaks: true})))
        .pipe(gulp.dest(path.build.css))
});


gulp.task('build', [
    'sass'
]);

gulp.task('watch', function(){
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass');
    });
});
gulp.task('default', [
    'build',
    'watch'
]);