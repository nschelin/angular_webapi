const merge = require('merge2')
const del = require('del');
const spawn = require('child_process').spawn;
const gulp = require('gulp');
//const webpack = require('webpack-stream');
const $ = require('gulp-load-plugins')({ lazy: true });

const tsProject = $.typescript.createProject('tsconfig.json', { declaration: true });

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('dev:runJs', ['clean','copy:sysjs','ts','templates'], () => {
	const cmd = spawn('dotnet', ['run'], { stdio: 'inherit' });
	cmd.on('close', (code) => {
		console.log(`exited: ${code}`);
	});
})

gulp.task('dev:runWp', ['clean','copy:webpack', 'templates'], () => {
	// not the best way to do this...
	const wp = spawn('webpack', { stdio: 'inherit'});
	wp.on('exit', () => {
		const cmd = spawn('dotnet', ['run'], { stdio: 'inherit' });	
	})
	wp.on('close', (code) => {
		console.log(`exited: ${code}`);
	})
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

gulp.task('copy:sysjs', () => {
	return gulp.src(['./src/index-sysjs.html','./src/systemjs.config.js'])
				.pipe($.rename((path) => {
					if(path.basename === "index-sysjs") {
						path.basename = "index";
					}
				}))
				.pipe(gulp.dest('./wwwroot/'))
})

gulp.task('copy:webpack', () => {
	return gulp.src('./src/index-webpack.html')
				.pipe($.rename('index.html'))
				.pipe(gulp.dest('./wwwroot/'))
});


/**
 * Cleans out wwwroot
 * @param  {String} path [path to the directory]
 * @return {[type]}      [description]
 */
const clean = (path) => {
	//log('Cleaning: ' + path);
	return del.sync(path);
}