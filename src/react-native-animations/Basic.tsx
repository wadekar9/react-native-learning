import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Basic = () => {

    const position = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(position, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(position, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            }).start(() => {
                console.log("FUCK, I DID IT.");
            })
        })
    }

    useEffect(() => {
        startAnimation()
    }, [])

    return (
        <>
            <Animated.View style={[styles.box, { marginLeft: position }]} />
        </>
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