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



var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
gulp.task('handle_js',_=>gulp
	.src(['./file1/1.js', './file2/2.js'])
				.pipe(plumber())		
				.pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./'))
);





gulp.task('default',[
	// 'stylus_task',
	// 'html-min',
	'handle_js',
	'watcher',
],function(){
	console.log("Finished the dependances calling");
});

gulp.task('watcher',function(){
	// gulp.watch("./**/*.styl",['stylus_task']);
	gulp.watch("./**/*.js",['handle_js']);
	return false;			
});


