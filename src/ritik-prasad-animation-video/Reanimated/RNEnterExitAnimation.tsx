import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, {
    FadeIn,
    FadeOut,
    BounceIn,
    BounceOut,
    FlipInEasyX,
    FlipOutEasyX,
    LightSpeedInLeft,
    LightSpeedOutLeft,
    RollInLeft,
    RollOutLeft,
    ZoomIn,
    ZoomOut,
    SlideInLeft,
    SlideOutRight
} from 'react-native-reanimated'

const WEBSITE_URL = 'https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations'

const RNEnterExitAnimation = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.wrapper}>
                {/* Fade Animation */}
                <Animated.View style={styles.box} entering={FadeIn} exiting={FadeOut}>
                    <Text style={styles.boxText}>Fade Animation</Text>
                </Animated.View>

                {/* Bounce Animation */}
                <Animated.View style={styles.box} entering={BounceIn} exiting={BounceOut}>
                    <Text style={styles.boxText}>Bounce Animation</Text>
                </Animated.View>

                {/* Flip Animation */}
                <Animated.View style={styles.box} entering={FlipInEasyX} exiting={FlipOutEasyX}>
                    <Text style={styles.boxText}>Flip Animation</Text>
                </Animated.View>

                {/* LightSpeed Animation */}
                <Animated.View style={styles.box} entering={LightSpeedInLeft} exiting={LightSpeedOutLeft}>
                    <Text style={styles.boxText}>LightSpeed Animation</Text>
                </Animated.View>

                {/* Roll Animation */}
                <Animated.View style={styles.box} entering={RollInLeft} exiting={RollOutLeft}>
                    <Text style={styles.boxText}>Roll Animation</Text>
                </Animated.View>

                {/* Zoom Animation */}
                <Animated.View style={styles.box} entering={ZoomIn} exiting={ZoomOut}>
                    <Text style={styles.boxText}>Zoom Animation</Text>
                </Animated.View>

                {/* Slide Animation */}
                <Animated.View style={styles.box} entering={SlideInLeft} exiting={SlideOutRight}>
                    <Text style={styles.boxText}>Slide Animation</Text>
                </Animated.View>
            </View>

            <Text style={styles.text}>For more animation visit <Text style={{ color: 'red' }} onPress={() => Linking.openURL(WEBSITE_URL)}>docs</Text></Text>
        </ScrollView>
    )
}

export default RNEnterExitAnimation

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20
    },
    container: {
        flexGrow: 1,
        padding: 20,
        gap: 20
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    boxText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: 'white',
        fontSize: 25
    }
})