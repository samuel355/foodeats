import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderItem from './OrderItem';
import { ScrollView } from 'react-native-gesture-handler';
import { db, firestore } from '../../firebase';
import{doc, setDoc} from 'firebase/firestore'
import LottieView from 'lottie-react-native'

const ViewCart = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    let cartItems = useSelector(
        (state) => state.cartReducer.items
    );

    const total = cartItems?.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2 )

    const saveItem = async (data) => {
        setLoading(true)
        await setDoc(doc(firestore, "orders", `${Date.now()}`), data, {
          merge: true,
        }).then(() => {
            setTimeout(() => {
                setLoading(false)
                setModalVisible(false)
            }, 2500)
        });
        
    };

    const addOrderToFirebase = () => {
        const data = {
            id: Date.now(),
            items: cartItems,
            createdAt: Date.now()
        }
        saveItem(data)
        
        navigation.navigate('OrderCompleted')
        
    }

    const checkoutModalContent = () => {
        return (
            <>
                
                <View style={styles.modalContainer}>
                    <View style={{position: 'absolute', zIndex: 9, top: 45, backgroundColor: 'white', marginLeft: 10, borderRadius: 50, padding: 2}}>
                        <Ionicons onPress={() => setModalVisible(false)}  name="arrow-back-outline" size = {24} />
                    </View>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>{cartItems[0]?.restaurantName}</Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                cartItems.map((item, index) => (
                                    <OrderItem key={index}  item={item} />
                                ))
                            }
                        </ScrollView>
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text>$ {total}</Text>
                        </View>

                        <View style={{alignSelf: 'center', marginBottom: 20}}>
                            <TouchableOpacity 
                                onPress={() => {
                                    addOrderToFirebase();
                                    //setModalVisible(false)
                                }} 
                                style={styles.container}
                            >
                                <Text style={styles.title}> ORDER $ {total}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {
                    loading ? (
                        <View style={{backgroundColor: 'black', position: 'absolute', opacity: 0.6, justifyContent: 'center', flex: 1, alignItems: 'center', height: '100%', width: '100%'}}>
                            <LottieView 
                                style={{height: 200, alignSelf: 'center'}}  
                                source = {require('../../assets/animations/scanner.json')} 
                                autoPlay
                                speed={3}
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
                        </View>
                    ) : (
                        <></>
                    )
                }
            </>
        )
    }
    
    return (
        <>
            <Modal 
                animationType='slide' 
                visible={modalVisible} 
                transparent={true} 
                onRequestClose = {() => setModalVisible(false)} 
            >
                {
                    checkoutModalContent ()
                }
            </Modal>

            {
                cartItems.length > 0 ? (
                    <View style = {styles.main}>
                        <View style={styles.wrapper}>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>
                                <Text style={styles.title}>View Cart {cartItems?.length > 0 ? `( ${cartItems.length} )` : ''} • $ {total}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <></>
                )
            }
        </>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        zIndex: 999,
        flexDirection: 'row',
        alignSelf: 'center',


        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    container : {
        backgroundColor: '#fc6203',
        marginTop: 20,
        borderRadius: 25,
        positions: 'relative',
        width: 300,
        alignItems:'center',
        padding: 10
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    modalCheckoutContainer: {
        backgroundColor: 'white',
        padding: 16,
        height: 500,
        borderWidth: 1,
    },
    restaurantName: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 10,
    },
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    subtotalText: {
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 15, 
        marginBottom: 10
    }
})
export default ViewCart