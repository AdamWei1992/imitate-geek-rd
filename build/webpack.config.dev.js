

const baseConfig = require('./webpack.config.base')
// const path = require('path')
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
})
