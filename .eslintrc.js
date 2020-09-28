module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "airbnb",
      "plugin:react/recommended",
      "plugin:jsx-a11y/strict"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "experimentalObjectRestSpread": true
      }
    },
    "plugins": [
      "react", "react-hooks", "jsx-a11y", "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, {
        "extensions": [".js", ".jsx"]
      }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": 1,
      "react/prop-types": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/label-has-for": 0
    },
    "globals": {
      "window": true,
      "document": true,
      "localStorage": true,
      "FormData": true,
      "FileReader": true,
      "Blob": true,
      "navigator": true
    }
}