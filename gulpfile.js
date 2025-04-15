import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

const sass = gulpSass(dartSass);

function scripts() {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
}

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed' }))
        .pipe(gulp.dest('./css'));
}

function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
}

function moveHTML() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./'));
}

export const build = gulp.parallel(styles, images, scripts, moveHTML);

export const watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./src/index.html', gulp.parallel(moveHTML));
}

export default build;