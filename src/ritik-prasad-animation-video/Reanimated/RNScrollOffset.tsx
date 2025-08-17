import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Animated, { DerivedValue, useAnimatedProps, useAnimatedRef, useDerivedValue, useScrollViewOffset } from 'react-native-reanimated';

const RNScrollOffset = () => {

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(animatedRef);
    const text = useDerivedValue(() => `Scroll Offset : ${scrollOffset.value.toFixed(2)}`);

    const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Animated.ScrollView style={styles.scroll} ref={animatedRef} contentContainerStyle={styles.scrollContent} horizontal={isScrollHorizontal}>
                {Array.from({ length: 100 }).map((_, idx) => (
                    <View key={idx} style={styles.box}>
                        <Text style={styles.center}>{idx}</Text>
                    </View>
                ))}
            </Animated.ScrollView>

            <AnimatedText text={text} />

            <View style={styles.buttonWrapper}>
                <Button title={`Toggle scroll to ${isScrollHorizontal ? 'Vertical' : 'Horizontal'}`} onPress={() => setIsScrollHorizontal(!isScrollHorizontal)} />
            </View>
        </View>
    )
}

export default RNScrollOffset

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20
    },
    scroll: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 250,
        width: 250,
        margin: 20
    },
    scrollContent: {
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#b58df1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        textAlign: 'center'
    },
    buttonWrapper: {
        marginVertical: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 15,
        marginVertical: 20,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

Animated.addWhitelistedNativeProps({ text: true });

function AnimatedText({ text, ...props }: { text: DerivedValue<string> }) {

    const animatedProps = useAnimatedProps(() => ({
        text: text.value,
        defaultValue: text.value
    }))

    return <AnimatedTextInput style={styles.textInput} editable={false} {...props} value={text.value} animatedProps={animatedProps} />;
}