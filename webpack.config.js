const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist')
    },
    module: {
		rules: [
			{test: /\.ts$/, use: 'ts-loader'},
			{test: /\.html$/, use: 'raw-loader'},
			{test: /\.s?css$/, use: ['raw-loader','sass-loader'], exclude: /node_modules/, include: path.join(__dirname, './src')}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.html', '.css']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
        }),
        
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'),
            {}
          ),
	],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		inline: true,
		stats: 'errors-only'
	}
}
