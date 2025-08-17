import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const RNWorklets = () => {

    const translateX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    const moveBox = () => {
        'worklet';
        translateX.value = withSpring(translateX.value === 0 ? 150 : 0, { damping: 10, stiffness: 100 })
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={moveBox}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </Pressable>
        </View>
    )
}

export default RNWorklets

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        borderRadius: 24
    }
})