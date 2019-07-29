import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';

export default {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'src/favicon.ico',
      template: path.join(__dirname, 'src/index.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new WebpackPwaManifest({
      name: 'Demo PWA',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      short_name: 'DemoPWA',
      description: 'A standalone demo PWA!',
      background_color: '#2c2c2c',
      theme_color: '#2c2c2c',
      icons: [
        {
          src: './src/icon.png',
          sizes: '144x144',
          type: 'image/png',
        },
      ],
    }),
    new GenerateSW({
      include: [/\.html$/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/, /\.ico$/],
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000,
  },
};
