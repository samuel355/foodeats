import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native'
import { db, firestore } from '../firebase';
import { getDocs, orderBy, query, collection, limit } from 'firebase/firestore';
import MenuItems from '../components/restaurantDetails/MenuItems';
import { ScrollView } from 'react-native-gesture-handler';

const OrderCompleted = ({navigation, route}) => {
    const [lastOrder, setLastOrder] = useState([])
    let cartItems = useSelector(
        (state) => state.cartReducer.items
    );
 
    const total = cartItems?.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2 )

    useEffect(() => {
        const getOrders = async () => {
            const items = await getDocs(
                query(collection(firestore, "orders"), 
                orderBy("createdAt", "desc"), 
                limit(1))
            );
            
            // return items?.docs.map((doc) => {
            //     setLastOrder(doc.data())
            // });

            items.forEach((doc) => {
                setLastOrder(doc.data().items)
            })
            
        }
        getOrders()
    }, [])

    const goHome = () => {
        navigation.navigate('Home')
        cartItems = []
    }
    const orderTotal = lastOrder?.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2 )
    return (
        <SafeAreaView style={styles.container}>
            <View style={{position: 'absolute', zIndex: 9, top: 45, backgroundColor: 'white', marginLeft: 10, borderRadius: 50, padding: 2}}>
                <Ionicons onPress={goHome}  name="arrow-back-outline" size = {24} />
            </View>
            {/* green checkmark */}  
            <LottieView 
                style={{height: 100, alignSelf: 'center', marginBottom: 30, width: 100}}  
                source = {require('../assets/animations/check-mark.json')} 
                autoPlay
                speed={0.5}
                loop={false}
                
                colorFilters={[
                    {
                      keypath: 'button',
                      color: '#F00000',
                    },
                    {
                      keypath: 'Sending Loader',
                      color: '#F00000',
                    },
                ]}
            />

            <Text style={{marginHorizontal: 10, marginVertical: 12, textAlign: 'center'}}>Your Order at <Text style={{fontWeight: '600',fontSize: 18}}>{lastOrder[0]?.restaurantName}</Text> is completed for amount $ {orderTotal}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    lastOrder?.length > 0 ? lastOrder.map((item, i) => (
                        <View key={i} style={styles.Mcontainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.desc}>{item.desc}</Text>
                                <Text style={styles.price}>$ {item.price}</Text>
                            </View>
                            <View>
                                <Image style={styles.image} source = ''  />
                            </View>
                        </View>
                    )): (
                        <>
                        </>
                    )
                }
            </ScrollView>

            
            {/* ordered Items */}
            {/* cooking animation */}

            <LottieView 
                style={{height: 200, alignSelf: 'center', marginBottom: 30, width: 100}}  
                source = {require('../assets/animations/cooking.json')} 
                autoPlay
                speed={0.8}
                loop={true}
                
                colorFilters={[
                    {
                      keypath: 'button',
                      color: '#F00000',
                    },
                    {
                      keypath: 'Sending Loader',
                      color: '#F00000',
                    },
                ]}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
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
export default OrderCompleted