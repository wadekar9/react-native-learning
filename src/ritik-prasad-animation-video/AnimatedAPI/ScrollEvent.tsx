import { Animated, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React from 'react'

const HEADER_HEIGHT = 80;
const SPACING = 20;

const ScrollEvent = () => {

    const scrollY = useAnimatedValue(0);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, 40],
        extrapolate: 'clamp'
    })

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Text style={styles.headerText}>Collapsble Animated Header</Text>
            </Animated.View>

            <Animated.FlatList
                data={Array.from({ length: 100 })}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50, flexGrow: 1 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{`item ${index}`}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default ScrollEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    itemContainer: {
        backgroundColor: '#444',
        padding: 20,
        marginVertical: 5,
        borderRadius: 8,
        width: '95%',
        alignSelf: 'center'
    },
    itemText: {
        color: '#ccc',
        fontSize: 16
    }
})