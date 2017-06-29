/**
 * Gulpfile
 */

var minify = require('gulp-minify');
 
gulp.task('default', function() {
  gulp.src('lib/*.js')
    .pipe(minify({
        ext:{
            src:'/assets/*.js',
            min:'.js'
        },
        exclude: ['lib'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});