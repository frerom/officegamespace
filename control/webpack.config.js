module.exports = {
  context: __dirname,
  entry: './lib/entry.js',
  output: {
    path: 'dist/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { blacklist: ['strict']}}
    ]
  }
}