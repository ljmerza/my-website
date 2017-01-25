'use strict'

module.exports = {
	css: {
		sassSrc: [
			"./src/sass/materialize/materialize.scss", 
			"./src/sass/*.s*ss"
		],
		cssSrc: './src/styles/css/**/*.css',
		destFolder: './dist',
		destFile: 'style.css',
		sourceMap: './',
		notifyMessage: 'CSS build done.',
		autoprefixer: 'last 2 versions',
		watchDir: './src/styles/**/*.*'
	},

	html: {
		sources: ['./dist/*.js', './dist/*.css'],
		target: './src/*.html',
		injectIgnore: 'dist/',
		destFolder: './dist',
		notifyMessage: 'HTML build done.',
		watchDir: './src/*.html'
	},

	javascript: {
		sources: [
	        './src/js/jQuery/*.js',
	        './src/js/jQuery Libraries/**/*.js',

	        "./src/js/materialize/initial.js",
	        "./src/js/materialize/jquery.easing.1.3.js",
	        "./src/js/materialize/animation.js",
	        "./src/js/materialize/velocity.min.js",
	        "./src/js/materialize/global.js",
	        "./src/js/materialize/materialbox.js",
	        "./src/js/materialize/waves.js",
	        //"./src/js/materialize/forms.js",
	        "./src/js/materialize/buttons.js",
	        './src/js/*.js'
        ],
        babelPresets: ['es2015'],
        destFile: 'script.js',
        destFolder: './dist',
        sourceMap: './',
		notifyMessage: 'JavaScript build done.',
		watchDir: './src/javascript/**/*.js'
	},

	images: {
		sources: [
	        './bower_components/jquery/dist/jquery.min.js',
	        './src/scripts/**/*.js'
        ],
        destFile: 'script.js',
        destFolder: './dist',
        sourceMap: './',
		notifyMessage: 'JavaScript build done.',
		watchDir: './src/images/**/*.*'
	},

	clean: {
		delFolders: ['./dist/**']
	},

	browserSync: {
		baseDir: './dist',
		port: 5000,
		proxy: 'localhost'
	},

	notify: {
		errorMessage: 'Error: <%= error.message %>'
	},

	rsync: {
		srcFolder: './dist/**',
		rootFolder: './dist',
		hostname: '192.168.0.1',
		destFolder: '/var/www/website,',
		notifyMessage: `rSync complete with remote host ${this.hostname}`
	},
	nodemon: {
		ignore: [
			'./gulpfile.js',
			'./node_modules',
			'./db', 
			'./src'
		],
		server: 'dev-server.js'
	},
	nodeServer: {
		port: 3000,
		staticDir: './dist'
	}
}