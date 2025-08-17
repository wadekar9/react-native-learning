import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withDecay, withSequence, withDelay, withClamp, withRepeat } from 'react-native-reanimated'

const AnimationMethods = () => {

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[animatedStyle, { width: 100, height: 100, backgroundColor: 'blue' }]} />

            <Button title='withTiming' onPress={() => translateX.value = withTiming(200, { duration: 1000 })} />
            <Button title='withSpring' onPress={() => translateX.value = withSpring(200, { damping: 10, stiffness: 100 })} />
            <Button title='withDecay' onPress={() => translateX.value = withDecay({ velocity: 10, deceleration: 0.98 })} />

            <Button title='withSequence' onPress={() => translateX.value = withSequence(withTiming(200, { duration: 1000 }), withSpring(translateX.value - 100, { damping: 10, stiffness: 100 }))} />

            <Button title='withDelay' onPress={() => translateX.value = withDelay(1000, withTiming(200, { duration: 1000 }))} />

            <Button title='withClamp' onPress={() => translateX.value = withClamp({ min: 0, max: 150 }, withTiming(120, { duration: 1000 }))} />

            <Button title='withRepeat' onPress={() => translateX.value = withRepeat(withTiming(translateX.value - 100, { duration: 1000 }), 3, true)} />
        </View>
    )
}

export default AnimationMethods

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})