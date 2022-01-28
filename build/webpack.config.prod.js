
const baseConfig = require('./webpack.config.base')
// const path = require('path')
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'production',
  // devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          enforce: true
        }
      }
    }
  }
})
