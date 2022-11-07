import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import About from '../components/restaurantDetails/About'
import ViewCart from '../components/restaurantDetails/ViewCart';
import MenuItems from '../components/restaurantDetails/MenuItems';


const foods = [
    {
        id: 1,
        name: 'Burger',
        desc: 'Full Packed burger',
        price: 32,
        image: require('../assets/foods/burger.png')
    },
    {
        id: 2,
        name: 'Spicy Chicken',
        desc: 'Amazing delicious Chicken',
        price: 43,
        image: require('../assets/foods/chickken.png')
    },
    {
        id: 3,
        name: 'Fries',
        desc: 'Complete delicious fries',
        price: 29,
        image: require('../assets/foods/fries.png')
    },
    {
        id: 4,
        name: 'Meat Dessert',
        desc: 'Delicious meat dessert',
        price: 42,
        image: require('../assets/foods/meat_desert.png')
    },
    {
        id: 5,
        name: 'Mini Steak',
        desc: 'Amazing and delicious mini steak',
        price: 53,
        image: require('../assets/foods/mini_steak.png')
    },
    {
        id: 6,
        name: 'Noodles',
        desc: 'Spicy and yummy noodles',
        price: 35,
        image: require('../assets/foods/noodles.png')
    },
    {
        id: 7,
        name: 'Shawarma',
        desc: 'Sweet and Spicy Shawarma',
        price: 22,
        image: require('../assets/foods/shawarma.png')
    },
    {
        id: 8,
        name: 'Steak',
        desc: 'Delicious steak you should try',
        price: 12,
        image: require('../assets/foods/steak.png')
    },
    {
        id: 9,
        name: 'Salad Steak',
        desc: 'Fully packed vegies with steak',
        price: 62,
        image: require('../assets/foods/vege_steak.png')
    },
    {
        id: 10,
        name: 'Meat',
        desc: 'Plenty, Delicious and Spicy meat for desert',
        price: 52,
        image: require('../assets/foods/meat_desert.png')
    },
]

const RestaurantDetails = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            <About navigation={navigation} route={route} />
            <MenuItems navigation = {navigation} restaurantName={route.params.name} foods={foods} />
            <ViewCart navigation = {navigation} route ={route} />
            <View style={styles.divider} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    divider: {
        borderTopWidth: 1,
        borderColor: '#d9d9d9'
    },
    viewCart : {
       
    }
})

export default RestaurantDetails