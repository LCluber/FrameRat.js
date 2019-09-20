module.exports = api => {
  const isTest = api.env("test");
  if (isTest) {
    return {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    };
  } else {
    return {
      presets: [
        [
          "@babel/env",
          {
            loose: true
            // modules: false
          }
        ]
      ],
      plugins: [
        // "@babel/plugin-external-helpers"
      ]
    };
  }
};

//module.exports = { presets, plugins };
