const CracoAntDesignPlugin = require('craco-antd');
const { whenProd } = require('@craco/craco')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)


/**
 *  区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
      );
      // SvgIcon 打包配置
      oneOfRule.oneOf.unshift({
        test: /\.svg$/i,
        include: pathResolve('src/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          }
        ],
      });
      return webpackConfig;
    },
    plugins:[
      // 打包后文件分析
      // new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
      ...whenProd(()=>[
        // 超过4kb压缩 (nginx 需要配置 gzip)
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096,
        }),
      ],[])
    ]
  },
  // AntDesign 配置
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1890ff',
        },
      },
    },
    // {
    //   plugin: CracoLessPlugin,
    //   options: {
    //     // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         modifyVars: {},
    //         javascriptEnabled: true
    //       }
    //     }
    //   }
    // },
  ],
  babel: {
    plugins: [
      ...whenProd(() => [
        [
          'transform-remove-console',
          {
            // 保留
            exclude: ['info'],
          }
        ]
      ], [])
    ],
  }
}