'use strict';

import path from 'path';
import webpack from 'webpack';

const NODE_ENV = process.env.NODE_ENV || 'dev';

export default {
  context: path.join(__dirname),
  entry: {
    'js/app': ['./src/js/app.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.(css|scss)$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', `sass?${['outputStyle=compressed'].join('&')}`]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg)$/,
      exclude: /node_modules/,
      loader: 'file?name=font/[name].[ext]'
    }]
  },
  devtool: 'source-map',
  cache: true,
  debug: true,
  node: {console: true},
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ]
};
