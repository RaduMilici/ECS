const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  resolve: {
    alias: {
      root: __dirname,
    },
  },
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{ test: /\.css$/, loader: 'style!css' }],
  },
  plugins: [new UglifyJSPlugin()],
}
