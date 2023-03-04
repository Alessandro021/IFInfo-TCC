import React, {useState, useContext} from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { DrawerItemList, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import { Authcontext } from '../../contextos/dados';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function DrawerHeader(props){

    const {logado, dadosDoUsuario} = useContext(Authcontext)
    const navigation = useNavigation();

    return(
        // <DrawerContentScrollView {...props}>
        <DrawerContentScrollView  >

            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#008001', marginBottom: 10, marginTop: -4}}>
                {/* <Image 
                    // source={require('../../../assets/perfil.png')}
                    source={require('../../../assets/icon/logo.png')}
                    style={{width: 100, borderRadius: 1}}
                    resizeMode='contain'
                /> */}
                
                
                {logado === true ? 
                
                //Esta logado
                <View style={{alignItems: "center", width: "100%", marginVertical: 30}}>
                    <View style={{alignItems: 'center', width: "100%", paddingHorizontal: 10}}>
                        <Text style={{color: '#FFF', fontSize: RFValue(14), fontFamily: THEME.FONTS.r500}}> Olá,
                            <Text style={{color: '#FFF', fontSize: RFValue(15), fontFamily: THEME.FONTS.r900 ,width: "60%"}}> {dadosDoUsuario?.nome}</Text>
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{flexDirection: "row" ,alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 10, marginTop: 20,
                         paddingHorizontal: 20, paddingVertical: 8, }} onPress={() => navigation.navigate("Area do Aluno drawer")}
                         >
                            <FontAwesome5 name="user-graduate" size={22} color="#008001"  />
                            <Text style={{color: '#008001', fontSize: RFValue(15),fontFamily: THEME.FONTS.r900, alignItems: "center", marginLeft: 10}}>Área do Aluno</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                :
                //Não esta logado
                <View style={{alignItems: "center", width: "100%", marginVertical: 30}}>
                     <View style={{flexDirection: "row" ,alignItems: "center"}}>
                        <Text style={{color: '#FFF', fontSize: RFValue(12), fontFamily: THEME.FONTS.r500}}> Olá, você não esta logado!</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={{flexDirection: "row" ,alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 10,
                         marginTop: 20, paddingHorizontal: 20, paddingVertical: 8}} onPress={() => navigation.navigate("Login")}
                         >
                            <Ionicons name="log-in" size={24} color="#008001" />
                            <Text style={{color: '#008001', fontSize: RFValue(15),fontFamily: THEME.FONTS.r900, alignItems: "center", marginLeft: 10}}>Fazer Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                
            </View>

        <DrawerItemList {...props} />
        
        {/* <DrawerItem
        {...props}

        labelStyle= {{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            color: "#FFF"
        }}


        activeTintColor= '#FFF'
        activeBackgroundColor= '#00b94a'
        inactiveBackgroundColor = '#c62c36'
        inactiveTintColor= '#DDD'
        style= {{
            marginVertical: 10,
            // borderRadius: 25,
            padding: 8
             
        }}
        
        label="Sair do app"
        // onPress={() => signOut()}
        // onPress={() => Linking.openURL('https://mywebsite.com/help')}
        /> */}
        </DrawerContentScrollView>
    )
}