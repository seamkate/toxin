const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev

module.exports = {
  context: path.resolve(__dirname,'src'),
  entry: [
    './js/index.js',
    './scss/style.scss',
  ],
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserJSPlugin({}), 
      new OptimizeCSSAssetsPlugin({})
    ],
  },  
  module: {
    rules: [
      {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader:MiniCssExtractPlugin.loader,
        options:{
          hmr:isDev,
          reloadAll: true
          },
        },
        'css-loader',
        'sass-loader',
        ],      
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
      },
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        },
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },  
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: './pages/index.html',
      template: './pug/pages/index.pug',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }), 
    new CopyWebpackPlugin([
    {
      from:path.resolve(__dirname, ('src/img')),
      to: path.resolve(__dirname, 'dist/img'),
    },
    ]),
  ]
}