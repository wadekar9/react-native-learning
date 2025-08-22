import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skia, Canvas, Group, Circle } from '@shopify/react-native-skia'

const ITEM_SIZE = 256;
const RADIUS = ITEM_SIZE * 0.33;

const SkiaBasics = () => {
    return (
        <Canvas style={{ width: ITEM_SIZE, height: ITEM_SIZE }}>
            <Group blendMode={'multiply'}>
                <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} color="blue" />
                <Circle cx={ITEM_SIZE - RADIUS} cy={RADIUS} r={RADIUS} color="yellow" />
                <Circle cx={ITEM_SIZE / 2} cy={ITEM_SIZE - RADIUS} r={RADIUS} color="red" />
            </Group>
        </Canvas>
    )
}

export default SkiaBasics

const styles = StyleSheet.create({})