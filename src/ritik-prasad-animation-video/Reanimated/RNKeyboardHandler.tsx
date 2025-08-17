import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

const RNKeyboardHandler = () => {

    const [value, setValue] = useState<string>('');
    const keyboard = useAnimatedKeyboard();
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value }],
    }))

    return (
        <Animated.View style={[styles.container, animatedStyles]}>
            <TextInput placeholder='Enter your name' style={styles.input} value={value} onChangeText={setValue} />
        </Animated.View>
    )
}

export default RNKeyboardHandler

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        margin: 20
    }
})