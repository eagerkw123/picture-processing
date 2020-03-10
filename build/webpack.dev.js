const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname, '../src/test/test'),
	output: {
		filename: 'test.js',
		path: path.join(__dirname, '../dist')
	},
	mode: 'none',
	module: {
		rules: [{
			test: /.vue$/,
			use: 'vue-loader'
		}, {
			test: /.js$/,
			use: 'babel-loader'
		}, {
			test: /.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/test/test.html'),
			filename: 'test.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		hot: true
	}
}