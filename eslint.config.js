import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  rules: {
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'ts/no-unused-expressions': 'off',
    'no-case-declarations': 'off',
  },
})
