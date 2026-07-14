const path = require('path')
const webpack = require('webpack')
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
          sourceType: 'unambiguous',
          presets: ['@babel/preset-react', ['@babel/preset-env', { targets: { node: '20' } }]],
          plugins: [
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-object-rest-spread',
            '@babel/plugin-transform-react-inline-elements',
          ],
        },
      },
    ],
  },
]
// Override broken alias from civil-server (react is hoisted to project root)
module.exports.resolve = module.exports.resolve || {}
module.exports.resolve.alias = module.exports.resolve.alias || {}
module.exports.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react')
module.exports.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules/react-dom')
module.exports.resolve.alias['process/browser'] = require.resolve('process/browser')
// Make process available as a global in browser bundles
module.exports.plugins = module.exports.plugins || []
module.exports.plugins.push(new webpack.ProvidePlugin({ process: 'process/browser' }))
