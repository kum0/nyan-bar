const Path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: Path.join(__dirname, './dist'),
    filename: 'index.js',
    globalObject: 'this',
    library: 'nyan-bar',
    publicPath: '',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
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
        use: 'url-loader',
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
  }
};
