var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');

// gulp.task('bundle', () => {
//     return browserify({
//         extensions: ['.js', '.jsx'],
//         entries: './src/index.js',
//     })
//     .transform(babelify.configure({
//         ignore: /(node_modules)/
//     }))
//     .bundle()
//     .on("error", (err) => { console.log("Error : " + err.message); })
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('babel', () => {
    return gulp.src('./src/jsx/**/*.jsx')
            .pipe(babel())
            .pipe(gulp.dest('./dist/js/'))
});

gulp.task('copy-index', () => {
    return gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist'));
});

gulp.task('style', () => {
    return gulp.src('./src/sass/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.scss', ['style']);
    gulp.watch('./src/jsx/**/*.jsx', ['babel']);
    gulp.watch('./src/index.js', ['babel']);
    gulp.watch('./src/index.html', ['copy-index']);
})

gulp.task('default', ['babel', 'copy-index', 'style']);