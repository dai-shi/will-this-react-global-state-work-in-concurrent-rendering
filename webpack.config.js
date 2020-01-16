const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist', process.env.NAME || 'react-redux'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NAME']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
          ],
        },
      }],
    }],
  },
  devServer: {
    port: process.env.PORT || '8080',
    historyApiFallback: true,
  },
};
