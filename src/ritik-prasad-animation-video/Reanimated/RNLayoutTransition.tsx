import React, { useState, useRef, Dispatch } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Animated, {
    LinearTransition,
    SequencedTransition,
    FadingTransition,
    FadeOut,
    JumpingTransition,
    CurvedTransition,
    EntryExitTransition,
    FlipOutYLeft,
    FlipInEasyY,
    Easing,
} from 'react-native-reanimated';

const INITIAL_LIST = [
    { id: 1, emoji: '🍌', color: '#b58df1' },
    { id: 2, emoji: '🍎', color: '#ffe780' },
    { id: 3, emoji: '🥛', color: '#fa7f7c' },
    { id: 4, emoji: '🍙', color: '#82cab2' },
    { id: 5, emoji: '🍇', color: '#fa7f7c' },
    { id: 6, emoji: '🍕', color: '#b58df1' },
    { id: 7, emoji: '🍔', color: '#ffe780' },
    { id: 8, emoji: '🍟', color: '#b58df1' },
    { id: 9, emoji: '🍩', color: '#82cab2' },
];


const LAYOUT_TRANSITIONS = [
    { label: 'Linear Transition', value: LinearTransition },
    { label: 'Sequenced Transition', value: SequencedTransition },
    { label: 'Fading Transition', value: FadingTransition },
    { label: 'Jumping Transition', value: JumpingTransition },
    {
        label: 'Curved Transition',
        value: CurvedTransition.easingX(Easing.sin).easingY(Easing.exp),
    },
    {
        label: 'Entry/Exit Transition',
        value: EntryExitTransition.entering(FlipInEasyY).exiting(FlipOutYLeft),
    },
];


export default function RNLayoutTransition() {
    const [items, setItems] = useState(INITIAL_LIST);
    const [selected, setSelected] = useState(LAYOUT_TRANSITIONS[4]);

    const removeItem = (idToRemove: any) => {
        const updatedItems = items.filter((item: any) => item.id !== idToRemove);
        setItems(updatedItems);
    };

    const onSelect = (item: any) => {
        setSelected(item);
        setItems(INITIAL_LIST);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Items selected={selected} items={items} onRemove={removeItem} />
            </View>
        </SafeAreaView>
    );
}

function Items({ selected, items, onRemove }: any) {
    return (
        <View style={styles.gridContainer}>
            {items.map((item: any) => (
                <Animated.View
                    key={item.id}
                    layout={selected.value}
                    exiting={FadeOut}
                    style={[styles.tileContainer, { backgroundColor: item.color }]}>
                    <Tile emoji={item.emoji} onRemove={() => onRemove(item.id)} />
                </Animated.View>
            ))}
        </View>
    );
}

function Tile({ emoji, onRemove }: any) {
    return (
        <TouchableOpacity onPress={onRemove} style={styles.tile}>
            <Animated.Text style={styles.tileLabel}>{emoji}</Animated.Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        gap: 20,
        width: 'auto',
        display: 'flex',
        minHeight: 300,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    dropdownContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    tileContainer: {
        width: '20%',
        margin: '1%',
        borderRadius: 16,
        minHeight: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tile: {
        flex: 1,
        height: '100%',
        width: ' 100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileLabel: {
        color: '#f8f9ff',
        fontSize: 24,
    },
    wrapper: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
    },
    animatedView: {
        width: '100%',
        overflow: 'hidden',
    },
});