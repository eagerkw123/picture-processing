const path = require('path')
const libraryName = 'pictureProcessing'
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: {
		'picture-processing': path.join(__dirname, '../src/index'),
		'picture-processing.min': path.join(__dirname, '../src/index')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '../dist'),
		library: libraryName,
		libraryExport: 'default',
		libraryTarget: 'umd'
	},
	mode: 'none',
	module: {
		rules: [{
			test: /.js$/,
			use: 'babel-loader'
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				include: /\.min\.js$/
			})
		]
	}
}