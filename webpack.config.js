const path = require('path')
const webpack = require('webpack')
const civilConfig = require('civil-server/webpack.config')
const cloneDeep = require('lodash').cloneDeep

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = cloneDeep(civilConfig)

// Override context and output for enciv-home
module.exports.context = path.resolve(__dirname, 'app')
module.exports.output.path = path.join(__dirname, 'assets/webpack')

// Override resolve aliases for enciv-home's React location
// This ensures all webpack code uses the single React copy at the project root
module.exports.resolve = module.exports.resolve || {}
module.exports.resolve.alias = module.exports.resolve.alias || {}
module.exports.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react')
module.exports.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules/react-dom')
