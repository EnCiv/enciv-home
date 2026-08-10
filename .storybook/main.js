const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-webpack5-compiler-babel'],
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
            include: [path.resolve('node_modules/civil-pursuit'), path.resolve('node_modules/civil-client')],
            exclude: /node_modules\/(?!(civil-pursuit|civil-client)\/).*/,
            use: [
              {
                loader: 'babel-loader',
                // babel.config.js at project root is picked up automatically
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.*', '.js', '.jsx'],
        alias: {
          react: path.resolve(__dirname, '../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
          'process/browser': require.resolve('process/browser.js'),
        },
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
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
        }),
        new webpack.IgnorePlugin({ resourceRegExp: /nodemailer/ }),
        new webpack.NormalModuleReplacementPlugin(/.+models\/.+/, resource => {
          resource.request = '../models/client-side-model'
        }),
      ],
    })

    // Fix: Storybook's DefinePlugin replaces process.env on the LHS of assignments
    // too, producing a SyntaxError in civil-client's bundle. Remove the whole-object
    // replacement so individual process.env.FOO accesses still work.
    for (const plugin of newConfig.plugins) {
      if (plugin.definitions && plugin.definitions['process.env']) {
        delete plugin.definitions['process.env']
      }
    }

    return newConfig
  },
}
module.exports = config
