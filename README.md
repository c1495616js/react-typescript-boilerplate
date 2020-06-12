# React-Typescript-Boilerplate

## Env Setup

### Ref

https://medium.com/swlh/setting-up-a-react-typescript-sass-webpack-and-babel-7-project-in-6-steps-b4d172d1d0d6

https://developerhandbook.com/webpack/webpack-4-from-absolute-scratch/

https://thomlom.dev/setup-eslint-prettier-react/

https://dev.to/botreetechnologies/
setting-up-husky-pre-commit-hook-with-eslint-prettier-and-lint-staged-for-react-and-react-native-d05

### React-Typescript-Guide

https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md#react---type-definitions-cheatsheet

https://github.com/typescript-cheatsheets/react-typescript-cheatsheet

https://www.sitepoint.com/react-with-typescript-best-practices/

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

## Testing

```
npm install --save-dev jest @types/jest
```

### Jest path alias

https://codeandsuch.github.io/webpack-aliases-typescript/

### Jest + Typescript

https://github.com/basarat/typescript-book/blob/master/docs/testing/jest.md

## MISC

### trailling comma

https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8

### import without \*

in `tsconfig.json`:

```
 esModuleInterop: true,
 allowSyntheticDefaultImports: true,
```

## Good Ref:

https://www.sitepoint.com/react-with-typescript-best-practices/
