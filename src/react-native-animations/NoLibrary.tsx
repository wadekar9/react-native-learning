import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const NoLibrary = () => {

    const [position, setPosition] = useState<number>(0);

    // useEffect(() => {
    //     let interval: NodeJS.Timeout;

    //     interval = setInterval(() => {
    //         setPosition((prev) => (prev < 200 ? prev + 5 : 0))
    //     }, 50);

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, []);

    return (
        <View style={styles.wrapper}>
            <View style={[styles.box, { marginLeft: position }]} />
        </View>
    )
}

export default NoLibrary

const styles = StyleSheet.create({
    wrapper: {
        flex: 2
    },
    box: {
        width: 150,
        height: undefined,
        aspectRatio: 1,
        backgroundColor: 'yellow'
    }
})