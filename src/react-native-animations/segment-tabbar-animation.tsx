import {
  Animated,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {Bell, House, Settings} from 'lucide-react-native';

const TABS = [
  {
    name: 'Home',
    icon: House,
  },
  {
    name: 'Settings',
    icon: Settings,
  },
  {
    name: 'Notifications',
    icon: Bell,
  },
];

const TabScreen = () => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
        },
      ]}>
      <Text>TabScreen</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, navigation, position}: MaterialTopTabBarProps) {
  const layoutWidth = useRef(0);

  return (
    <View
      style={styles.tabsContainer}
      onLayout={e => (layoutWidth.current = e.nativeEvent.layout.width)}>
      {state.routes.map((route, index) => {
        const Icon: any = TABS[index].icon;
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused)
            [
              navigation.navigate({
                name: route.name,
                merge: true,
              } as any),
            ];
        };

        const inputRange = state.routes.map((_, i) => i);
        const translateX = Animated.multiply(
          position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => {
              const diff = i - index;
              const x = layoutWidth.current / TABS.length;
              const value = diff > 0 ? x : diff < 0 ? -x : 0;
              return value;
            }),
          }),
          I18nManager.isRTL ? -1 : 1,
        );
        const textTranslateX = Animated.multiply(
          position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => {
              const diff = i - index;
              const x = layoutWidth.current / TABS.length;
              const value = diff > 0 ? x : diff < 0 ? -x : 0;
              return -value;
            }),
          }),
          I18nManager.isRTL ? -1 : 1,
        );

        return (
          <TouchableOpacity
            style={{flex: 1, overflow: 'hidden'}}
            key={index}
            onPress={onPress}>
            <View style={styles.iconTextContainer}>
              <Icon size={20} color="grey" />
              <Text style={{color: 'grey'}}>{route.name}</Text>
            </View>

            <Animated.View
              style={[
                styles.tagBGColor,
                {overflow: 'hidden', transform: [{translateX}]},
              ]}>
              <Animated.View
                style={[
                  styles.iconTextContainer,
                  {transform: [{translateX: textTranslateX}]},
                ]}>
                <Icon size={20} color="black" />
                <Text style={{color: 'black'}}>{route.name}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const SegmentTabbarAnimation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator tabBar={MyTabBar}>
        {TABS.map((tab, index) => (
          <Tab.Screen key={index} name={tab.name} component={TabScreen} />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SegmentTabbarAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 10,
    height: 50,
  },
  tagBGColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  tabsContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#E2E2E2',
    borderRadius: 1000,
  },
});
