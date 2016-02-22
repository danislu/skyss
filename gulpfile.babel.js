const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const paths = {
    source: ['./src/**/*.js'],
    output: './lib',
    tests: ['./lib/tests/**/*.js']
};

gulp.task('lint', () => {
    return gulp.src([...paths.source, '!node_modules/**', '!./lib/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['lint'], (done) => {
    gulp.src(paths.source)
    	.pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .on('error', (e) => {
            gutil.log(e);
            done();
        })
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.output))
        .on('end', done);
});

gulp.task('test', ['build'], () => {
    return gulp.src(paths.tests)
        .pipe(mocha({ reporter: 'dot' }));
});

gulp.task('watch', ['test'], () => {
    return gulp.watch(paths.source, ['test']);
});
