import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { LayoutAnimationConfig, PinwheelIn, PinwheelOut } from 'react-native-reanimated';

const RNSkippingAnimation = () => {

    const [outer, setOuter] = useState(false);
    const [inner, setInner] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.buttonColumn}>
                <Button
                    onPress={() => setOuter(!outer)}
                    title={toggleString(outer) + 'outer'} />
                <Button
                    onPress={() => setInner(!inner)}
                    title={toggleString(inner) + 'inner'} />
            </View>

            <LayoutAnimationConfig skipEntering>
                {outer && (
                    <Animated.View
                        entering={PinwheelIn}
                        exiting={PinwheelOut}
                        style={styles.outerBox}
                    >
                        <LayoutAnimationConfig skipExiting skipEntering>
                            {inner && (
                                <Animated.View
                                    entering={PinwheelIn}
                                    exiting={PinwheelOut}
                                    style={styles.innerBox}
                                >
                                    <Text>Inner Box</Text>
                                </Animated.View>
                            )}
                        </LayoutAnimationConfig>
                    </Animated.View>
                )}
            </LayoutAnimationConfig>
        </View>
    )
}

const toggleString = (value: boolean) => value ? 'Hide' : 'Show';

export default RNSkippingAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    buttonColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    innerBox: {
        width: 150,
        height: 150,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    outerBox: {
        width: 250,
        height: 250,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})