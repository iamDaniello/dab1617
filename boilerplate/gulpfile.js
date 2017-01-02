var gulp        = require('gulp'),
    inject      = require('gulp-inject'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    bowerFiles  = require('main-bower-files');

gulp.task('default', function() {
    console.log('gulp default task running...');
});

gulp.task('index', function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('dependencies', function() {
    return gulp.src(bowerFiles({filter: '**/*.js'}))
        .pipe(concat('ext.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});




//return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')