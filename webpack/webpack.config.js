'use strict';

var devEnvironment = false;

var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: './app.js',

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', 'index.js']
    },

    // devtool: devEnvironment ? 'eval' : 'source-map',
    devtool:'source-map', //eval works incorrect

    watch: devEnvironment,

    module: {
        loaders: [
          { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"] },
        ]
    },

    plugins: [
      new WebpackNotifierPlugin({title: "Webpack task build", alwaysNotify: true}),
    ],

    devServer : {
      host : 'localhost',
      port : 8080,
      contentBase: __dirname + '/public'
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
