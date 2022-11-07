import { View, StyleSheet, ScrollView, Text } from 'react-native'
import React, { useEffect } from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import { SafeAreaView } from 'react-native'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems from '../components/home/RestaurantItems'
import { useState } from 'react';

const YELP_API_KEY = 'JyMwHwQwMT5-i8uNIRDBfgbSmbgDqYsjZE3KV2Siqmo_7r2aOctl9Qfn5u-zaviCbjhVD--R-r1MhG04HKbsY4vQGo0-CF8N7IZUKcPU2FFPV0F_lgATY_KnyYVjY3Yx'

export default function Home({navigation, route}) {
    const [restaurantsData, setRestaurantsData] = useState([])
    const [city, setCity] = useState("San Francisco")
    const [selectedTab, setSelectedTab] = useState('Delivery')

    //Load Business Restaurants 

    const getRestaurantsFromYelp = async () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    
        const apiOptions = {
            headers: {
                Authorization : `Bearer ${YELP_API_KEY}`,
            },
        };
    
        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) => 
                setRestaurantsData(
                    json.businesses//?.filter((e) => e.transactions.includes(selectedTab.toLocaleLowerCase()))
                )
            ).catch((error) => {console.log(error)})
                
    };

    useEffect(() => {
        getRestaurantsFromYelp()
    }, [city, selectedTab])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <HeaderTabs restaurantsData = {restaurantsData} setRestaurantsData = {setRestaurantsData} selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} />
                <SearchBar setCity= {setCity}  />
            </View>
            <Categories />  
            <View style={{backgroundColor: 'transparent', position:'relative', zIndex : 99, top: 10, }}>
                <Text style={{backgroundColor: 'orange', padding: 8, width: 120, overflow: 'hidden', marginTop: 5, position:'absolute', zIndex: 999}}>
                    Restaurants in 
                    <Text style={{fontWeight: '700'}}> {city} </Text>
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <RestaurantItems restaurantsData={restaurantsData} router={route} navigation = {navigation} />
            </ScrollView>
            {/* <BottomTabs /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea : {
        backgroundColor:'#eee',
        flex: 1,
    },
    container:{
        backgroundColor: 'white',
        padding: 15
    },
    divider: {
        borderTopWidth: 1,
        borderColor: '#d9d9d9'
    }
})