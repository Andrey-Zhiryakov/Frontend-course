'use strict';

var devEnvironment = true;

var WebpackNotifierPlugin = require('webpack-notifier');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
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
          { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"] },
        ]
    },

    plugins: [
      new WebpackNotifierPlugin({title: "Webpack task build", alwaysNotify: true}),
      new WebpackCleanupPlugin({exclude : ["index.html"]})
    ],

    devServer : {
      host : 'localhost',
      port : 8080,
    }
};
//
// if (!devEnvironment) {
//   module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress : {
//         warnings : false,
//         drop_console : true
//       }
//     })
//   );
// }
