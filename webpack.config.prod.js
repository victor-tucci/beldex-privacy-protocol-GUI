const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        // test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', {
            loader: 'css-loader', options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    alias: {
      process: "process/browser"
    },
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "crypto": require.resolve("crypto-browserify"),
      https: false,
      http: false,
      os: false,
      url: false,
      assert: false,
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}