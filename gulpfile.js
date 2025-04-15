import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

const sass = gulpSass(dartSass);

function scripts() {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/dist/js'))
}

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed' }))
        .pipe(gulp.dest('./build/dist/css'));
}

function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/dist/images'));
}

function html() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
}

function clean(cb) {
    return gulp.src('./build', {allowEmpty: true})
        .pipe(gulp.dest('./build'));
}

export const build = gulp.series(clean, gulp.parallel(styles, images, scripts, html));

export const watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./src/index.html', gulp.parallel(html));
}

export default build;