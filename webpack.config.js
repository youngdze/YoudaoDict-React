'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname),
    entry: './js/app.jsx',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'app.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    optional: ['runtime'],
                    stage: 0
                    // presets: ['react', 'es2015'],
                    // plugins: ['transform-runtime', "syntax-async-functions", "transform-regenerator"]
                }
            }
        ]
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
        // new webpack.ProvidePlugin({
        //     'Promise': 'bluebird'
        // })
    ]
};
