module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "jest": true,
    "amd": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "prettier"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "impliedStrict": true,
    }
  },
  "plugins": [
    "prettier",
    "import",
    "jest",
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 120
      }
    ],
    "complexity": [
      "error",
      5
    ],
    "max-params": ["warn", 4],
    "max-statements": [
      "warn",
      8
    ],
    "max-statements-per-line": [
      "warn",
      {
        "max": 1
      }
    ],
    "max-nested-callbacks": [
      "error",
      2
    ],
    "max-depth": [
      "warn",
      {
        "max": 2
      }
    ],
    "max-lines": [
      "warn",
      100
    ],
    "eqeqeq": [
      "error",
      "smart"
    ],
    "prefer-const": "warn",
    "no-var": "error",
  },
  "overrides": [
    {
      "files": ["*.test.js"],
      "rules": {
        "max-nested-callbacks": ["warn", 10],
        "max-lines": [
          "warn",
          200
        ],
      }
    }
  ]
};