import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // Require semicolons at the end of statements.
      semi: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }]
    },
  },
);