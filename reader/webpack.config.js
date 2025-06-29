const path = require('path');

module.exports = {
  entry: './reader.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.'),
    clean: false
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    fallback: {
      "util": false,
      "url": false,
      "path": false,
      "fs": false,
      "stream": false,
      "zlib": false,
      "http": false,
      "https": false,
      "assert": false,
      "string_decoder": false
    }
  }
};