const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const config = {
    context: `${__dirname}/src`,
    devtool: 'source-map',
    entry: {
      background: './background.js',
      newtab: './newtab',
    },
    module: {
      rules: [
        {
          include: path.join(__dirname, 'src', 'components'),
          test: /\.css$/,
          use: [
            'style-loader',
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: 'css-loader',
              options: {
                localsConvention: 'camelCaseOnly',
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
          use: [
            'svg-url-loader', // or file-loader or svg-url-loader
            'svg-transform-loader',
          ],
        },
        {
          exclude: /node_modules/,
          loader: 'ts-loader',
          test: /\.tsx?$/,
        },
      ],
    },
    name: 'client',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new Dotenv(),
      new ExtensionReloader({
        entries: { // The entries used for the content/background scripts or extension pages
          background: 'background',
          contentScript: 'newtab',
        },
        reloadPage: false, // Force the reload of the page also
      }),
      new CopyWebpackPlugin([
        { from: './manifest.json' },
        { from: './logo.png' },
      ]),
      new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/,
      ]),
      new HtmlWebpackPlugin({
        chunks: ['newtab'],
        filename: 'newtab.html',
        hash: true,
        inject: 'body',
        template: './newtab.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    target: 'web',
  };

  return config;
};
