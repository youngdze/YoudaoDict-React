import path from 'path';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV || 'dev';

export default {
  context: path.join(__dirname),
  entry: {
    'js/bundle': ['./src/js/app.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFileName: '[id].[chunk].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.s?css$/,
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
    new CommonsChunkPlugin({name: 'commons', filename: 'js/commons.js'}),
    new HtmlWebpackPlugin({template: 'src/tpl/popup.html'}),
  ]
};
