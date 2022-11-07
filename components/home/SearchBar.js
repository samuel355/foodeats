import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import AntDesign from 'react-native-vector-icons/AntDesign'

export default function SearchBar({setCity}) {
    const searchCity = (data, detail = null) => {
        const city = data.description.split(',')[0]
        setCity(city)
        //console.log(detail)
    }
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete 
                query={{key: 'AIzaSyC7k6HRUTDg-ua1K7-9GfuCBmZLBFOrUSw'}}
                onPress={searchCity}
                styles={{
                    textInput : {
                        backgroundColor: '#eee',
                        borderRadius: 20,
                        fontWeight: '400',
                        marginTop: 5
                    },
                    textInputContainer :{
                        backgroundColor: '#eee',
                        borderRadius: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }
                }}

                renderLeftButton = { () => (
                    <View style={styles.searchIcon}>
                        <Ionicons name="location-sharp" size={24} />
                    </View>
                )}
                placeholder='Search Location'

                // renderRightButton={ () => (
                //     <TouchableOpacity style={styles.rightContainer}>
                //         <View style={styles.searchContainer}>
                //             <AntDesign style={styles.antIcon} name='clockcircle' size={11} />
                //             <Text>Search</Text>
                //         </View>
                //     </TouchableOpacity>
                // )}
            />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: 'row'
    },
    searchIcon: {
        marginLeft: 10
    },
    rightContainer:{
        flexDirection: 'row'
    },
    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        marginRight: 10,

        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    antIcon: {
        marginRight: 5
    }
})