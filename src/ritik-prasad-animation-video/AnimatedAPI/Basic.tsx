import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'


// V C F

const Basic = () => {

    const position = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(position, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false // if true animation will work on UI Thread otherwise on JS Thread
        }).start(() => {
            Animated.timing(position, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            }).start()
        })
    }

    useEffect(() => {
        startAnimation();

        return () => {

        }
    }, [])


    return (
        <View>
            <Animated.View style={[styles.box, { marginLeft: position }]} />
        </View>
    )
}

export default Basic

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    }
})