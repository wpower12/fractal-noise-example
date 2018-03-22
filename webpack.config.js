const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
  	template:   './src/template.js',
    fractal:    './src/fractal.js',
    tectonics:  './src/tectonics.js'
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/dist/js'
  }
};