// This is the common Webpack config. The dev and prod Webpack configs both
// inherit config defined here.
const path = require('path');

module.exports = {
  entry: {
    'moocpilot-frontend': path.resolve(__dirname, '../src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty', // Ignore FS dependency: https://github.com/react-boilerplate/react-boilerplate/issues/2279
  },
};
