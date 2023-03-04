import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, StatusBar} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function HeaderHome({data, atualizaHome, showCalendario }) {

    const navigation = useNavigation();
 return (
     <SafeAreaView style={styles.container}>

        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={styles.buttonHome}>
                <Feather name='menu' color="#FFFFFF" size={24} />
        </TouchableOpacity>

         <View style={styles.buttonMenu}>

             <Text style={styles.Tituloheader}>{data}</Text>

                <View style={styles.viewIcons}>
                    <TouchableOpacity style={{ marginHorizontal: 25 }} onPress={() => atualizaHome()}>
                        <MaterialCommunityIcons name="calendar-refresh" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginRight: 25 }} onPress={()=> {showCalendario(true), atualizaHome()}}> 
                        <MaterialCommunityIcons name='calendar-search' color="#FFFFFF" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginRight: 25 }} onPress={() => navigation.navigate('Pesquisa')}>
                        <Fontisto name="search" size={24} color="#FFFFFF" />

                    </TouchableOpacity>
                </View>
         </View>
     </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#008001',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    buttonHome:{
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonMenu:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        width: '90%',
    },
    Tituloheader:{
        fontSize: RFValue(16),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: 'bold',
        color: "#FFFFFF",
    },
    viewIcons:{
        flexDirection: 'row',
        marginLeft: 10,
    }

})