import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 100;

const ScrollHandler = () => {

    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const offsetY = event.contentOffset.y;
            // translateY.value = withSpring(offsetY > HEADER_HEIGHT ? -HEADER_HEIGHT : 0);
            opacity.value = interpolate(offsetY, [0, HEADER_HEIGHT / 2], [1, 0], 'clamp');
        }
    })

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { transform: [{ translateY }], opacity: opacity }]}>
                <Text style={styles.headerText}>Collapsible Header</Text>
            </Animated.View>

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.content}>
                    {Array.from({ length: 100 }).map((_, index) => (
                        <Text key={index} style={styles.text}>{`Item ${index}`}</Text>
                    ))}
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default ScrollHandler

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#6a19ba',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    content: {
        padding: 16
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#ccc'
    },
    scrollContent: {
        paddingTop: 10,
        flexGrow: 1
    }
})