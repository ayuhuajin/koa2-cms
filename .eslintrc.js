module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "allowImportExportEverywhere": true //ignore eslint error: 'import' and 'export' may only appear at the top level
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  // plugins: [
  //   'html',
  //   'vue'
  // ],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  'rules': {
    'no-console': 'off',
    'quotes': [2, 'single', {
      'avoidEscape': false,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'always'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
  }
}
