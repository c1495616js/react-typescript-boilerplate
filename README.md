# React-Typescript-Boilerplate

## Env Setup

### Ref

https://developerhandbook.com/webpack/webpack-4-from-absolute-scratch/

https://thomlom.dev/setup-eslint-prettier-react/

https://dev.to/botreetechnologies/
setting-up-husky-pre-commit-hook-with-eslint-prettier-and-lint-staged-for-react-and-react-native-d05

### code

- `husky`
- `eslint`
- `prettier`
- `lint-staged`

```bash
npm install --save-dev husky lint-staged eslint eslint-config-airbnb prettier
npm install eslint-plugin-jsx-a11y@latest --save-dev
npm install eslint-plugin-react@latest --save-dev
npm install eslint-plugin-import@latest --save-dev
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

```
touch .eslintrc.js
touch .prettierrc.js
```

in `package.json`

```js
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "./src/*.{js,jsx,ts,tsx}": [
      "npx prettier --write",
      "eslint src/*.js --fix-dry-run",
    ]
  }
```

## MISC

### trailling comma

https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
