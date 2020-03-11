module.exports = function(api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset", "module:react-native-dotenv"],
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
            Utils: "./src/utils",
          },
        },
      ],
    ],
  }
}
