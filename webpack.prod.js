const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html",
  minify: false,
  production: true,
  inject: false,
});

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './assets/index.js'
  },
  plugins: [htmlPlugin],
});