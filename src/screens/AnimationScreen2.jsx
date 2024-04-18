import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {faker} from '@faker-js/faker';

const BG_IMAGE = 'https://c4.wallpaperflare.com/wallpaper/459/731/792/landscape-city-vertical-wallpaper-preview.jpg';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: `${Math.random() * 1000000}`,
    image: faker.image.avatar(),
    name: faker.person.firstName(),
    jobTitle: faker.person.lastName(),
    email: faker.internet.email(),
  };
});

const SPACING = 15;
const AVATAR_SIZE = 70;

const AnimationScreen2 = () => {

    const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
<StatusBar hidden />
    <Image
        source={{
            uri: BG_IMAGE
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={3}
    />

      <Animated.FlatList
        data={DATA}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset : { y: scrollY } } }],
            { useNativeDriver : true }
        )}
        renderItem={({item, index}) => {

            const inputRange = [-1,0,130*index,130*(index+0.5)];
            const scale = scrollY.interpolate({
                inputRange,
                outputRange:[1,1,1,0]
            })

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: '#fff',
                borderRadius: 16,
                shadowColor:'#000',
                shadowOffset:{
                    height : 10,
                    width : 0
                },
                shadowOpacity: 1,
                shadowRadius:20,
                elevation:5,
                borderWidth:1,
                transform:[
                    {scale}
                ]
              }}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default AnimationScreen2;

const styles = StyleSheet.create({});
