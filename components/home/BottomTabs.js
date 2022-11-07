import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function BottomTabs({navigation}) {
    const [activeIcon, setActiveIcon] = useState('Home')
    return (
        <View style={styles.container}>
            <Icons navigation={navigation} screen="Home" name='home' title='Home' activeIcon ={activeIcon} setActiveIcon ={setActiveIcon} />
            <Icons navigation={navigation} screen="Browse" name='search' title='Browse' activeIcon ={activeIcon} setActiveIcon ={setActiveIcon} />
            <Icons navigation={navigation} screen="RestaurantDetails" name='shopping-bag' title='Grocery'activeIcon ={activeIcon} setActiveIcon ={setActiveIcon} />
            <Icons navigation={navigation} screen="OrderCompleted" name='receipt' title='Orders' activeIcon ={activeIcon} setActiveIcon ={setActiveIcon}/>
            <Icons navigation={navigation} screen="User" name='user' title='Account' activeIcon ={activeIcon} setActiveIcon ={setActiveIcon}/>
        </View>
    )
}

const Icons = ({screen, name, title, activeIcon, setActiveIcon, navigation}) => {
    const iconHandler = async () => {
       await setActiveIcon(title)
    }
    return (
        <TouchableOpacity onPress={iconHandler}>
            <FontAwesome5 style={{...styles.icon, color: activeIcon === title ? '#fc6203' : 'grey'}} name={name} size={20} />
            <Text style={{color: activeIcon === title ? '#fc6203' : 'grey', fontWeight: activeIcon === title ? '600' : ''}}>{title}</Text>
            {
                activeIcon === title  && (
                    <View style={{borderBottomWidth: 2, borderColor: '#fc6203', marginTop: 2, width: 20, alignSelf:'center', color: 'orange'}} />
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingTop: 8
        
    },
    icon: {
        marginBottom: 5,
        alignSelf:'center',
    }
    
})

export default BottomTabs