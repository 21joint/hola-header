const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
};
const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html').map(dir =>
    new HTMLWebpackPlugin({
      filename: getNameFromDir(dir), // Output
      template: dir, // Input
    }));

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: [
    './src/js/entry.js',
    './src/stylesheets/styles.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']),
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/bootstrap-sass/assets/fonts/bootstrap/',
        to: './fonts/',
      },
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
};
