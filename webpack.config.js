const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './js/index.js',
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, '_dist/'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.join(__dirname, 'node_modules')]
            }
          },
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/, use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
    }),
    new webpack.ProvidePlugin({
      'Reveal': 'reveal.js',
      'window.Reveal': 'reveal.js'
    }),
  ],
  devServer: {
    contentBase: './_dist',
    historyApiFallback: true,
    disableHostCheck: true,
    port: 8088,
  }
};
