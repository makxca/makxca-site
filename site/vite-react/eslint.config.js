import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-refresh/only-export-components': "off",
      '@typescript-eslint/no-explicit-any' : "off",
      "indent": [
        "error",
        4
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "import/extensions": "off",
      "no-undef": "error",
      "no-restricted-exports": "off",
      "comma-spacing": "error",
      "comma-dangle": [
          "error",
          {
              "functions": "never",
              "objects": "always-multiline",
              "arrays": "always-multiline"
          }
      ],
      "no-underscore-dangle": ["off"],
      "no-restricted-syntax": ["off"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "arrow-parens": ["error", "as-needed"],
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
      "no-param-reassign": "error",
      "no-console": "off",
      "no-use-before-define": ["error", {
          "functions": false,
          "classes": true,
          "variables": true,
          "allowNamedExports": false
      }],
      "prefer-const": "error",
      "space-infix-ops": "error",
      "object-curly-spacing": ["error", "always"],
      "operator-linebreak": ["error", "before"],
      "object-curly-newline": ["error", {
          "ObjectExpression": { "multiline": true},
          "ObjectPattern": { "multiline": true },
          "ImportDeclaration": { "multiline": true },
          "ExportDeclaration": { "multiline": true }
      }],
      "brace-style": ["error", "1tbs"],
      "space-before-blocks": "error",
      "key-spacing": ["error", {
          "afterColon": true,
          "beforeColon": false,
          "mode": "minimum"
          }],
      "no-var": "error",

      "import/order": [ 1, {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "pathGroups": [
          {
            pattern: "**/*.module.scss",
            position: "after",
            group: "type",
          },
          {
            pattern: "./*.module.css",
            position: "after",
            group: "type",
          },
        ]
      }],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": "off",

      "no-console": ["error", { allow: ["warn", "error"] }]
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
