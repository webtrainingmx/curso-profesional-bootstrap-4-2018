// Styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Gulp
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('build:styles', ['sass:compiled']);

// Watch Tasks
gulp.task('watch', () => {
  gulp.watch(['src/scss/**/*.scss'], ['sass:compiled']);
});

/**
 * Sass Tasks
 */

gulp.task('sass:compiled', () => {
  function buildStyles(prod) {
    return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(
        sass({
          outputStyle: prod ? 'compressed' : 'expanded',
        }).on('error', sass.logError)
    )
    .pipe(
        autoprefixer({
          browsers: ['> 1%', 'last 2 versions'],
        })
    )
    .pipe(
        rename(filePath => {
          if (filePath.basename === 'main') {
            filePath.basename = 'all-styles';
          }
          if (prod) {
            filePath.extname = `.min${filePath.extname}`;
          }
        })
    )
    .pipe(
        sourcemaps.write('.', {
          includeContent: false,
          sourceRoot: '../src',
        })
    )
    .pipe(gulp.dest('dist/css'));
  }

  buildStyles(); // Expanded CSS
  buildStyles(true); // Minified CSS
});