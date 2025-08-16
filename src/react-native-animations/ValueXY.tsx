import { Animated, Dimensions, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const { width: DEVICE_WIDTH } = Dimensions.get('screen');

const ValueXY = () => {

    const position = useAnimatedValue(0);
    const position2 = useRef(new Animated.Value(0)).current;
    const position3 = Animated.add(position, position2);
    const xyValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const startAnimation = () => {
        Animated.timing(position2, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(position2, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            }).start(() => {
                console.log("FUCK, I DID IT.");
            })
        })
    }

    const startXYAnimation = () => {
        Animated.timing(xyValue, {
            toValue: { x: DEVICE_WIDTH * 0.9, y: 0 },
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        startXYAnimation()
    }, [])

    return (
        <>
            {/* <Animated.View style={[styles.box, xyValue.getLayout(), { backgroundColor: 'blue' }]} /> */}
            <Animated.View style={[styles.box, { transform: xyValue.getTranslateTransform() }, { backgroundColor: 'blue' }]} />
            <Animated.View style={[styles.box, { marginLeft: position2 }]} />
        </>
    )
}

export default ValueXY;

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    }
})