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
import AnimationMethods from './Reanimated/AnimationMethods'
import RNHooksAnimations from './Reanimated/RNHooksAnimations'
import ScrollHandler from './Reanimated/ScrollHandler'
import RNScrollTo from './Reanimated/RNScrollTo'
import RNScrollOffset from './Reanimated/RNScrollOffset'
import RNKeyboardHandler from './Reanimated/RNKeyboardHandler'
import RNEnterExitAnimation from './Reanimated/RNEnterExitAnimation'
import RNLayoutTransition from './Reanimated/RNLayoutTransition'
import RNSkippingAnimation from './Reanimated/RNSkippingAnimation'
import RNListLayoutAnimation from './Reanimated/RNListLayoutAnimation'
import RNKeyframeAnimation from './Reanimated/RNKeyframeAnimation'
import RNWorklets from './Reanimated/RNWorklets'
import RNGestureHandler from './Reanimated/RNGestureHandler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Threading from './Reanimated/Threading'
import SkiaBasics from './Skia/SkiaBasics'
import GarGameWithSkia from './Skia/GarGameWithSkia'

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

                {/* <RNBasic /> */}
                {/* <AnimationMethods /> */}
                {/* <RNHooksAnimations /> */}
                {/* <ScrollHandler /> */}
                {/* <RNScrollTo /> */}
                {/* <RNScrollOffset /> */}
                {/* <RNKeyboardHandler /> */}
                {/* <RNEnterExitAnimation /> */}
                {/* <RNLayoutTransition /> */}
                {/* <RNSkippingAnimation /> */}
                {/* <RNListLayoutAnimation /> */}
                {/* <RNKeyframeAnimation /> */}
                {/* <RNWorklets /> */}
                {/* <RNGestureHandler /> */}
                {/* <Threading /> */}

                {/* <SkiaBasics /> */}
                <GarGameWithSkia />
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