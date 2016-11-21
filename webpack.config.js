module.exports = {  
  target: 'node',
  entry: './src/Index.ts',
  output: {
    filename: './dist/index.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}