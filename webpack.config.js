const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    "multi-select": [
      __dirname + "/src/js/index.js"
    ]
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  node: {
    fs: "empty"
  },
  devtool: "#inline-source-map"
};
