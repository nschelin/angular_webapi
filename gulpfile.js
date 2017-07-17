const merge = require('merge2')
const del = require('del');
const spawn = require('child_process').spawn;
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });

const tsProject = $.typescript.createProject('tsconfig.json', { declaration: true });

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


gulp.task('dev:run', ['clean','copy','ts','templates'], () => {
	const cmd = spawn('dotnet', ['run'], { stdio: 'inherit' });
	cmd.on('close', (code) => {
		console.log(`exited: ${code}`);
	});
})

gulp.task('ts', () => {
	let tsResult = tsProject.src()
					.pipe($.sourcemaps.init())
					.pipe(tsProject())
	return merge([
		tsResult.dts.pipe(gulp.dest('./wwwroot/app/sm')),
		tsResult.js.pipe($.sourcemaps.write()).pipe(gulp.dest('./wwwroot/app'))
	]);				
});

gulp.task('clean', () => {
	return clean('./wwwroot/*');
});

gulp.task('templates', () => {
	return gulp.src(['./src/app/**/*.html'], { base: './src/' })
			   .pipe(gulp.dest('./wwwroot/'))
});

gulp.task('copy', () => {
	return gulp.src(['./src/index.html','./src/systemjs.config.js'])
				.pipe(gulp.dest('./wwwroot/'))
})


/**
 * Cleans out wwwroot
 * @param  {String} path [path to the directory]
 * @return {[type]}      [description]
 */
const clean = (path) => {
	//log('Cleaning: ' + path);
	return del.sync(path);
}