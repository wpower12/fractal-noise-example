const path = require('path');

module.exports = {
  entry: {
    index:    './src/gen.js'
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/dist/js'
  }
};