'use strict';

var devEnvironment = true;

var WebpackNotifierPlugin = require('webpack-notifier');
// var webpack = require('webpack');

module.exports = {
    entry: './app.js',

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', 'index.js']
    },

    devtool: devEnvironment ? 'eval' : 'source-map',

    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },

    plugins: [
      new WebpackNotifierPlugin(),
    ],

    devServer : {
      host : 'localhost',
      port : 8080,
    }
};
