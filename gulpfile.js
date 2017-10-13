var gulp        = require('gulp');
var watchify    = require('watchify');
var babel       = require('babelify');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var utilities   = require('gulp-util');
var del         = require('del');
var jshint      = require('gulp-jshint');
var browserSync = require('browser-sync').create();

var lib         = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var buildProduction = utilities.env.production;


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js', './js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});


//using vinyl-source-stream: 
gulp.task('browserify', ['concatInterface'], function() {
  var bundleStream = browserify('./tmp/allConcat.js')
    .transform(babel.configure({
      presets: ["es2015"]
    }))
 
  bundleStream
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task("minifyScripts", ['browserify'], function(){
  return gulp.src("./build/js/app.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"))
});

gulp.task('cssBuild', function(){
  return gulp.src(['css/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./build/css'))
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
  gulp.start('bower');
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

gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

gulp.task('jsBuild', ['browserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});







