var syntax         = 'sass', // Syntax: sass or scss;
		gulpVersion    = '4'; // Gulp version: 3 or 4
		gmWatch        = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
		imageResize   = require('gulp-image-resize'),
		imagemin      = require('gulp-imagemin'),
		del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src(syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError())) //формат компилирования nasted(вложенный), expanded(развернутый), compact(компактный), compressed(сжатый .min.css)
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('css'))
	.pipe(gulp.dest('_site/css'))
	.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'libs/jquery/dist/jquery.min.js',
		'libs/likely/likely.js',
		'libs/prognroll/prognroll.js',
		'js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('js'))
	.pipe(gulp.dest('_site/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('*.html')
	.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function() {
	return gulp.src('_site/**')
	.pipe(rsync({
		root: '_site/',
		hostname: 'shvets@alshvets.ru',
		destination: 'alshvets/public_html/',
		include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});


// Images @x1 & @x2 + Compression | Required graphicsmagick (sudo apt update; sudo apt install graphicsmagick)
gulp.task('img1x', function() {
	return gulp.src('img/_src/**/*.*')
	.pipe(imageResize({ width: '50%' }))
	.pipe(imagemin())
	.pipe(gulp.dest('img/@1x/'))
});
gulp.task('img2x', function() {
	return gulp.src('img/_src/**/*.*')
	.pipe(imageResize({ width: '100%' }))
	.pipe(imagemin())
	.pipe(gulp.dest('img/@2x/'))
});

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['img/@*'], { force:true })
});

// If Gulp Version 3
if (gulpVersion == 3) {

	// Img Processing Task for Gulp 3
	gulp.task('img', ['img1x', 'img2x']);
	
	var taskArr = ['styles', 'scripts', 'browser-sync'];
	gmWatch && taskArr.unshift('img');

	gulp.task('watch', taskArr, function() {
		gulp.watch(syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(['libs/**/*.js', 'js/common.js'], ['scripts']);
		gulp.watch('*.html', ['code']);
		gmWatch && gulp.watch('img/_src/**/*', ['img']);
	});
	gulp.task('default', ['watch']);

};

// If Gulp Version 4
if (gulpVersion == 4) {

	// Img Processing Task for Gulp 4
	gulp.task('img', gulp.parallel('img1x', 'img2x'));

	gulp.task('watch', function() {
		gulp.watch(+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'js/common.js'], gulp.parallel('scripts'));
		gulp.watch(['*.html', '_site/**/*.html'], gulp.parallel('code'));
		gmWatch && gulp.watch('img/_src/**/*', gulp.parallel('img')); // GraphicsMagick watching image sources if allowed.
	});
	gmWatch ? gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch')) 
					: gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));

};
