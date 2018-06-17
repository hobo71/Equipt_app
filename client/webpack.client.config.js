// For inspiration on your webpack configuration, see:
// https://github.com/shakacode/react_on_rails/tree/master/spec/dummy/client
// https://github.com/shakacode/react-webpack-rails-tutorial/tree/master/client

const webpack = require('webpack');
const { resolve } = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { devBuild, manifest, webpackOutputPath, webpackPublicOutputDir } =
  webpackConfigLoader(configPath);

const config = {

  context: resolve(__dirname),

  entry: {
    'webpack-bundle': [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
      './app/bundles/web/startup/client',
    ],
  },

  output: {
    // Name comes from the entry section.
    filename: 'webpack-bundle.js',

    // Leading slash is necessary
    publicPath: `/${webpackPublicOutputDir}`,
    path: webpackOutputPath,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: resolve(__dirname, './app/bundles/web/actions'),
      components: resolve(__dirname, './app/bundles/web/components'),
      containers: resolve(__dirname, './app/bundles/web/containers'),
      helpers: resolve(__dirname, './app/bundles/web/helpers'),
      reducers: resolve(__dirname, './app/bundles/web/reducers'),
      utils: resolve(__dirname, './app/bundles/web/utils'),
      hocs: resolve(__dirname, './app/bundles/web/hocs'),
      assets: resolve(__dirname, './app/bundles/web/assets'),
      theme: resolve(__dirname, './app/bundles/web/theme')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new ManifestPlugin({ fileName: manifest, writeToFileEmit: true }),
  ],

  module: {
    rules: [
      {
        test: require.resolve('react'),
          use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
              sham: 'es5-shim/es5-sham',
          },
          },
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules!sass'
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
          // The important stuff
          test: /\.(jpg|jpeg|png)(\?.*)?$/, // Load only .jpg .jpeg, and .png files
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Name of bundled asset
              outputPath: 'webpack-assets/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
              publicPath: '/assets/' // Endpoint asset can be found at on Rails server
            }
          }
        }
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}