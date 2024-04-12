var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

// thanks to https://archive.jlongster.com/Backend-Apps-with-Webpack--Part-I

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './app/start.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js',
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        // to include components from packages in node_modules they must be included and excluded
        include: [path.resolve('node_modules/civil-pursuit'), path.resolve('.')],
        // they also must be exclude it from the exclusions:
        exclude: /node_modules\/(?!(civil-pursuit)\/).*/,
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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })],
}
