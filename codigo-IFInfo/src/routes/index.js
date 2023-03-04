import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
//https://medium.com/@delimaalefe/react-navigation-mudar-a-transi%C3%A7%C3%A3o-de-mudan%C3%A7a-de-telas-cardstyleinterpolator-c5563a45a62d

import RoutesDrawer from "../routesDrawer/index.js";
import { color } from "react-native-reanimated";

const Navigation = createStackNavigator();

export default function Routes(){
    return(
        <Navigation.Navigator
        screenOptions={{
            // gestureDirection: "vertical-inverted",
            // cardStyleInterpolator:
            // CardStyleInterpolators.forNoAnimation
        }}
        >

            <Navigation.Screen 
            name="drawerScreens"
            component={RoutesDrawer}
            options={{
                headerShown: false,
            }}
            />

        </Navigation.Navigator>
    )
}