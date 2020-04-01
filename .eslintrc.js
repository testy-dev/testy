module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["prettier", "react-hooks", "sort-imports-es6-autofix"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true, argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "arrow-body-style": "warn",
    complexity: ["warn", 50],
    "no-unused-vars": "off",
    "prettier/prettier": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": "warn",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/no-array-index-key": "warn",
    "react/no-unescaped-entities": "off",
    "react/prefer-stateless-function": "warn",
    "react/prop-types": "off",
    "sort-imports-es6-autofix/sort-imports-es6": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
  },
};
