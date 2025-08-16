import { Animated, Button, Easing, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React from 'react'

const EasingAnimation = () => {

    const animatedValue = useAnimatedValue(0);

    const startAnimation = (easingFunction: (value: number) => number) => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: easingFunction,
            useNativeDriver: true
        }).start();
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            {
                                translateX: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 200],
                                })
                            }
                        ]
                    }
                ]}
            />

            <Button title='Step0' onPress={() => startAnimation(Easing.step0)} />
            <Button title='Step1' onPress={() => startAnimation(Easing.step1)} />
            <Button title='Linear' onPress={() => startAnimation(Easing.linear)} />
            <Button title='cubic' onPress={() => startAnimation(Easing.cubic)} />
            <Button title='bounce' onPress={() => startAnimation(Easing.bounce)} />
        </View>
    )
}

export default EasingAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        marginBottom: 20
    }
})