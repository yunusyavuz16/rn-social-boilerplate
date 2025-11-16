module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@contexts': './src/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin', // Must be last
  ],
};
