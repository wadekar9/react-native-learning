import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const RNGestureHandler = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);

    const tapGesture = Gesture.Tap().numberOfTaps(2).onEnd(() => {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        scale.value = withSpring(1.5)
        rotation.value = withSpring(0)
    })

    const panGesture = Gesture.Pan().onUpdate((event) => {
        translateX.value = event.translationX
        translateY.value = event.translationY
    })

    const rotateGesture = Gesture.Rotation().onUpdate((event) => {
        rotation.value = event.rotation
    })

    const pinchGesture = Gesture.Pinch().onUpdate((event) => {
        scale.value = event.scale
    })

    const raceGesture = Gesture.Race(panGesture, pinchGesture, rotateGesture);
    const simultaneousGesture = Gesture.Simultaneous(pinchGesture, rotateGesture);
    const exclusiveGesture = Gesture.Exclusive(pinchGesture, panGesture, rotateGesture);



    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
                { rotate: rotation.value + 'rad' }
            ]
        }
    })

    return (
        <View style={styles.container}>
            <GestureDetector gesture={Gesture.Simultaneous(tapGesture, simultaneousGesture)}>
                <Animated.View style={[styles.box, animatedStyle]}>
                    <Text style={styles.text}>Gesture View</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default RNGestureHandler

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    }
})