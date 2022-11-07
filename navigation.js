import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from './screens/Home'
import RestaurantDetails from './screens/RestaurantDetails';
import {Provider as ReduxProvider} from 'react-redux'
import configureStore from './redux/store'
import BottomTabs from './components/home/BottomTabs';
import OrderCompleted from './screens/OrderCompleted';

const store = configureStore()

const RootNavigation = () => {
    const Stack = createStackNavigator()

    const screenOptions = {
        headerShown: false
    }

    return (
        <ReduxProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
                    <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
                </Stack.Navigator>
            </NavigationContainer>
            <BottomTabs />
        </ReduxProvider>
    )
}

export default RootNavigation