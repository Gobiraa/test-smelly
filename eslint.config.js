import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-conditional-expect': 'error',
      'jest/no-identical-title': 'error',
    },
  },
];

// **foi necessário alterar o json para js por conta da atualização da ferramenta**