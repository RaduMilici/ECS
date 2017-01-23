var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');

//browserify--------------------------------------------------------------------
gulp.task('browserify', function() {
  gulp.src('./project/main.js')
      .pipe(browserify({ 
        insertGlobals : false
      }))
      .pipe(gulp.dest('./build')) 
      .pipe(livereload()) 
});
//watch-------------------------------------------------------------------------
gulp.task('watch', function(){
    gulp.watch(['*.js', '*/*.js'], ['browserify']);
});

gulp.task('default', ['watch']);