import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLibrary from './NoLibrary'
import Basic from './Basic'
import ValueXY from './ValueXY'

const ReactNativeAnimation = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Text style={styles.label}>ReactNativeAnimation</Text>

            {/* Animated API */}

            {/* <Basic /> */}
            <ValueXY />
        </View>
    )
}

export default ReactNativeAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222'
    },
    label: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '700',
        textDecorationLine: 'underline',
        marginVertical: 15,
        letterSpacing: 2
    }
})