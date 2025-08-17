import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const RNBasic = () => {

    const width = useSharedValue(100);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
            height: 100,
            backgroundColor: 'violet'
        };
    });

    const handlePress = () => {
        width.value = withSpring(width.value + 150, {
            damping: 10
        });
    }

    return (
        <View>
            <Animated.View style={animatedStyle} />

            <Button title='CLICK' onPress={handlePress} />
        </View>
    )
}

export default RNBasic

const styles = StyleSheet.create({})