const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const getNameFromDir = (dir) => {
    const lastSlash = dir.lastIndexOf('/');
    return dir.slice(lastSlash + 1)
}

const generateHTMLPlugins = () =>
    glob.sync('./src/**/*.html').map(dir =>
        new HTMLWebpackPlugin({
            filename: getNameFromDir(dir), // Output
            template: dir, // Input
        }))

module.exports = {
    node: {
        fs: 'empty',
    },
    entry: ['./src/stylesheets/styles.scss', './src/js/entry.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                },
            },
            {
                test: /.(sass|scss)$/,
                exclude: '/node_modules/',
                loader: ExtractTextPlugin.extract(
                    ['css-loader', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([
            {
                from: './src/images/',
                to: './images/',
            }, {
                from: './src/fonts/',
                to: './fonts/',
            }]),
        ...generateHTMLPlugins(),
    ],
    stats: {
        colors: true,
    },
    devtool: 'source-map',
}
