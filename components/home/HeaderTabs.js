import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
let tabData
export default function HeaderTabs( {selectedTab, setSelectedTab, restaurantsData, setRestaurantsData}) {
  tabData = restaurantsData
  return (
    <View style={styles.container}>
      <HeaderButton 
        style={styles.btn}
        text="Delivery" 
        title="Delivery"
        background='black' 
        color='white' 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        restaurantsData={restaurantsData}
        setRestaurantsData={setRestaurantsData}
      />

      <HeaderButton 
        text="Pickup" 
        title="Pickup"
        background='white' 
        color='black'
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        restaurantsData={restaurantsData}
        setRestaurantsData={setRestaurantsData}
      />

      <HeaderButton 
        text="Restaurant_Reservation" 
        title = "Reservation"
        background='white' 
        color='black'
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        restaurantsData={restaurantsData}
        setRestaurantsData={setRestaurantsData}
      />
    </View>
  )
}

const HeaderButton = ({text, title, background, color, selectedTab, setSelectedTab, restaurantsData, setRestaurantsData}) => {

    const tabsSelectHandler  = () => {
      setSelectedTab(text) 
      restaurantsData = restaurantsData?.filter((e) => e.transactions.includes(selectedTab.toLocaleLowerCase()))
      setRestaurantsData(restaurantsData)
    }
    return (
      <View>
        <TouchableOpacity onPress = {tabsSelectHandler} style={{...styles.touchOpc, backgroundColor: selectedTab === text ? 'black' : 'white'}}>
            <Text style={{...styles.touchText, color: selectedTab === text ? 'white' : 'black'}}>{title}</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    touchOpc : {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#eee',
        marginLeft: 8,
    },
    touchText : {
        fontSize: 15,
        fontWeight: '800'
    }
})