const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');


let createDist,
    dist = path.join(__dirname, 'dist');

createDist = (function() {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
})();


module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 9999,
  },
});