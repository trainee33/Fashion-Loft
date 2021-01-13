let project_folder = 'dist';
let source_folder = '#src';

let fs = require('fs');

let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/'
	},
	src: {
		html: [ source_folder + '/*.html', '!' + source_folder + '/_*.html' ],
		css: source_folder + '/scss/style.scss',
		js: [ source_folder + '/libs/**/*.js', source_folder + '/js/**/*.js' ],
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf'
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
	},
	clean: './' + project_folder + '/'
};

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	concat = require('gulp-concat'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	smartgrid = require('smart-grid'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify-es').default,
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webp-css'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2');

function browserSync() {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: false
	});
}

const settings = {
	outputStyle: 'scss',
	columns: 12,
	offset: '30px',
	mobileFirst: false,
	container: {
		maxWidth: '1240px',
		fields: '30px'
	},
	breakPoints: {
		lg: {
			width: '1200px'
		},
		md: {
			width: '992px'
		},
		sm: {
			width: '768px',
			fields: '15px'
		},
		xs: {
			width: '560px'
		}
	}
};

smartgrid('./#src/scss', settings);

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(gcmq())
		.pipe(
			autoprefixer({
				overrideBrowserslist: [ 'last 5 versions' ],
				cascade: false
			})
		)
		.pipe(webpcss())
		.pipe(dest(path.build.css))
		.pipe(cleanCSS())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(concat('script.js'))
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: '.min.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [ { removeViewBox: false } ],
				interlaced: true,
				optimizationLevel: 3
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function fonts() {
	src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
	return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function fontsStyle(params) {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function(err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(
							source_folder + '/scss/fonts.scss',
							'@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n',
							cb
						);
					}
					c_fontname = fontname;
				}
			}
		});
	}
}

function cb() {}

function watchFiles() {
	gulp.watch([ path.watch.html ], html);
	gulp.watch([ path.watch.css ], css);
	gulp.watch([ path.watch.js ], js);
	gulp.watch([ path.watch.img ], images);
}

function clean() {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, js, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
