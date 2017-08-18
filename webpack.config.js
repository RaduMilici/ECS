const path = require('path');

module.exports = {
  resolve: {
    alias: {
      root: __dirname,
    },
  },
  entry: path.resolve(__dirname, './testApp/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
    ],
  },
};