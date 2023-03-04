import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import DotsMenu from './DotsMenu';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'



export default function HeaderNoticia({link, titulo, tituloNoticias}) {
    const navigation = useNavigation();
 return (
   <SafeAreaView style={styles.container}>
    {/* <StatusBar backgroundColor='#008001' barStyle='light-content' /> */}
         <View style={styles.buttonMenu}>
             <TouchableOpacity style={styles.buttonMenu}
                 onPress={() => navigation.pop()}
             >
                 <AntDesign name='arrowleft' color= '#FFFFFF' size={24} />
             </TouchableOpacity>
             <Text style={styles.tituloHeader}>{titulo}</Text>
            
             <DotsMenu link={link} titulo={tituloNoticias} />
         </View>
   </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#008001',
        justifyContent: "center",
        width: '100%',
        height: 60,
    
    },
    buttonMenu:{
        flexDirection: 'row',
        // alignItems: "center",
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 8,
    },
    tituloHeader:{
        // marginLeft: '32%',
        color: "#FFFFFF",
        fontSize: RFValue(15),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: 'bold',
    }

})