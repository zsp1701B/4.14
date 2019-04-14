let gulp = require('gulp');
let css = require('gulp-minify-css');
let js = require('gulp-uglify');
let server = require('gulp-webserver')
let scss = require('gulp-sass');
let concat = require('gulp-concat')

gulp.task('cssminify', () => {
    return gulp.src('./src/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(css())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('sassminify', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('jsminify', () => {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(js())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('webServer', () => {
    return gulp.src('.')
        .pipe(server({
            host: "169.254.19.20",
            post: 8080,
            livereload: true,
            open: true,
            fallback: 'src/index.html'
        }))
})

gulp.task('watch', () => {
    return gulp.watch('./src/scss/*.scss', gulp.series('sassminify'))
})

gulp.task('dev', gulp.series('sassminify', 'webServer', 'watch'))

gulp.task('build', gulp.parallel('cssminify', 'sassminify', 'jsminify'))