import { Animated, Easing, PanResponder, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Interpolation = () => {

    const pan = useRef(new Animated.ValueXY()).current
    const animatedValue = useAnimatedValue(0);

    const diffClampY = useRef(Animated.diffClamp(pan.y, -100, 100)).current;
    const diffClampX = useRef(Animated.diffClamp(pan.x, -100, 100)).current;

    const startInterpolation = () => {
        Animated.timing(animatedValue, {
            toValue: 4,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start();
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: pan.x, dy: pan.y }
        ], {
            useNativeDriver: false
        }),
        onPanResponderRelease(e, gestureState) {
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        },
    })

    useEffect(() => {
        startInterpolation()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, {
                transform: [{
                    translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, 200],
                        // extrapolate: 'identity',
                        extrapolateLeft: 'extend',
                        extrapolateRight: 'clamp'
                    })
                }]
            }]} />

            <Animated.View {...panResponder.panHandlers} style={[styles.box2, { transform: [{ translateY: diffClampY }, { translateX: diffClampX }] }]} />
        </View>
    )
}

export default Interpolation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 120,
        backgroundColor: 'green'
    },
    box2: {
        width: 100,
        height: 100,
        borderRadius: 120,
        backgroundColor: 'blue',
        marginTop: 20
    }
})