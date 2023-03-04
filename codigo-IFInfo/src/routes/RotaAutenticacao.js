import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from "../page/Login/index.js";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from "@react-navigation/native";


const Navigation = createStackNavigator();

export default function RotaAutenticacao(){
    const navigation = useNavigation();
    return(
        <Navigation.Navigator
        screenOptions={{
            cardStyleInterpolator:
            CardStyleInterpolators.forNoAnimation
        }}
        >

            <Navigation.Screen 
            name="Acessar"
            component={Login}
            options={{
                title: "Login",
                headerLeft: () => (
                    <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Feather name='menu' color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                  ),
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },
            }}
            />

        </Navigation.Navigator>
    )
}