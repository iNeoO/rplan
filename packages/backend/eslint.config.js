import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

import bestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import errors from 'eslint-config-airbnb-base/rules/errors';
import es6 from 'eslint-config-airbnb-base/rules/es6';
import imports from 'eslint-config-airbnb-base/rules/imports';
import nodeRules from 'eslint-config-airbnb-base/rules/node';
import style from 'eslint-config-airbnb-base/rules/style';
import variables from 'eslint-config-airbnb-base/rules/variables';

export default [
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'prisma/zod/index.ts', 'eslint.config.js', 'schema.d.ts'],
    languageOptions: { globals: globals.browser },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...bestPractices.rules,
      ...errors.rules,
      ...es6.rules,
      ...imports.rules,
      ...nodeRules.rules,
      ...style.rules,
      ...variables.rules,
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      'no-use-before-define': ['error', { 'classes': false }],
    },
    settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
