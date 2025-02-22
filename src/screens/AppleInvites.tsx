import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marquee } from '@animatereactnative/marquee'
import Animated, { FadeIn, FadeOut, runOnJS, useAnimatedReaction, useSharedValue, Easing, FadeInUp, SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { Stagger } from '@animatereactnative/stagger';

const images = [
    'https://cdn.pixabay.com/photo/2019/06/12/21/09/ocean-4270250_960_720.jpg',
    'https://cdn.pixabay.com/photo/2023/05/23/15/26/bengal-cat-8012976_640.jpg',
    'https://cdn.pixabay.com/photo/2023/06/14/09/18/trees-8062668_640.jpg',
    'https://cdn.pixabay.com/photo/2023/08/26/18/01/planet-8215532_640.png',
    'https://cdn.pixabay.com/photo/2024/04/27/04/45/ai-generated-8722995_960_720.jpg',
    'https://cdn.pixabay.com/photo/2024/04/27/04/45/ai-generated-8722981_1280.jpg'
];

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.62;
const ITEM_HEIGHT = ITEM_WIDTH * 1.67;
const SPACING = 16;
const ITEM_SIZE = ITEM_WIDTH + SPACING;

function ListItem({ image }: { image: string; }) {

    return (
        <Animated.View style={[{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 16, overflow: 'hidden' }]}>
            <Image source={{ uri: image }} style={{ flex: 1 }} />
        </Animated.View>
    )
}

const AppleInvites = () => {

    const offset = useSharedValue(0);
    const [activeIndex, setActiveIndex] = React.useState(0);

    useAnimatedReaction(() => {
        const flotted = Math.floor(((offset.value + width / 2) / ITEM_SIZE) % images.length);
        return Math.abs(flotted);
    }, (value) => {
        runOnJS(setActiveIndex)(value);
    })

    return (
        <View style={styles.wrapper}>
            <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
                <Animated.Image
                    source={{ uri: images[activeIndex] }}
                    style={{ flex: 1 }}
                    key={`image-${activeIndex}`}
                    blurRadius={50}
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                />
            </View>
            <Marquee
                spacing={SPACING}
                position={offset}
            >
                <Animated.View
                    style={{ flexDirection: 'row', gap: SPACING }}
                    entering={FadeInUp.delay(500).duration(1000).easing(Easing.elastic(0.9)).withInitialValues({ transform: [{ translateY: -ITEM_HEIGHT / 2 }] })}
                >
                    {images.map((image, idx) => <ListItem key={`${idx}`} image={image} />)}
                </Animated.View>
            </Marquee>

            <Stagger
                style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}
                key={"text"}
                stagger={100}
                duration={500}
                initialExitingDelay={1000}
            >
                <Text style={{ color: 'white', fontWeight: '500', opacity: 0.5 }}>Welcome to</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>Apple Invites</Text>
                <Text style={{ color: 'white', opacity: 0.8, textAlign: 'center', paddingHorizontal: 20 }}>
                    An extensive collection of more than{" "} <Text style={{ fontWeight: 'bold' }}>135+</Text> react native animations meticulously crafted and ready-to-use.
                </Text>
            </Stagger>
        </View>
    )
}

export default AppleInvites

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})