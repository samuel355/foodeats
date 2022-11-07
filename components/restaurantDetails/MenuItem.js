import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState }  from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch} from 'react-redux';

const MenuItem = ({menu, resName}) => {
    const dispatch = useDispatch()

    const selectItem = (item,) => dispatch({
        type: 'ADD_TO_CART', 
        payload: item        
    })
    
    return (
        <View style={styles.Mcontainer}>
            <View>
                <BouncyCheckbox
                    size={20}
                    fillColor="#fc6203"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={() => selectItem(menu.id)}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} >{menu.name}</Text>
                <Text style={styles.desc}>{menu.desc}</Text>
                <Text style={styles.price}>$ {menu.price}</Text>
            </View>
            <View>
                <Image style={styles.image} source = {menu.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Mcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: '#e1e1e1',
        padding: 8,
        borderRadius: 8,

        shadowColor: '#eee',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textContainer: {
        flex: 1,
        marginRight: 2
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    desc: {
        marginVertical: 8,
        color: '#4d4d4d'
    },
    price: {
        fontWeight: '500',
        fontSize: 15
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        flex: 1
    }
})

export default MenuItem