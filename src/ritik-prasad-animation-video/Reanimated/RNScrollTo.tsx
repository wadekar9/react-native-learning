import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { scrollTo, SharedValue, useAnimatedRef, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;

const RNScrollTo = () => {

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scroll = useSharedValue<number>(0);

    const items = Array.from({ length: ITEM_COUNT }, (_, index) => index);

    useDerivedValue(() => {
        scrollTo(animatedRef, 0, scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN), true);
    }, [scroll]);

    return (
        <View style={styles.container}>
            <Incrementer increment={-1} scroll={scroll} />

            <View style={styles.scrollContainer}>
                <Animated.ScrollView ref={animatedRef}>
                    {items.map((_, idx) => (
                        <View key={idx} style={styles.box}>
                            <Text style={styles.boxText}>{idx}</Text>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>

            <Incrementer increment={1} scroll={scroll} />
        </View>
    )
}

const Incrementer = ({ increment, scroll }: { increment: number, scroll: SharedValue<number> }) => {
    return (
        <View style={styles.buttonWrapper}>
            <Button title={`Scroll ${Math.abs(increment)} ${increment > 0 ? 'up' : 'down'}`} onPress={() => scroll.value = (scroll.value + increment + ITEM_COUNT) % ITEM_COUNT} />
        </View>
    )
}

export default RNScrollTo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonWrapper: {
        marginBottom: 20
    },
    scrollContainer: {
        width: '100%',
        height: 250,
        alignItems: 'center'
    },
    box: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        margin: ITEM_MARGIN,
        borderRadius: 15,
        backgroundColor: '#b58df1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText: {
        textAlign: 'center'
    }
})