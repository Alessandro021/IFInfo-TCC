import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import Web from "../component/WebView/index.js";
import VerPdf from "../component/VerPdf/index.js";
import Calendario from "../page/Calendario/index.js";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../services/Themes'

const Navigation = createStackNavigator();

export default function RotaCalendario(){
    const navigation = useNavigation();
    return(
        <Navigation.Navigator
        screenOptions={{
            // headerShown: false
            // gestureEnabled: true,
            gestureDirection:"horizontal",
            cardStyleInterpolator:
            CardStyleInterpolators.forHorizontalIOS
        }}
        >

            <Navigation.Screen 
            name="Calendario IFNMG"
            component={Calendario}
            options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50,height: 50,alignItems: "center",justifyContent: "center"}} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Feather name='menu' color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                  ),
                title: "Calendário",
                headerTitleStyle:{
                    fontFamily: THEME.FONTS.r500,
                },
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },
            }}
            />
            
            <Navigation.Screen
            name="VerPdf"
            component={VerPdf}
            options={({route}) => ({
                title: route.params?.titulo,
                headerTitleStyle:{
                    fontSize: RFValue(14),
                    fontFamily: THEME.FONTS.r500,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },

            })}
            />

        </Navigation.Navigator>
    )
}