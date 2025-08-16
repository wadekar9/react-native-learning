import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoLibrary from './AnimatedAPI/NoLibrary'
import Basic from './AnimatedAPI/Basic'
import ValueXYComponent from './AnimatedAPI/ValueXYComponent'
import Interpolation from './AnimatedAPI/Interpolation'
import AnimTypes from './AnimatedAPI/AnimTypes'
import EasingAnimation from './AnimatedAPI/EasingAnimation'
import NestingFunctions from './AnimatedAPI/NestingFunctions'
import PanEvents from './AnimatedAPI/PanEvents'
import RNCreateAnimatedComponent from './AnimatedAPI/RNCreateAnimatedComponent'
import LayoutAnim from './AnimatedAPI/LayoutAnim'
import ScrollEvent from './AnimatedAPI/ScrollEvent'
import RNBasic from './Reanimated/RNBasic'

const AnimatedApp = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Text style={styles.text}>Animations</Text>
            <View style={styles.container}>

                {/* Animated API */}

                {/* <NoLibrary /> */}
                {/* <Basic /> */}
                {/* <ValueXYComponent /> */}
                {/* <Interpolation /> */}
                {/* <AnimTypes /> */}
                {/* <EasingAnimation /> */}
                {/* <NestingFunctions /> */}
                {/* <PanEvents /> */}
                {/* <RNCreateAnimatedComponent /> */}
                {/* <LayoutAnim /> */}
                {/* <ScrollEvent /> */}



                {/* Reanimated API */}

                <RNBasic />

            </View>
        </View>
    )
}

export default AnimatedApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222'
    },
    text: {
        color: "#fff",
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '700',
        textDecorationLine: 'underline'
    }
})