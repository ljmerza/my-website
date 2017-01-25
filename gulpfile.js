
var gulp = require('gulp'); // import gulp module
var browserSync = require('browser-sync').create(); // auto sync browser
var autoprefixer = require('gulp-autoprefixer'); // browser prefixer adding
var cssnano = require('gulp-cssnano'); // minify css
var plumber = require('gulp-plumber'); // error hiding
var concat = require('gulp-concat'); // merge files to make one
var sass = require('gulp-sass') // import sass compiler
var merge = require('merge-stream'); // merge streams
var sourcemaps = require('gulp-sourcemaps'); // generate source maps of sass
var notify = require('gulp-notify'); // notification messages
var uglify = require('gulp-uglify'); // minify js
var babel = require('gulp-babel'); // js complier
var del = require('del'); // delete dist files
var inject = require('gulp-inject'); // inject css/js links into html
var changed = require('gulp-changed'); // only grab changed files
var imagemin = require('gulp-imagemin'); // compress images

var config = require('./config'); // all parameters for gulp config
 

// Browser-sync task
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: config.browserSync.proxy,
        port: config.browserSync.port,
        notify: true
    });
});

// HTML tasks
gulp.task('html', function() {
	var sources = gulp.src(config.html.sources, {read: false}); // get injection sources
	var target = gulp.src(config.html.target) // get all html files

	return target
	.pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)})) // capture errors
    .pipe(inject(sources, {ignorePath: config.html.injectIgnore})) // inject css/js files into html - drop dist/ path from links
    .pipe(gulp.dest(config.html.destFolder)) // move then to dist folder
    .pipe(browserSync.reload({stream: true})) // reload browser
    .pipe(notify({ message: config.html.notifyMessage, onLast: true })); // notify me only on the last stream
});

// css tasks
gulp.task('css', function() {
	var cssStream = gulp.src(config.css.cssSrc); // get all css files
	var sassStream = gulp.src(config.css.sassSrc) // get all sass files
		.pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)})) // capture errors
		.pipe(sass().on('error', sass.logError)); 	// to combine sass and css we need to convert sass to css first

    return merge(sassStream, cssStream)
    	.pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)})) // capture errors
    	.pipe(sourcemaps.init()) // start source maps
    	.pipe(concat(config.css.destFile)) // put them all together in one file called s // add browser prefixestyle.css
    	.pipe(autoprefixer(config.css.autoprefixer)) // add browser prefixes
    	.pipe(cssnano()) // minify file
    	.pipe(sourcemaps.write(config.css.sourceMap)) // generate source maps
    	.pipe(gulp.dest(config.css.destFolder)) // add to dist folder
    	.pipe(browserSync.reload({stream:true})) // reload browser
    	.pipe(notify({ message: config.css.notifyMessage, onLast: true })); // notify me only on the last stream

});

// Javascript tasks
gulp.task('javascript', function() {
    return gulp.src(config.javascript.sources)
    .pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)}))  // capture errors
    .pipe(sourcemaps.init()) // start source maps
    .pipe(babel({
        presets: config.javascript.babelPresets
    })) // babel conversion and error checking
    .pipe(concat(config.javascript.destFile)) // conact all files int one file
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write(config.javascript.sourceMap)) // generate source maps
    .pipe(gulp.dest(config.javascript.destFolder)) // add to dist folder
    .pipe(browserSync.reload({stream:true})) // reload browser
    .pipe(notify({ message: config.javascript.notifyMessage, onLast: true })); // notify me only on the last stream
});


// images task
gulp.task('images', function() {
	return gulp.src(config.images.sources)
    .pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)}))  // capture errors
    .pipe(changed(config.images.destFolder)) // only worry about images different from dest folder files
    .pipe(imagemin()) // compress images
    .pipe(gulp.dest(config.images.destFolder));
});



// Node-sync task
gulp.task('nodemon', function() {
    return nodemon({
        ignore: config.nodemon.ignore,
        script: `${config.nodemon.server}:${config.nodeServer.port}`
    })
    .on('restart', () => {
        setTimeout(() =>  {
            browserSync.reload({ stream: false })
        }, 1000);
    });
})


// clean out dist folder
gulp.task('clean', function() {
	return del(config.clean.delFolders); // clean dist folder and tell gulp you're done
});


// watch task
gulp.task('watch', function() {
	gulp.watch(config.html.watchDir, gulp.series('html')); // watch all html files in this folder - changes trigger html task
	gulp.watch(config.css.watchDir, gulp.series('css')); // watch all files in all folders this folder - changes trigger css task
	gulp.watch(config.javascript.watchDir, gulp.series('javascript')); // watch all files in all folders this folder - changes trigger javascript task
	gulp.watch(config.images.watchDir, gulp.series('images')); // watch all files in all folders this folder - changes trigger images task
});


// rsync task
gulp.task('rsync', function() {
	return gulp.src(config.rsync.srcFolder) // get src files to upload
	.pipe(plumber({errorHandler: notify.onError(config.notify.errorMessage)}))  // capture errors
	.pipe(rsync({
      root: config.rsync.rootFolder, // get root folder from where to upload
      hostname: config.rsync.hostname, // get remote hostname
      destination: config.rsync.destFolder // full dest folder in remote host
    }))
    .pipe(notify({ message: config.rsync.notifyMessage, onLast: true })); // notify me only on the last stream

})


// task to run on start up - run each task then run browser synv
gulp.task('default', gulp.series('clean', gulp.parallel('css', 'javascript', 'images'), 'html', gulp.parallel('browser-sync', 'watch')));