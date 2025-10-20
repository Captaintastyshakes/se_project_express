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
    "arrow-body-style": [1, "always"], // in addition to this being just the way we have been taught since hour 0 of javascript, (that is using blocks for anonymous functions,) the logic employed in the async functions is way too verbose to be 'concise,' and doesn't gain for what it loses in readability so I am politely refusing to oblige this linter rule as is.
    "no-param-reassign": [1],
    "no-console": [0],
    "consistent-return": [1],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "max-classes-per-file": ["off"], // the one place I compromise this rule is in service of compiling a bunch of custom error constructors which are by their nature repetitive; I think it is cleaner and frankly more sensible to export them from one location rather than a dozen. In any other circumstance I would gladly agree and parse out my class constructors.
  },
};
