module.exports = {
    root: true,
    env: {browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist','.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-unused-vars': ['error', {
            varsIgnorePattern: '^_|motion', // Add 'motion' here
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_'
        }],
        'react/jsx-uses-vars': 'error', // This tells ESlint to check JSX usage
        'react/prop-types': 'off', // Disable prop-types since we're not usng TypeScript
    },
}