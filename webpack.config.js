const TerserPlugin = require('terser-webpack-plugin')
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
	output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ThresholdBrush',
      type: 'umd',
      umdNamedDefine: true,
      export: 'default',
    },
    clean: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  // cornerstone-core and cornerstoneTools from node_modules
  externals: {
    'cornerstone-core': {
      commonjs: 'cornerstone-core',
      commonjs2: 'cornerstone-core',
      amd: 'cornerstone-core',
      root: 'cornerstone',
    },
    'cornerstone-tools': {
      commonjs: 'cornerstone-tools',
      commonjs2: 'cornerstone-tools',
      amd: 'cornerstone-tools',
      root: 'cornerstoneTools',
    },
  }
};