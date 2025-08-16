import { Animated, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect, useRef } from 'react'


// V C F

const ValueXYComponent = () => {

    const position0 = useAnimatedValue(0);
    const position1 = useAnimatedValue(20);
    const position2 = Animated.add(position0, position1);
    const position4 = Animated.multiply(position0, position1);
    // const position5 = Animated.divide(2, position1);
    // const position6 = Animated.subtract(position0, position1);
    // const position7 = Animated.modulo(position0, 1);

    const basePosition = useAnimatedValue(50);
    const oscillation = useAnimatedValue(0);

    const combinedPosition = Animated.add(basePosition, oscillation);
    // const position = useRef(new Animated.Value(0)).current

    const XY_Value = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const startAnimation = () => {
        Animated.timing(position0, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false // if true animation will work on UI Thread otherwise on JS Thread
        }).start(() => {
            Animated.timing(position1, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start()
        })
    }

    const startXYAnimation = () => {
        Animated.timing(XY_Value, {
            toValue: { x: 150, y: 150 },
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    const startOscillationAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(oscillation, {
                    toValue: 50,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(oscillation, {
                    toValue: -50,
                    duration: 1000,
                    useNativeDriver: true
                })
            ]),
            { iterations: 5 } // infinity loop Math.Infinity
        ).start()
    }


    useEffect(() => {
        // startAnimation();
        // startXYAnimation();
        startOscillationAnimation()
    }, [])


    return (
        <View style={{ gap: 20 }}>
            <Animated.View style={[styles.box, { marginLeft: position4 }]} />
            {/* <Animated.View style={[styles.box2, XY_Value.getLayout()]} /> */}
            <Animated.View style={[styles.box2, { transform: XY_Value.getTranslateTransform() }]} />

            <Animated.View style={[styles.circle, { transform: [{ translateX: combinedPosition }] }]} />
        </View>
    )
}

export default ValueXYComponent

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    },
    box2: {
        width: 150,
        height: 150,
        backgroundColor: 'orange'
    },

    circle: {
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 400,
        backgroundColor: 'green'
    }
})