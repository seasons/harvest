module.exports = function(api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          App: "./src",
          Components: "./src/Components",
          Scenes: "./src/Scenes",
          Utils: "./src/Utils",
        },
      },
    ],
  }
}
