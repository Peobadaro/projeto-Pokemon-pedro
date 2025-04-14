const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify');

function scripts() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function styles() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));
}

function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function html() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
}

function fonts() {
    return gulp.src('./assets-fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
}

// Função para copiar arquivos estáticos adicionais
function static() {
    return gulp.src([
        './src/images/**/*',
        './src/fonts/**/*',
        './src/icons/**/*'
    ], { base: './src' })
    .pipe(gulp.dest('./dist'));
}

// Task de build
exports.build = gulp.series(
    gulp.parallel(styles, images, scripts, fonts),
    html,
    static
);

// Task padrão
exports.default = exports.build;

// Task de watch para desenvolvimento
exports.watch = function() {
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/**/*.js', gulp.parallel(scripts));
    gulp.watch('./*.html', gulp.parallel(html));
    gulp.watch('./src/images/**/*', gulp.parallel(images));
    gulp.watch('./assets-fonts/**/*', gulp.parallel(fonts));
};