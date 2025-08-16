import { Animated, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect } from 'react'

// loop parallel stagger delay sequence

const NestingFunctions = () => {

    const animValue1 = useAnimatedValue(0);
    const animValue2 = useAnimatedValue(0);

    useEffect(() => {
        const sequenceAnimation = Animated.sequence([

            Animated.timing(animValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),

            Animated.timing(animValue2, {
                toValue: 0.4,
                duration: 1000,
                useNativeDriver: true
            }),

            Animated.timing(animValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ]);

        const parallelAnimation = Animated.parallel([

            Animated.timing(animValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),

            Animated.timing(animValue2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })

        ])

        // similar to sequence but with delay
        const staggerAnimation = Animated.stagger(5000, [

            Animated.timing(animValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),

            Animated.timing(animValue2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })

        ])


        const loopAnimation = Animated.loop(
            // Animated.timing(animValue2, {
            //     toValue: 1,
            //     duration: 1000,
            //     useNativeDriver: true
            // }),

            Animated.sequence([
                Animated.timing(animValue1, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),

                Animated.timing(animValue2, {
                    toValue: 0.4,
                    duration: 1000,
                    useNativeDriver: true
                })
            ]),

            { iterations: 5 } // if don't pass it will work infinet
        )


        const delayAnimation = Animated.sequence([
            Animated.delay(1000),
            Animated.timing(animValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ])

        // sequenceAnimation.start()
        // parallelAnimation.start()
        // staggerAnimation.start()
        // loopAnimation.start()
        delayAnimation.start()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { opacity: animValue1 }]} />
            <Animated.View style={[styles.box, { backgroundColor: 'blue', opacity: animValue2 }]} />
        </View>
    )
}

export default NestingFunctions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        margin: 10
    }
})