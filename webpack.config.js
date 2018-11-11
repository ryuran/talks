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
    path: path.join(__dirname, '_dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      { test: /\.(eot|svg|ttf|woff2?)$/, use: ['file-loader'] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      'Reveal': 'reveal.js',
      'window.Reveal': 'reveal.js'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './_dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    port: 8088
  }
};
