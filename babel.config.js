module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin', {
        processNestedWorklets: true,
        // relativeSourceLocation: true,
        // disableInlineStylesWarning: true,
        // omitNativeOnlyData: true,
        // globals: ['myObjectOnUI'],
        // substituteWebPlatformChecks: true,
      }
    ]
  ]
};
