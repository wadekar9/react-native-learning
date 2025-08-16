import { View, Text, StyleSheet, Animated, useAnimatedValue } from 'react-native'
import React, { useEffect } from 'react'

const AnimTypes = () => {

    const springValue = useAnimatedValue(0);
    const decayValue = useAnimatedValue(0);
    const timingValue = useAnimatedValue(0);

    const startDecay = () => {
        Animated.decay(decayValue, {
            velocity: 2,
            deceleration: 0.9,
            useNativeDriver: true
        }).start()
    }

    const startSpring = () => {
        Animated.spring(springValue, {
            toValue: 1,
            friction: 5,
            tension: 40,
            delay: 4000,
            useNativeDriver: true
        }).start()
    }

    const startTiming = () => {

        // default easing is in out
        Animated.timing(timingValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    const animatedX = decayValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 300]
    })

    const animatedSpringX = {
        transform: [
            {
                translateY: springValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200]
                })
            }
        ]
    }

    const animatedTimingX = {
        transform: [
            {
                translateX: timingValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200]
                })
            }
        ]
    }

    useEffect(() => {
        startDecay()
        startSpring()
        startTiming()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box1, { transform: [{ translateX: animatedX }] }]} />
            <Animated.View style={[styles.box2, animatedSpringX]} />
            <Animated.View style={[styles.box3, animatedTimingX]} />
        </View>
    )
}

export default AnimTypes

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box1: {
        width: 100,
        height: 100,
        backgroundColor: 'orange'
    },
    box2: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        marginVertical: 15
    },
    box3: {
        width: 100,
        height: 100,
        backgroundColor: 'green'
    },
})