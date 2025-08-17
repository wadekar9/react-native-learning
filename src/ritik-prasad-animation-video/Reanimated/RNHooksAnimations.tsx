import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, useAnimatedRef, useAnimatedStyle, useSharedValue, useAnimatedProps, useDerivedValue, withRepeat, withTiming, measure } from 'react-native-reanimated';

// useDerivedValue
// useAnimatedStyle
// useAnimatedRef
// useAnimatedProps - svg
// createAnimatedComponent

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const RNHooksAnimations = () => {

    const [value, setValue] = useState<number | undefined>(0);
    const progress = useSharedValue(0);
    const animatedRef = useAnimatedRef();

    const borderRadius = useDerivedValue(() => {
        return 10 + progress?.value * 5;
    })


    useEffect(() => {
        progress.value = withRepeat(
            withTiming(10, { duration: 2000, easing: Easing.linear }),
            Infinity,
            true
        )
    }, [])

    // const animatedProps = useAnimatedProps(() => {
    //     return {
    //         borderRadius: borderRadius.value
    //     }
    // })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            borderRadius: borderRadius.value
        }
    })

    useEffect(() => {
        setTimeout(() => {
            const layout = measure(animatedRef);
            console.log(layout);
            if (layout) {
                setValue(layout?.height);
            }
        }, 1000);
    }, [])


    return (
        <View style={styles.container}>
            <Animated.View
                ref={animatedRef}
                style={[styles.box, animatedStyle]}
            />

            <Text style={{ color: 'white' }}>{JSON.stringify(value)}</Text>
        </View>
    )
}

export default RNHooksAnimations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'blue'
    }
})