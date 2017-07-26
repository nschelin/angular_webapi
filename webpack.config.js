const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: { 
		app: './src/app/main.ts',
		vendor: './src/vendor.ts',
		polyfills: './src/polyfills.ts',
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'wwwroot/js')
	},
	resolve: {
	    extensions: ['.ts', '.js']
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'awesome-typescript-loader'
		}]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.ContextReplacementPlugin(
		  /angular(\\|\/)core(\\|\/)@angular/,
		  path.resolve(__dirname, './src')
		),
		new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
	      //sourceMap: true,
	      mangle: {
	        keep_fnames: true
	      }
	    }),
	]

}