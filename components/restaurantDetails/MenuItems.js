import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function MenuItems({restaurantName, foods, hideCheckbox, marginLeft, navigation}) {
  
    const dispatch = useDispatch();

    const selectItem = (item, checkboxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...item,
            qty: 1,
            restaurantName: restaurantName,
            checkboxValue: checkboxValue,
        },
    });

    const cartItems = useSelector(
        (state) => state.cartReducer.items
    );

    //Remain checked on the checkbox if the checked/selected food is in state
    const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.name === food.name ));

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods?.map((food, index) => (
                <View key={index}>
                    <View style={styles.Mcontainer}>
                        {
                            hideCheckbox ? (
                            <> </>
                            ) : (
                                <BouncyCheckbox
                                    size={20}
                                    fillColor="#fc6203"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "red" }}
                                    innerIconStyle={{ borderWidth: 2 }}

                                    isChecked={isFoodInCart(food, cartItems)}
                                    onPress={(checkboxValue) => selectItem(food, checkboxValue)}

                                />
                            )
                        }
                        <FoodInfo food={food} />
                        <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
        <Text style={styles.titleStyle}>{props.food.name}</Text>
        <Text>{props.food.desc}</Text>
        <Text>$ {props.food.price}</Text>
    </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
    <View>
        <Image
            source={props.food.image}
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },
  
    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
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
});