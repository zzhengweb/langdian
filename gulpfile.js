/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
// var htmlmin = require('gulp-html-minifier');

gulp.task('scripts', (cb)=>{
	gulp.src('js/**/*.js')
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
		cb();
});

gulp.task('scripts-dist', (cb)=>{
	gulp.src('js/**/*.js')
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
		cb();
});

gulp.task('copy-html', (cb)=>{
	gulp.src('./*.html')
		// .pipe(htmlmin({removeComments: true,collapseWhitespace: true,minifyJS:true, minifyCSS:true}))
		.pipe(gulp.dest('./dist'));
		cb();
});

gulp.task('copy-images', (cb)=>{
	gulp.src('images/**/**/*')
	.pipe(cache(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/images'));
	cb();
});

gulp.task('styles', (cb)=>{
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
		cb();
});

gulp.task('lint', (cb)=>{
	return gulp.src(['js/**/*.js'])
	// eslint() attaches the lint output to the eslint property
	// of the file object so it can be used by other modules.
	.pipe(eslint())
	// eslint.format() outputs the lint results to the console.
	// Alternatively use eslint.formatEach() (see Docs).
	.pipe(eslint.format())
	// To have the process exit with an error code (1) on
	// lint error, return the stream and pipe to failOnError last.
	.pipe(eslint.failOnError());
});

gulp.task('tests', (cb)=>{
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
		cb();
});

gulp.task('dist', gulp.parallel(
	'copy-html',
'copy-images',
'styles',
'lint',
'scripts-dist'
));

gulp.task('default', gulp.series(
	gulp.parallel('copy-html', 'copy-images', 'styles', 'lint', 'scripts'),
	function() {
			gulp.watch('sass/**/*.scss',{ interval: 750 }, gulp.series('styles'));
			gulp.watch('js/**/*.js',{ interval: 750 }, gulp.series('lint'));
			gulp.watch('./*.html',{ interval: 750 }, gulp.series('copy-html'));
			gulp.watch('./*.images',{ interval: 750 }, gulp.series('copy-images'));
			gulp.watch('./dist/*.html').on('change', browserSync.reload);
			browserSync.init({
					server: './dist'
			});
	}
));