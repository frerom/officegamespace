module.exports = {
  context: __dirname,
  entry: './entry.js',
  output: {
    path: 'dist/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
}