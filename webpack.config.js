const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WatchIgnorePlugin, SourceMapDevToolPlugin } = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const package = require('./package.json');

if (process.env.APP_ENV === undefined) {
  process.env.APP_ENV = 'local';

  console.warn('Environment variable APP_ENV is not defined, using "local" as default value');
}

if (process.env.BUILD_NUMBER === undefined) {
  process.env.BUILD_NUMBER = 0;

  console.warn('Environment variable BUILD_NUMBER is not defined, using "0" as default value');
}

const commonConfig = {
  context: path.join(__dirname, 'src'),
  devtool: false,
  entry: {
    background: './background.js',
    newtab: './Newtab.tsx',
    options: './Options.tsx',
  },
  mode: 'production',
  module: {
    rules: [
      {
        // include: path.join(__dirname, 'src', 'components'),
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
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());

            manifest.author = package.author.name;
            manifest.homepage_url = package.homepage;
            manifest.version = `${package.version}.${process.env.BUILD_NUMBER}`;
            manifest.version_name = `${package.version} build ${process.env.BUILD_NUMBER}`;

            switch (process.env.APP_ENV) {
              case 'local':
                manifest.name = `${manifest.name} (dev)`;
                manifest.version_name = `${manifest.version_name} (dev)`;
                manifest.content_security_policy = `${manifest.content_security_policy} script-src-elem 'self' http://localhost:35729;`;

                break;

              case 'canary':
                manifest.name = `${manifest.name} Canary`;
                manifest.version_name = `${manifest.version_name} (canary)`;

                break;

              default:
                break;
            }

            return JSON.stringify(manifest, null, process.env.APP_ENV === 'local' ? 2 : 0);
          },
        },
        { from: './logo.png' },
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ['newtab'],
      filename: 'newtab.html',
      inject: 'body',
      template: './newtab.ejs',
      templateParameters: {
        env: process.env.APP_ENV,
      },
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      inject: 'body',
      template: './options.ejs',
      templateParameters: {
        env: process.env.APP_ENV,
      },
    }),
  ],
  resolve: {
    alias: {
      mdi: 'material-design-icons',
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  target: 'web',
};

switch (process.env.APP_ENV) {
  case 'stable':
  case 'canary':
    commonConfig.plugins.push(new SourceMapDevToolPlugin({
      append: false,
      filename: '[file].map',
    }));

    break;

  case 'local':
    commonConfig.devtool = 'inline-source-map';
    commonConfig.mode = 'development';

    commonConfig.watchOptions = {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    };

    commonConfig.plugins.push(new LiveReloadPlugin());
    commonConfig.plugins.push(new WatchIgnorePlugin([
      /css\.d\.ts$/,
    ]));

    break;

  default:
    throw Error('Unknown environment name');
}

module.exports = commonConfig;
