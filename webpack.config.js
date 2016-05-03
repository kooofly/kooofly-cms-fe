var webpack = require('webpack')
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var TEMP_PATH = path.resolve(ROOT_PATH, 'template')
module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3080'
      }
    }
  },
  entry: {
    blog: path.resolve(TEMP_PATH, 'blog/app.js'),
    index: path.resolve(TEMP_PATH, 'cms/app.js')

  },
  output: {
    path: './output',
    filename: '[name].js?[hash]'
  },
  module: {
    loaders: [
      /*{
        test: '/\.css$/',
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!'
        )
      },*/
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.sass$/, loader: 'style!sass' },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url?limit=10000&name=[path][name].[ext]?[hash:8]&context=src'
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url?name=[path][name].[ext]?[hash:8]&context=src'
      }
    ]
  },
  /*htmlWebpackPlugin: {
    files: {
      css: ['../common/common.css'],
      js: ['./index/index.js'],
      chunks: {
        head: {
          entry: 'index',
          css: ['common.css']
        }
      }
    }
  },*/
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
var plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlwebpackPlugin({
    title: 'kooofly\'s blog made by vue-fly',
    template: path.resolve(TEMP_PATH, 'blog/app.html'),
    filename: 'blog.html',
    chunks: ['blog'],
    inject: 'body'
  }),
  new HtmlwebpackPlugin({
    title: 'vue fly example',
    template: path.resolve(TEMP_PATH, 'cms/app.html'),
    filename: 'index.html',
    chunks: ['index'],
    inject: 'body'
  })
]
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
  module.exports.vue = {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract("css!stylus")
    }
  }
} else {
  module.exports.plugins = plugins
  module.exports.output.publicPath = 'output/'
  module.exports.devtool = '#source-map'
}

//静态资源强缓存
//js资源压缩 √
//css样式分离 解决一半
//HtmlWebpackPluginm html md5 √
//csssprites
//文件夹遍历
//部署
//base64 √
//sass
//按需加载
//本地调试服务器 代理
//前后端分离调试 √
//假数据调试 代理 √
//临时代理一个数据
//结合 git master 发布
//多环境  dev test production
//部署到不同的服务器
//覆盖和非覆盖发布
var mock_config = {
  domain: {
    images: '',
    page: '',
    assets: '' //js css
  },
  proxyUrl:[
    {}
  ]
}

