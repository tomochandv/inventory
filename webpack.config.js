const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const parser = require('comment-parser')
const CopyPlugin = require('copy-webpack-plugin')
const getLogger = require('webpack-log')
const log = getLogger({ name: 'P 인벤토리 webpack 빌드' })

log.info('Webpack Build Start')

const entryPath = path.resolve(__dirname, 'src/client/js')
let files = glob.sync(entryPath + '/**/*.js')

log.info('Read client Js Files....')

const filesConfig = []
files.forEach((filename) => {
    const text = fs.readFileSync(filename).toString()
    const parsed = parser(text)
    if (parsed.length > 0 && parsed[0].tags.length > 0) {
      log.info(filename)
        filesConfig.push({
            filename: filename,
            params: parsed[0].tags,
        })
    }
})

log.info('Output Files Setting...')
const entries = {}
filesConfig.forEach((file) => {
    let output = '';
    file.params.forEach((param) => {
        // get output path
        if (param.tag === 'output') {
            output = param.name;
        }
    });
    log.info(file.filename)
    entries[output] = file.filename;
})

module.exports = {
  mode: 'none',
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/client/js'),
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/client/views',
        to: __dirname + '/dist/client/views',
      },
      {
        from: 'src/client/css',
        to: __dirname + '/dist/client/css',
      },
      {
        from: 'src/client/img',
        to: __dirname + '/dist/client/img',
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // EnvironmentPlugin 이 뒤에 []에 해당하는 환경변수를 클라이언트로 전달해 준답니다.
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  target: 'web',
}
