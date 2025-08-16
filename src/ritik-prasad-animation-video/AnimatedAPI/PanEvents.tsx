import { Animated, PanResponder, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect, useRef } from 'react'


const PanEvents = () => {

    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scale = useAnimatedValue(1);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                Animated.spring(scale, {
                    toValue: 1.2,
                    useNativeDriver: true
                }).start()
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y }
            ], { useNativeDriver: false }),
            onPanResponderRelease: (event, gestureState) => {
                Animated.parallel([
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true
                    }),
                    Animated.spring(scale, {
                        toValue: 1,
                        useNativeDriver: true
                    }),
                ]).start()
            }
        })
    ).current;


    return (
        <View style={styles.container}>
            <Animated.View {...panResponder.panHandlers} style={[styles.box, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scale }] }]} />
        </View>
    )
}

export default PanEvents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 10
    }
})