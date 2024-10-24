import promise from 'eslint-plugin-promise';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: [
    '**/node_modules/',
    '**/dist/',
    '**/example/',
    '**/jest.config.js',
    '**/eslint.config.mjs'
  ],
}, ...compat.extends(
  'eslint:recommended',
  'plugin:promise/recommended',
  'plugin:@typescript-eslint/strict',
  'plugin:@typescript-eslint/stylistic',
), {
  plugins: {
    promise,
    '@typescript-eslint': typescriptEslint,
    '@stylistic': stylistic,
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: ['./tsconfig.json'],
    },
  },

  rules: {
    '@stylistic/arrow-parens': 'off',
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/arrow-spacing': 'error',
    '@stylistic/brace-style': 'warn',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],

    '@stylistic/comma-spacing': ['error', {
      before: false,
      after: true,
    }],

    '@stylistic/computed-property-spacing': ['error', 'never'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/key-spacing': 'error',

    '@stylistic/max-len': ['error', {
      code: 140,
    }],

    '@stylistic/no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 0,
      maxBOF: 0,
    }],

    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'warn',
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/padded-blocks': ['error', 'never'],

    '@stylistic/padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }, {
      blankLine: 'always',
      prev: '*',
      next: 'throw',
    }, {
      blankLine: 'always',

      prev: [
        'multiline-expression',
        'multiline-block-like',
        'multiline-const',
        'multiline-let',
      ],

      next: 'continue',
    }, {
      blankLine: 'always',

      prev: [
        'multiline-expression',
        'multiline-block-like',
        'multiline-const',
        'multiline-let',
      ],

      next: 'break',
    }, {
      blankLine: 'always',

      prev: [
        'multiline-expression',
        'multiline-block-like',
        'multiline-const',
        'multiline-let',
      ],

      next: [
        'multiline-expression',
        'multiline-block-like',
        'multiline-const',
        'multiline-let',
      ],
    }],

    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/semi-spacing': 'error',
    '@stylistic/space-before-blocks': 'error',

    '@stylistic/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],

    '@stylistic/space-in-parens': ['error', 'never'],
    '@stylistic/spaced-comment': 'warn',
    '@stylistic/indent': ['error', 2],

    '@typescript-eslint/array-type': ['error', {
      default: 'array',
      readonly: 'array',
    }],

    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    curly: 'error',
    'dot-notation': 'warn',
    eqeqeq: ['warn', 'always'],

    'no-console': ['error', {
      allow: ['error', 'warn'],
    }],

    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-eval': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',
  },
}, {
  files: ['**/*.spec.ts', '**/*.spec.js'],

  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}];
