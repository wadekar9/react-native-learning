import { Animated, StyleSheet, Text, Touchable, TouchableOpacity, useAnimatedValue, View } from 'react-native'
import React from 'react'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const RNCreateAnimatedComponent = () => {

    const scaleValue = useAnimatedValue(1);

    function handlePressIn() {
        Animated.spring(scaleValue, {
            toValue: 0.85,
            useNativeDriver: true
        }).start()
    }

    function handlePressOut() {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }

    return (
        <AnimatedTouchableOpacity
            activeOpacity={1}
            style={[styles.container, { transform: [{ scale: scaleValue }] }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text>Press Me</Text>
        </AnimatedTouchableOpacity>
    )
}

export default RNCreateAnimatedComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 200,
        height: undefined
    }
})