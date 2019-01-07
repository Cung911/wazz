var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');


// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("dist/assets/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist",
        open: false
    });

    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/**/*.jade', ['jade'])
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('dist/assets/css/'))
})

gulp.task('jade', function(){
  gulp.src('./src/templates/*.jade')
  .pipe(jade({
    pretty:true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js','serve', 'fa', 'fonts', 'jade']);
