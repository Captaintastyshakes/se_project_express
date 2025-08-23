module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": "off",
    "arrow-body-style": ["error", "always"], // in addition to this being just the way we have been taught since hour 0 of javascript, (that is using blocks for anonymous functions,) the logic employed in the async functions is way too verbose to be 'concise,' and doesn't gain for what it loses in readability so I am politely refusing to oblige this linter rule as is.
    "no-param-reassign": [1],
    "no-console": [0],
    "consistent-return": [1],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
