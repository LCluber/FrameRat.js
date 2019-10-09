module.exports = api => {
  const isTest = api.env("test");
  if (isTest) {
    // const esModules = ['@lcluber'].join('|'); //`/node_modules/(?!${esModules})`
    return {
      presets: [
        [
          "@babel/env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ] // ,
      // transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
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
