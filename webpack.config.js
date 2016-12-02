module.exports = {
  target: "node",
  entry: {
    index: "./src/Index.ts",
    list : "./src/commands/List",
    edit : "./src/commands/Edit",
    add : "./src/commands/Add",
    create : "./src/commands/create/CreateCommand",
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