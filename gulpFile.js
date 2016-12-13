var gulp = require('gulp');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var htmlmin = require('gulp-html-minifier');



gulp.task('stylus_task',_=>gulp
	.src('./app/**/*.styl')
	.pipe(plumber())		
 .pipe(stylus({compress: true,linenos: true,'include css': true}))
	.pipe(autoprefixer('last 10 versions'))
	.pipe(minifycss())
	.pipe(gulp.dest('./app/'))
);




gulp.task('html-min',_=>gulp
	.src('./src/app/*.*')
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	removeComments: true,
    	minifyJS: true,
    	minifyCSS: true
    }))
    .pipe(gulp.dest('./dist/app'))
);



gulp.task('default',[
	'stylus_task',
	// 'html-min',
	'watcher',
],function(){
	console.log("Finished the dependances calling");
});

gulp.task('watcher',function(){
	gulp.watch("./**/*.styl",['stylus_task']);
	return false;			
});


