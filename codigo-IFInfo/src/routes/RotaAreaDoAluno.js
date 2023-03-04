import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Web from "../component/WebView/index.js";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AreaDoAluno from "../page/AreaDoAluno/index.js";
import AlterarSenha from "../page/AlterarSenha/index.js";

const Navigation = createStackNavigator();

export default function RotaAutenticacao(){
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
            name="AreaDoAluno"
            component={AreaDoAluno}
            options={{
                headerLeft: () => (
                    <TouchableOpacity style={{width: 50,height: 50,alignItems: "center",justifyContent: "center"}} 
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Feather name='menu' color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                  ),
                title: 'Area do Aluno',
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },

            }}
            />
            
            <Navigation.Screen
            name="Web Aluno"
            component={Web}
            options={({route}) => ({
                title: route.params?.titulo,
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },
            })}
            />

            <Navigation.Screen
            name="Alterar Senha"
            component={AlterarSenha}
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