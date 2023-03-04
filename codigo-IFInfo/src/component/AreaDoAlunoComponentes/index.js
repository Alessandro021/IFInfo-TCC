import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native'
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function AreaDoAlunoComponentes({data}) {
  const navigation = useNavigation();
 return (
    // console.log(data.item.nome)
        data.map((item, index) =>
            <TouchableOpacity key={index} style={styles.componente} onPress={()=> navigation.navigate("Web Aluno", {link: item.link, titulo: item.nome })}>
                <Image resizeMode= "contain" style={styles.imageCajui} source={{uri: item.img}}/>
                <View style={{width: "70%"}}>
                    <Text style={styles.tituloComponente}>{item.titulo}</Text>
                    {item.descricao &&
                    <Text style={styles.descricaoComponente}>{item.descricao}</Text>
                    }
                </View>
            </TouchableOpacity>  
        )
  );
}

const styles = StyleSheet.create({
    componente: {
        borderWidth: 1,
        borderColor: "#008001",
        width: "95%",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 15,
        marginBottom: 15,
    
      },
      tituloComponente: {
        fontFamily: THEME.FONTS.r900,
        fontSize: RFValue(14),
        color: "#008001",
        
      },
      descricaoComponente:{
        fontSize: RFValue(10),
        fontFamily: THEME.FONTS.r300,
        color: "#008001",
      },
      imageCajui:{
        width: 100,
        height: 60,
        tintColor: "#008001"

      },
})