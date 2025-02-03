/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';
import switchTheme from 'react-native-theme-switch-animation';

export default function ThemeScreen() {
  const [theme, setTheme] = React.useState('light');

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme === 'light' ? 'white' : 'black',
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: theme === 'light' ? 'black' : 'white',
          borderRadius: 1.4,
          padding: 50,
        }}
      >
        <Text
          style={{
            color: theme === 'light' ? 'black' : 'white',
          }}
        >
          test
        </Text>
      </View>
      <Button
        title="Switch Theme"
        onPress={() => {
          switchTheme({
            switchThemeFunction: () => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            },
            animationConfig: {
              type: 'fade', //1. fade  2. inverted-circular 3.  circular
              duration: 1000,
              startingPoint: {
                cxRatio: 0.5,
                cyRatio: 0,
              },
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});