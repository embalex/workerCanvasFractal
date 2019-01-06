module.exports = {
  "env": {
    "browser": true,
  },
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "parser": "babel-eslint",
  "rules": {
    "react/prop-types": 0,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "spaced-comment": [
      "error",
      "always",
      { "markers": [":"], "exceptions": [":"] }
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "extends": ["airbnb", "plugin:jest/recommended"],
};
