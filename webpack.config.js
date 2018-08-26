const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = function(env, argv) {
	return {
		mode: argv.mode === 'production' ? 'production' : 'development',
		devtool: argv.mode === 'production' ? 'cheap-eval-source-map' : 'source-map',
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js?[hash]',
		},
		module: {
			rules: [
			{
				test: /\.scss$/,
				use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					}
				},
				{
					loader: 'group-css-media-queries-loader',
					options: {
						sourceMap: true,
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
						autoprefixer({
							browsers: ['ie >=8', 'last 4 version'],
						})
						],
						sourceMap: true,
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					}
				},
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.pug$/,
				use: ['html-loader', 'pug-html-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
				{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]?[hash]',
						context: 'src'
					},
				},
				],
			},
			]
		},
		plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './src/index.pug',
			hash: true,
			minify: {
				collapseWhitespace: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css?[hash]",
			chunkFilename: "[id].css"
		})
		]
	}
}