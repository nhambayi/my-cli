module.exports = {
  target: "node",
  entry: {
    index: "./src/Index.ts",
    list : "./src/commands/List/List",
    edit : "./src/commands/EditCommand",
    create : "./src/commands/CreateCommand",
    tests: "./src/Tests/IndexTest.ts"
  },
  output: {
    path: "./tmp",
    filename: "index-[name].js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  devtool: "source-map"
};