const path = require('path');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = (env) => {
  const HOST = process.env.HOST || '0.0.0.0';
  const PORT = process.env.PORT || 3000;
  const ASSET_PATH = process.env.ASSET_PATH || './';
  const isDev = env === 'development';

  const BUILD_FILE_NAMES = {
    // JS.
    jsFileName: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    jsChunkFileName: isDev
      ? 'js/[name].chunk.js'
      : 'js/[id].[contenthash:8].chunk.js',

    // Styles.
    stylesFileName: isDev
      ? 'styles/[name].css'
      : 'styles/[name.[contenthash:8].css',
    stylesChunkFileName: isDev
      ? 'styles/[id].chunk.css'
      : 'styles/[id].[contenthash:8].chunk.css',

    // Images/Fonts
    imagesFileName: isDev
      ? 'images/[name].[ext]'
      : 'images/[name].[contenthash:8].[ext]',
    fontsFileName: isDev
      ? 'fonts/[name].[ext]'
      : 'fonts/[name].[contenthash:8].[ext]',
  };

  const PATHS = {
    // Folders.
    src: path.join(__dirname, 'src'),
    public: path.join(__dirname, 'public'),
    dist: path.join(__dirname, 'dist'),
    node_modules: path.join(__dirname, 'node_modules'),

    // Files.
    entry: path.join(__dirname, 'src', 'index.tsx'),
    template: path.join(__dirname, 'public', 'index.html'),
    env: path.join(__dirname, '.env'),
  };

  const baseConfig = {
    entry: {
      main: PATHS.entry,
    },
    output: {
      path: PATHS.dist,
      publicPath: ASSET_PATH,
      filename: BUILD_FILE_NAMES.jsFileName,
      chunkFilename: BUILD_FILE_NAMES.jsChunkFileName,
    },
    resolve: {
      extensions: ['*', '.js', '.json', '.ts', '.tsx'],
      alias: {
        '@': PATHS.src,
      },
    },
    module: {
      rules: [
        // typescript
        {
          test: /\.ts(x?)$/,
          exclude: '/node_modules/',
          use: 'ts-loader',
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        // Style loaders (loader order matter here)
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // Image loaders.
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: BUILD_FILE_NAMES.imagesFileName },
            },
          ],
        },
        // Font loaders.
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: BUILD_FILE_NAMES.fontsFileName },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new OptimizeCssAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: BUILD_FILE_NAMES.stylesFileName,
        chunkFilename: BUILD_FILE_NAMES.stylesChunkFileName,
      }),
      new Dotenv({
        path: PATHS.env,
      }),
      new HtmlWebpackPlugin({
        template: PATHS.template,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: PATHS.public,
            to: PATHS.dist,
            globOptions: { ignore: ['*.html'] },
          },
        ],
      }),
    ],
  };

  /** DEV Config */
  const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: PATHS.dist,
      host: HOST,
      port: PORT,
      compress: true,
      hot: true,
      historyApiFallback: true,
      writeToDisk: true,
      stats: 'errors-only',
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  };

  /** PRD Config */
  const prodConfig = {
    mode: 'production',
    optimization: {
      minimize: true,
      moduleIds: 'hashed',
      chunkIds: 'named',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            enforce: true,
          },
        },
      },
    },
  };

  return merge(baseConfig, isDev ? devConfig : prodConfig);
};
