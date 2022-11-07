import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

const items = [
    {
        text: 'Pick-up',
        image: require("../../assets/images/shopping-bag.png")
    },
    {
        text: 'Bakery Items',
        image : require('../../assets/images/fast-food.png')
    },
    {
        text: 'Deals',
        image : require('../../assets/images/deals.png')
    },
    {
        text: 'Coffee & Tea',
        image : require('../../assets/images/coffee.png')
    },
    {
        text: 'Desserts',
        image : require('../../assets/images/desserts.png')
    }
]

export default function Categories() {
    return (
        <View style={styles.view}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    items.map((item, index) => (
                        <View key={index} style={styles.container}>
                            <Image style={styles.image} source={item.image} />
                            <Text style={styles.title}>{item.text}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginTop: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 20,

        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        zIndex: 10
    },
    container: {
        alignItems: 'center',
        marginRight: 20
    },
    image:{
        width: 50,
        height: 40,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 13,
        fontWeight: '500'
    }
})