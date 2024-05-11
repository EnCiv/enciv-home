import { merge } from 'webpack-merge'
import path from 'path'
const webpack = require('webpack')
import babelConfig from '../babel-config.json'

const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async config => {
    const newConfig = merge(config, {
      module: {
        rules: [
          {
            test: /\.js$|\.jsx$/,
            // to include components from packages in node_modules they must be included and excluded
            include: [path.resolve('node_modules/civil-pursuit')],
            // they also must be exclude it from the exclusions:
            exclude: /node_modules\/(?!(civil-pursuit)\/).*/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // if not included here, babel doesn apply any config file when building components from node_modules
                  ...babelConfig,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.*', '.js', '.jsx'],
        fallback: {
          fs: false,
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          crypto: require.resolve('crypto-browserify'),
          constants: require.resolve('constants-browserify'),
          path: require.resolve('path-browserify'),
          stream: require.resolve('stream-browserify'),
        },
      },
      plugins: [
        new webpack.IgnorePlugin(
          {
            resourceRegExp:
              /clustered|dateFile|file|fileSync|gelf|hipchat|logFacesAppender|loggly|logstashUDP|mailgun|multiprocess|slack|smtp/,
          },
          /(.*log4js.*)/
        ), // these appenders are require()ed by log4js but not used by this app
        new webpack.IgnorePlugin({ resourceRegExp: /nodemailer/ }), // not used in the client side - those should be move outside of the app directory

        // using a function because when this ran on heroku using just "../modules/client-side-model" failed
        new webpack.NormalModuleReplacementPlugin(/.+models\/.+/, resource => {
          resource.request = '../models/client-side-model'
        }),

        new webpack.HotModuleReplacementPlugin(), // DO NOT use --hot in the command line - it will cause a stack overflow on the client
      ],
    })
    return newConfig
  },
}
export default config
