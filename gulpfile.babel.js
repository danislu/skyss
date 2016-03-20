require('babel-core/register');

const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const paths = {
    source: ['./src/**/*.js'],
    output: './lib',
    tests: ['./lib/tests/**/*.js'],
    lintExcludes: ['!node_modules/**', '!./lib/**'],
    clean: ['./lib/**/*.*']

};

gulp.task('lint', () => {
    return gulp.src([...paths.source, ...paths.lintExcludes])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('clean', ()=>{
    return gulp.src(paths.clean)
        .pipe(clean());
});

gulp.task('prod-build', ['clean'], (done)=>{
    gulp.src(paths.source)
        .pipe(babel({ presets: ['es2015'] }))
        .on('error', (e) => {
            gutil.log(e);
            done();
        })
        .pipe(gulp.dest(paths.output))
        .on('end', done);
});

gulp.task('build', ['lint', 'clean'], (done) => {
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

gulp.task('watch', () => {
    return gulp.watch(paths.source, ['test']);
});
