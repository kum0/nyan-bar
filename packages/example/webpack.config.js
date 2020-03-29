const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: Path.join(__dirname, './dist'),
    filename: 'index.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        use: 'file-loader',
        exclude: /node_modules/
      }

      //   {
      //     test: /\.jpg|\.png|\.jpeg|\.svg|\.ttf|\.woff$/,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //         options: {
      //           outputPath: './dist/assets',
      //           publicPath: './src/assets/'
      //         }
      //       }
      //     ]
      //   }
    ]
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: '.'
  }
};
