const isDevelopment = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[hash].js',
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [new CleanWebpackPlugin()],
};
