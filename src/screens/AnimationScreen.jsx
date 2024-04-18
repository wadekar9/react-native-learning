import { Dimensions, FlatList, Image, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef } from 'react'

const { width, height } = Dimensions.get('window');

const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = height * 0.6;

const images = [
    'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1152707/pexels-photo-1152707.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2604929/pexels-photo-2604929.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=600'
]

const AnimationScreen = () => {

  const ScrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex : 1,backgroundColor:'#fff'}}>
      {
        images.map((ele, index) => {

          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ]

          const opacity = ScrollX.interpolate({
            inputRange : inputRange,
            outputRange : [0,1,0]
          })

          return(
            <View key={`${index}`} style={StyleSheet.absoluteFillObject}>
              <Animated.Image
                source={{
                  uri: ele
                }}
                style={{...StyleSheet.absoluteFillObject, opacity}}
                resizeMode={'cover'}
                blurRadius={30}
              />
            </View>
          )
        })
      }
      <Animated.FlatList
        data={images}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x:ScrollX}}}],
          { useNativeDriver : true }
        )}
        keyExtractor={(_,index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        overScrollMode={'never'}
        pagingEnabled={true}
        horizontal={true}
        renderItem={({item,index}) => {
            return(
                <View style={{width:width,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        source={{
                            uri : item
                        }}
                        resizeMode={'cover'}
                        style={{
                            width:IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                            backgroundColor : 'green',
                            borderRadius: 20
                        }}
                    />
                </View>
            )
        }}
      />
    </View>
  )
}

export default AnimationScreen

const styles = StyleSheet.create({})