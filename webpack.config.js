var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin ({
  template: path.resolve(__dirname, 'app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports =  {
  entry: [
    path.resolve(__dirname,'app/index.js')
  ],
  devtool: 'eval',
  module: {
    loaders: [
      {test: /\.jsx?$/, include: path.resolve(__dirname, 'app'), loader: "babel"},
      {test: /\.jpg$/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      {test: /\.scss?$/, loaders: ['style', 'css', 'sass']},
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
     'process.env': {
       'NODE_ENV': JSON.stringify('production')
     }
   })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  }
};
