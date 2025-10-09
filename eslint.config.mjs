import promise from 'eslint-plugin-promise';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
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
), {
  plugins: {
    promise,
    '@typescript-eslint': typescriptEslint,
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
