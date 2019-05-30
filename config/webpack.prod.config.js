// This is the prod Webpack config. All settings here should prefer smaller,
// optimized bundles at the expense of a longer build time.
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = Merge.smart(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    // enable react's custom hot dev client so we get errors reported in the browser
    'moocpilot-frontend': [path.resolve(__dirname, '../src/setpath.jsx'), path.resolve(__dirname, '../src/index.jsx')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    jsonpFunction: 'jsonpFunction', // https://github.com/webpack/webpack/issues/6985
  },
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      // The babel-loader transforms newer ES2015+ syntax to older ES5 for older browsers.
      // Babel is configured with the .babelrc file at the root of the project.
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
      },
      // Webpack, by default, includes all CSS in the javascript bundles. Unfortunately, that means:
      // a) The CSS won't be cached by browsers separately (a javascript change will force CSS
      // re-download).  b) Since CSS is applied asyncronously, it causes an ugly
      // flash-of-unstyled-content.
      //
      // To avoid these problems, we extract the CSS from the bundles into separate CSS files that
      // can be included as <link> tags in the HTML <head> manually.
      //
      // We will not do this in development because it prevents hot-reloading from working and it
      // increases build time.
      {
        test: /(.scss|.css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
              minimize: true,
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true,
              data: '@import "App";',
              includePaths: [
                path.join(__dirname, '../node_modules'),
                path.join(__dirname, '../src'),
              ],
            },
          },
        ],
      },
      // Webpack, by default, uses the url-loader for images and fonts that are required/included by
      // files it processes, which just base64 encodes them and inlines them in the javascript
      // bundles. This makes the javascript bundles ginormous and defeats caching so we will use the
      // file-loader instead to copy the files directly to the output directory.
      {
        test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optimizationlevel: 7,
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  // New in Webpack 4. Replaces CommonChunksPlugin. Extract common modules among all chunks to one
  // common chunk and extract the Webpack runtime to a single runtime chunk.
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  // Specify additional processing or side-effects done on the Webpack output bundles as a whole.
  plugins: [
    // Cleans the dist directory before each build
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../'),
    }),
    // Generates an HTML file in the output directory.
    new HtmlWebpackPlugin({
      inject: true, // Appends script tags linking to the webpack bundles at the end of the body
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    /* Define env, see https://wpack.io/concepts/how-publicpath-works/
       This defines the variable that will set the url for ressources for this library
       We will then use:
       <script>
        global._babelPolyfill = false;
        moocpilotfrontendbaseurl='http://moocpilotv2-frontend.local/';
      </script>
    */
    new webpack.DefinePlugin({
      MOOCPILOTAPPURLVAR: JSON.stringify('moocpilotfrontendbaseurl'),
      LIMITREPORTPERWEEK: JSON.stringify(true),
    }),
  ],
});
