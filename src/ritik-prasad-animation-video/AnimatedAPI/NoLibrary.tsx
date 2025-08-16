import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const NoLibrary = () => {

    const [position, setPosition] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            setPosition((prev) => prev < 200 ? prev + 5 : 0);
        }, 50)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <View>
            <View style={[styles.box, { marginLeft: position }]} />
        </View>
    )
}

export default NoLibrary

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    }
})