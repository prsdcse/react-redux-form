/**
 * COMMON WEBPACK CONFIGURATIONS
 */
const path = require('path');

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,

  output: {
    path: path.resolve(__dirname, 'umd'),
    filename: 'ReactReduxForm.min.js',
    library: 'ReactReduxForm',
    libraryTarget: 'umd',
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', 'react.js']
  },
  plugins: options.plugins,
});
