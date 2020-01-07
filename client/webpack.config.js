const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  // 1 webpack will read js files located in /src/index.js and bundle them together into one js file.
  // so we can just include one js file in our website pages, instead of many
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],

  plugins: [
  	new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './resources/index.html',
      filename: './index.html',
      hash: true,
    }),

  	],

  // 2 when webpack is bundling the js files,
  // it will load babel version of the js files(babel is a node package that converts all js to old js vanilla version, so it can work in all browser)
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/img/[name].[ext]',
            outputPath: 'dist/img/',
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'public/fonts/[name].[ext]',
          outputPath: 'dist/fonts',
        },
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

//   module: {
//     rules: [
//         {
//             test: /\.(js|jsx)$/,
//             use: {
//                 loader: 'babel-loader'
//             },
//             exclude: /node_modules/
//         },
//         {
//             test: /\.scss$/,
//             loader: MiniCssExtractPlugin.extract(['css-loader', 'sass-loader'])
//         }
//     ]
// },


  // 3 all bundled js files will be  output  to dist/bundle.js for production usage.
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  // 4 this is where we server our files to the public
  devServer: {
    contentBase: './dist'
  }



};