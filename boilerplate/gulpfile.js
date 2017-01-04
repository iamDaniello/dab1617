var gulp        = require('gulp'),
    inject      = require('gulp-inject'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    bowerFiles  = require('main-bower-files'),

    path        = require('path');

gulp.task('default', ['scss', 'libraries', 'index']);

gulp.task('index', ['assets.copy', 'app.copy'], function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('./app/**/*.mustache'), {
            transform: function(filepath, file) {
                return '\r\n<script id="' + path.basename(filepath,'.mustache') + '" type="text/mustache">\r\n'
                    + (file.contents.toString())
                    + '\r\n</script>';
            }
        }))
        //todo: remove need for injection later
        .pipe(inject(gulp.src(['./build/js/assets/**/*.js'], {read: false}), {
            name: 'assets',
            ignorePath: 'build',
            addRootSlash : false}))
        .pipe(inject(gulp.src(['./build/js/app/*/**/*.js', './build/js/app/app.js'], {read: false}), {
            name: 'app',
            ignorePath: 'build',
            addRootSlash : false}))

        .pipe(gulp.dest('./build'));
});

gulp.task('libraries', function() {
    return gulp.src(bowerFiles({filter: '**/*.js'}))
        .pipe(concat('ext.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('scss', function() {
    return gulp.src('./main.scss')
        .pipe(inject(gulp.src(bowerFiles({filter: '**/*.scss'}), {read: false}), {name: 'bower', relative : true}))
        .pipe(inject(gulp.src(['./app/**/*.scss', '!./app/app.scss'], {read: false}), {name: 'app', relative : true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

//todo: replace copy and injection by proper concatenation and uglification with source maps
gulp.task('assets.copy', function() {
    return gulp.src('./assets/js/**/*.js')
        .pipe(gulp.dest('./build/js/assets'));
});

gulp.task('app.copy', function() {
    return gulp.src('./app/**/*.js')
        .pipe(gulp.dest('./build/js/app'));
});