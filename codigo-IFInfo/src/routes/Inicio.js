import React from "react";
import { createStackNavigator,CardStyleInterpolators  } from '@react-navigation/stack';
import Home from '../page/Home/index.js'
import Noticia from '../page/Noticia/index.js'
import Web from "../component/WebView/index.js";
import Pesquisa from "../component/Pesquisa/index.js";


const Navigation = createStackNavigator();

export default function Inicio(){

    return(
        <Navigation.Navigator
        initialRouteName="Home"
        screenOptions={{
            gestureDirection: "horizontal",
            cardStyleInterpolator:
            CardStyleInterpolators.forHorizontalIOS
        }}
        >
            <Navigation.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false,
            }}
            />

            <Navigation.Screen
            name="Noticia"
            component={Noticia}
            options={{
                headerShown: false,
            }}
            />

            <Navigation.Screen
            name="Web"
            component={Web}
            options={{
                title: 'Portal de Noticias Ifnmg Campus Arinos',
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },

            }}
            />

            <Navigation.Screen 
            name="Pesquisa"
            component={Pesquisa}
            options={{
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