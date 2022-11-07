import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const About = ({navigation, route}) => {
    const {name, image, price, reviews, rating, categories} = route.params;
    const formattedCategories = categories.map((cat) => cat.title).join(' • ')
    const description = `${formattedCategories} ${price ? " • " + price : ""} • 🫶 ${rating} ⭐️ (${reviews}+)`
    return (
        <View>
            <View style={{position: 'absolute', zIndex: 9, top: 45, backgroundColor: 'white', marginLeft: 10, borderRadius: 50, padding: 2}}>
                <Ionicons onPress={() => navigation.goBack()}  name="arrow-back-outline" size = {24} />
            </View>
            
            <Image style={styles.image} source = {{uri: image}} />
            <View style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.sub}> {description}</Text>
            </View>
            <View style= {styles.divider} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'contain',
    },
    title: {
        marginVertical: 5,
        fontWeight: '600',
        fontSize: 20
    },
    sub: {
        color: 'grey',
        marginTop: 3
    },
    divider: {
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        marginTop: 5
    }
})

export default About
