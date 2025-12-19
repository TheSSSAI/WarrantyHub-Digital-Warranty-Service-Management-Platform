module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './src/app',
          '@application': './src/application',
          '@domain': './src/domain',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
          '@shared': './src/shared',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};