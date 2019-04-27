module.exports = {
  mode: 'development',
  devtool: 'source-map',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.ts`,
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    library: 'Aves',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'index.js',
    publicPath: "/dist/"
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
  devServer: {
    contentBase: 'example'
  }
}
