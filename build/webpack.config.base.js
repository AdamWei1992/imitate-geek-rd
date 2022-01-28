const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  target: 'node',
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar({
      name: 'link startou!!!',
      color: '#52c41a'
    }),
    new EslintWebpackPlugin({
      fix: true,
      extensions: ['ts', 'js', 'json'],
      exclude: ['node_modules']
    })
  ]
}
