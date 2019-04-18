module.exports = {
  mode: 'development',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.ts`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    library: 'Spectrumanalyser',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  },
  devServer: {
    contentBase: 'dist',
    open: true
  },
  devtool: 'source-map'
}
