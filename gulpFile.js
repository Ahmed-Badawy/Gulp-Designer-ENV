var gulp = require('gulp');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var htmlmin = require('gulp-html-minifier');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");





gulp.task('stylus_task',_=>gulp
	.src(['./src/css/-load.styl'])
					.pipe(plumber())		
				 .pipe(stylus({compress: true,linenos: true,'include css': true}))
					.pipe(autoprefixer('last 10 versions'))
					.pipe(minifycss())
					.pipe(rename('main.css'))
	.pipe(gulp.dest('./dest/css/'))
);


gulp.task('html_min',_=>gulp
	.src('./dest/**/*.html')
				.pipe(plumber())		
    .pipe(htmlmin({
				    	collapseWhitespace: true,
				    	removeComments: true,
				    	minifyJS: true,
				    	minifyCSS: true
    }))
    .pipe(gulp.dest('./dest/'))
);


gulp.task('js_min',_=>gulp
	.src('./dest/**/*.js')
				.pipe(plumber())		
				.pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./dest/'))
);



gulp.task('concat_css',_=>gulp
	.src('./src/**/*.css')
				.pipe(plumber())		
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dest/'))
);
gulp.task('concat_js',_=>gulp
	.src('./src/**/*.js')
				.pipe(plumber())		
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dest/'))
);


gulp.task('file_include',_=>gulp.
		src(['./src/*.html'])
				.pipe(plumber())		
 			.pipe(fileinclude())
 .pipe(gulp.dest('./dest/'))
);




gulp.task('default',[
	'stylus_task',
	// 'html_min',
	// 'js_min',
	'file_include',
	// 'concat_css',
	// 'concat_js',
	'watcher',
],function(){
	console.log("Finished the dependances calling");
});

gulp.task('watcher',function(){
	gulp.watch("./src/**/*.styl",['stylus_task']);
	gulp.watch("./src/**/*.html",['file_include']);
	// gulp.watch("./src/**/*.js",['js_min']);
	return false;			
});













