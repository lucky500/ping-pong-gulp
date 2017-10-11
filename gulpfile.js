var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del  = require('del');
var jshint = require('gulp-jshint');
var lib = require('bower-files')();

var buildProduction = utilities.env.production;


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js', './js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});


// gulp.task('browserify', ['concatInterface'], function() {
//   return browserify({ entries: ['./tmp/allConcat.js'] })
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('./build/js'));
// });

//using vinyl-source-stream: 
gulp.task('browserify', ['concatInterface'], function() {
  var bundleStream = browserify('./tmp/allConcat.js').bundle()
 
  bundleStream
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task("minifyScripts", ['browserify'], function(){
  return gulp.src("./build/js/app.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"))
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});;

gulp.task("build", ["clean"], function(){
  if (buildProduction){
    gulp.start('minifyScripts');
  } else {
    gulp.start('browserify');
  }
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});



