// This is the dev Webpack config. All settings here should prefer a fast build
// time at the expense of creating larger, unoptimized bundles.
const Merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const commonConfig = require('./webpack.common.config.js');

const SAMPLE_GRADE_DATA_FOLDER = '/tests/sampledata/gradereports/';

module.exports = Merge.smart(commonConfig, {
  mode: 'development',
  devtool: 'source-map', // To be able to debug with Webstorm
  entry: [
    // enable react's custom hot dev client so we get errors reported in the browser
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.resolve(__dirname, '../src/index.jsx'),
  ],
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      // The babel-loader transforms newer ES2015+ syntax to older ES5 for older browsers.
      // Babel is configured with the .babelrc file at the root of the project.
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: {
          // Caches result of loader to the filesystem. Future builds will attempt to read from the
          // cache to avoid needing to run the expensive recompilation process on each run.
          cacheDirectory: true,
        },
      },
      // We are not extracting CSS from the javascript bundles in development because extracting
      // prevents hot-reloading from working, it increases build time, and we don't care about
      // flash-of-unstyled-content issues in development.
      {
        test: /(.scss|.css)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
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
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader',
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
  // Specify additional processing or side-effects done on the Webpack output bundles as a whole.
  plugins: [
    // Generates an HTML file in the output directory.
    new HtmlWebpackPlugin({
      inject: true, // Appends script tags linking to the webpack bundles at the end of the body
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: 'localhost:1991',
      LMS_BASE_URL: 'http://localhost:18000',
      LOGIN_URL: 'http://localhost:18000/login',
      LOGOUT_URL: 'http://localhost:18000/logout',
      CSRF_TOKEN_API_PATH: '/csrf/api/v1/token',
      REFRESH_ACCESS_TOKEN_ENDPOINT: 'http://localhost:18000/login',
      ACCESS_TOKEN_COOKIE_NAME: 'edx-jwt-cookie-header-payload',
      USER_INFO_COOKIE_NAME: 'edx-user-info',
      SAMPLE_GRADE_DATA_FOLDER: `.${SAMPLE_GRADE_DATA_FOLDER}`, // Ends with /
    }),
    // when the --hot option is not passed in as part of the command
    // the HotModuleReplacementPlugin has to be specified in the Webpack configuration
    // https://webpack.js.org/configuration/dev-server/#devserver-hot
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      LIMITREPORTPERWEEK: JSON.stringify(true),
    }),
  ],
  // This configures webpack-dev-server which serves bundles from memory and provides live
  // reloading.
  devServer: {
    host: '0.0.0.0',
    port: 1991,
    historyApiFallback: true,
    hot: true,
    inline: true,
    before(app) {
      app.post('/courses/devcourse/instructor/api/list_report_downloads', (req, res) => {
        res.json({
          downloads: glob.sync(path.join(`.${SAMPLE_GRADE_DATA_FOLDER}`, '*.csv'))
            .map(fpath => ({
              url: `http://${req.headers.host}/get-grades/devcourse/${path.basename(fpath)}`,
              name: path.basename(fpath),
            })),
        });
      });
      app.get('/get-grades/devcourse/*', (req, res) => {
        res.setHeader('Content-Type', 'text/csv');
        const filecontent = fs.readFileSync(`.${SAMPLE_GRADE_DATA_FOLDER}/${req.params[0]}`, 'utf8');
        res.end(filecontent);
      });
    },
  },
});
