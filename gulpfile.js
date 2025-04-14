const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function scripts() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

function styles() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

function images() {
    return gulp.src([
        './src/images/**/*',
        './dist/images/**/*'
    ])
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

function clean(cb) {
    const fs = require('fs');
    const path = require('path');
    const distPath = path.join(__dirname, 'dist');
    
    if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true, force: true });
    }
    cb();
}

// Task de build
exports.build = gulp.series(
    clean,
    gulp.parallel(
        styles,
        scripts,
        images,
        fonts
    ),
    html
);

// Task padrão
exports.default = exports.build;

// Task de watch para desenvolvimento
exports.watch = function() {
    gulp.watch('./src/styles/**/*.scss', styles);
    gulp.watch('./src/scripts/**/*.js', scripts);
    gulp.watch('./*.html', html);
    gulp.watch('./src/images/**/*', images);
    gulp.watch('./assets-fonts/**/*', fonts);
};