module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + "/build/",
    filename: 'cheteletype.js',
    libraryTarget: 'var',
    library: 'CheTeletype'
  },
  module: {
    loaders: [{ 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader" 
    }]
  }
};
