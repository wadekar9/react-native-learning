import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { createWorkletRuntime, runOnJS, runOnRuntime, runOnUI, useAnimatedStyle, useSharedValue, withSpring, WorkletRuntime } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useState } from 'react';

const runtime: WorkletRuntime = createWorkletRuntime('background');

const Threading = () => {

    const [heavyComputationResult, setHeavyComputationResult] = useState(0);
    const [count, setCount] = useState(0);
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);

    const updateCount = () => setCount((prev) => prev + 1);

    const handleTap = Gesture.Tap().onEnd(() => {
        'worklet'
        runOnJS(updateCount)();
        scale.value = withSpring(scale.value === 1 ? 1.5 : 1);
    })

    const moveBox = () => {
        runOnUI(() => {
            'worklet';
            translateX.value = withSpring(translateX.value === 0 ? 150 : 0);
        });
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { translateX: translateX.value }]
        }
    });

    const updateComputationResult = (result: number) => {
        setHeavyComputationResult(result);
    }

    const heavyComputation = () => {
        'worklet';
        let sum = 0;
        for (let i = 0; i < 1000000000; i++) {
            sum += i;
        }
        runOnJS(updateComputationResult)(sum);
    }

    const startHeavyTask = () => {
        runOnRuntime(runtime, heavyComputation);
    }

    return (
        <View style={styles.container}>
            <GestureDetector gesture={handleTap}>
                <Animated.View style={[styles.box, animatedStyle]}>
                    <Text style={styles.text}>Gesture View</Text>
                </Animated.View>
            </GestureDetector>

            <Text style={styles.text}>Count : {count}</Text>
            <Button title='Move Box' onPress={moveBox} />
            <Button title='Start Heavy Task' onPress={startHeavyTask} />
            <Text style={styles.text}>Heavy Computation Result : {heavyComputationResult}</Text>
        </View>
    )
}

export default Threading

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