const path = require('path')
const civilDevConfig = require('civil-server/webpack-dev.config')
const cloneDeep = require('lodash').cloneDeep
module.exports = cloneDeep(civilDevConfig)
module.exports.context = path.resolve(__dirname, 'app')
module.exports.output.path = path.join(__dirname, 'assets/webpack')
module.exports.module.rules = [
  {
    test: /\.js$|\.jsx$/,

    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env', { targets: { node: '16' } }]],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-react-inline-elements',
          ],
        },
      },
    ],
  },
]
