/**
 * Production config for webpack build
 */

var path = require('path');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  entry: [
    require.resolve('@babel/polyfill'),
    path.join(__dirname, 'src/index.js'),
  ],
  optimization: {
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: false,
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: false,
  },
  plugins: [],
});
