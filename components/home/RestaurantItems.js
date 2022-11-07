import { View, Text, StyleSheet, Image, TouchableOpacity,ActivityIndicator  } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function RestaurantItems({restaurantsData, navigation, route}) {  

    if(restaurantsData === undefined){
        return (
            <View style={{display:'flex', justifyContent: 'center', marginTop: 200, alignItems: 'center'}}>
                <Text style={{fontWeight: '700'}}>
                    NO RESTAURANTS AVAILABLE WITH YOUR SEARCH
                </Text>
            </View>
        )
    }
    if(restaurantsData.length === 0){
        return (
            <View style={{display:'flex', justifyContent: 'center', marginTop: 200, alignItems: 'center'}}>
                <Text style={{fontWeight: '700'}}>
                    NO RESTAURANTS AVAILABLE WITH YOUR SEARCH
                </Text>
            </View>
        )
    }

    return (
        <>

            {
                restaurantsData?.length === 0 ? (
                    <View style={{display: 'flex', justifyContent:'center', alignItems:'center', margin: '50%'}} >
                            <ActivityIndicator size={24} color='orange' />
                    </View>
                ): (
                    restaurantsData?.map((restaurant, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress = {
                                () => navigation.navigate('RestaurantDetails', {
                                    name: restaurant.name,
                                    image: restaurant.image_url,
                                    price: restaurant.price,
                                    reviews: restaurant.review_count,
                                    rating: restaurant.rating,
                                    categories: restaurant.categories,
                                })
                            } 

                            style={styles.TOP} activeOpacity={0.9}>
                            <View key={index} style={styles.container}>
                                <RestaurantImage image={restaurant.image_url} />
                                <RestaurantInfo name={restaurant.name} distance={(restaurant.distance / 100).toFixed(2)} rating={restaurant.rating} status={(restaurant.transactions[0])} delivery={(restaurant.transactions[1])} res={(restaurant.transactions[2])} />
                            </View>
                        </TouchableOpacity>
                    ))
                )
            }
        </>
    )
}

const RestaurantImage = ({image}) => (
    <>
        <Image style={styles.image} source={{uri: image}} />
        <TouchableOpacity style={styles.touchOpcIcon}>
            <MaterialCommunityIcons name='heart-outline' size={25} color='red' />
        </TouchableOpacity>
    </>
)

const RestaurantInfo = ({name, rating, distance, status, delivery, res}) => (
    <View style={styles.infoContainer}>
        <View>
            <Text style={styles.head}>{name}</Text>
            <Text>{distance} • km {' '} {status} • {delivery} • {res}</Text>
        </View>
        <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{rating}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    TOP: {
        marginVertical: 5
    },
    container: {
        padding: 15,
        marginTop: 8,
        backgroundColor: 'white',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    infoContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    head: {
        fontSize: 18,
        fontWeight: '500'
    },
    sub: {
        color: '#eee',
        fontSize: 12
    },
    titleContainer: {

    }, 
    ratingContainer: {
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: '#eee',
        height: 30,
        width: 30,
        borderRadius: 30
    },
    rating: {
        fontSize: 12,
        marginTop: 6
    },
    image: { 
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10
    },
    touchOpcIcon: {
        position: 'absolute',
        right: 25,
        top: 25
    }
})