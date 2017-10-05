const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const projectRoot = path.resolve(__dirname, './');

module.exports = {
	entry: { 
		app: projectRoot + '/src/main.ts',
		polyfills: projectRoot + '/src/polyfills.ts'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist')
	},
	module: {
		rules: [
			{ test: /\.ts$/, use: 'ts-loader' },
			{ test: /\.html$/, use: 'raw-loader' },
			{ test: /\.s?css$/, use: ['raw-loader', 'sass-loader'], exclude: /node_modules/, include: path.join(__dirname, './src') }
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.html', '.css']
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),

		new webpack.ContextReplacementPlugin(
			/(.+)?angular(\\|\/)core(.+)?/,
			path.join(__dirname, 'src'),
			{}
		),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'polyfills']
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		inline: true,
		stats: 'errors-only'
	}
}
