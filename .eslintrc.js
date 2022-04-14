module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/prefer-default-export': ['off'],
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        devDependencies: ['**/.eslintrc.js', '**/vite.config.js'],
      },
    ],
  },
};
