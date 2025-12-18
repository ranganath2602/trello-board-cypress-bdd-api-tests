const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
      {
        test: /\.feature$/,
        use: [
          {
            loader: path.resolve(__dirname, 'node_modules', '@badeball', 'cypress-cucumber-preprocessor', 'dist', 'subpath-entrypoints', 'webpack.js'),
          },
        ],
      },
    ],
  },
};
