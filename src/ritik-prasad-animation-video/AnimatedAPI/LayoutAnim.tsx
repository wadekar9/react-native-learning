import { StyleSheet, Text, View, LayoutAnimation, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const LayoutAnim = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                LayoutAnimation.easeInEaseOut();
                setExpanded(!expanded);
            }}>
                <Text style={styles.buttonText}>{expanded ? 'Collapse' : 'Expand'}</Text>
            </TouchableOpacity>
            {expanded && <View style={styles.box}>
                <Text>Tight Tight Tight....</Text>
                <Text>Blue Yello Pink</Text>
            </View>}
        </View>
    )
}

export default LayoutAnim

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        width: 200,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    box: {
        width: 200,
        height: 100,
        backgroundColor: 'lightgray',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});