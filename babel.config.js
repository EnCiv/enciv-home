// use ESM for webpack/Storybook (babel-loader sets caller.name = 'babel-loader');
// use commonjs for CLI transpile and jest. sourceType unambiguous handles mixed CJS/ESM files.
module.exports = function (api) {
  const isWebpack = api.caller(c => c && c.name === 'babel-loader')
  const isTest = api.env('test')
  return {
    sourceType: 'unambiguous',
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: isTest ? { node: 'current' } : { node: '24' },
          modules: isTest || !isWebpack ? 'commonjs' : false,
        },
      ],
    ],
    plugins: ['@babel/plugin-transform-class-properties', '@babel/plugin-transform-object-rest-spread'],
    sourceMap: 'inline',
  }
}
