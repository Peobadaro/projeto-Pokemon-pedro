import gulp from 'gulp';
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

const sassCompiler = sass(dartSass);

function scripts() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

function styles() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sassCompiler({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}

function images() {
    return gulp.src([
        './src/images/**/*',
        './src/images/em_breve/**/*',
        './src/images/mais_populares/**/*',
        './src/images/mais_no_star_plus/**/*',
        './src/images/dispositivos/**/*',
        './src/images/icones/**/*',
        './src/images/logos/**/*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
}

function fonts() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
}

export const build = gulp.parallel(styles, images, scripts, html, fonts);
export default build;

export function watch() {
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/**/*.js', gulp.parallel(scripts));
    gulp.watch('./src/images/**/*', gulp.parallel(images));
    gulp.watch('./src/*.html', gulp.parallel(html));
    gulp.watch('./src/fonts/**/*', gulp.parallel(fonts));
}