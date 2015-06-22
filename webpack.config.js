module.exports = [
  {
    name: 'console',
    context: __dirname + '/console',
    entry: './lib/entry.js',
    output: {
      path: __dirname + '/console/dist/js',
      filename: 'app.js'
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
      ]
    }
  },
  {
    name: 'control',
    context: __dirname + '/control',
    entry: './lib/entry.js',
    output: {
      path: __dirname + '/control/dist/js',
      filename: 'app.js'
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { blacklist: ['strict']}}
      ]
    }
  }
]