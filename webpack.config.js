const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

const config = {
	target: 'electron-renderer',
	entry: ['./src/main.scss', 'font-awesome/scss/font-awesome.scss', 'aurelia-bootstrapper'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js'],
		modules: ['src', 'node_modules'].map(module => path.resolve(module))
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new AureliaWebpackPlugin.AureliaPlugin({includeAll: 'src', aureliaApp: 'renderer'})
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
            presets: [['env', {"targets": {"node":"current"}}]],
						plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
					}
				}
			}
		]
	}
};

module.exports = config;
