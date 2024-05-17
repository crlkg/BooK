module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ],
  env: {
    production: {
      plugins: [
        ["transform-remove-console", { "exclude": [ "error", "warn"] }],
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        [
          "babel-plugin-transform-define",
          {
            "__VUE_OPTIONS_API__": true,
            "__VUE_PROD_DEVTOOLS__": false,
            "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": false
          }
        ]
      ]
    }
  }
}
