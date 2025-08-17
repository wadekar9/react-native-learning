import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, JumpingTransition, LinearTransition } from 'react-native-reanimated';

interface Item {
    id: number;
    name: string;
}

const listdata: Item[] = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
}));

const RNListLayoutAnimation = () => {

    const [data, setData] = useState<Array<Item>>(listdata);

    const generateRandomItem = (): Item => {
        const randomNumber = Math.floor(Math.random() * 1000);
        return {
            id: randomNumber,
            name: `RandomItem ${randomNumber}`,
        }
    }

    const addItem = () => {
        setData((prevData) => [...prevData, generateRandomItem()]);
    }

    const removeItem = (id: number) => {
        setData((prevData) => prevData.filter(item => item.id !== id));
    }


    const renderItem = ({ item }: { item: Item }) => (
        <Animated.View entering={LinearTransition}>
            <TouchableOpacity style={styles.item} onPress={() => removeItem(item.id)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={data}
                renderItem={renderItem}
                itemLayoutAnimation={LinearTransition}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Add Item" onPress={addItem} />
            <Button title="Remove Item" onPress={() => removeItem(data[data.length - 1].id)} />
        </View>
    )
}

export default RNListLayoutAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#ccc',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})