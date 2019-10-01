module.exports = function(api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            App: "./src",
            Assets: "./assets",
            Components: "./src/Components",
            Scenes: "./src/Scenes",
            Utils: "./src/Utils",
          },
        },
      ],
    ],
  }
}
