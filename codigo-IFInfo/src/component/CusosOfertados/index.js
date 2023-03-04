import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function CusosOfertados({data}) {
    const navigation = useNavigation()
 return (
      
      <ScrollView style={styles.container}>
       <View style={styles.viewBnt}>
       {data.map((curso) =>
           curso.map((curso, index )=> {
            return <TouchableOpacity key={index} style={styles.bnt} onPress={() => navigation.push('WebCursos', { link: curso?.link, titulo: curso.nome })}>
                    <Text style={styles.texto}>{curso?.nome}</Text>
                  </TouchableOpacity>
           })
         )
         }
       </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 80,
  },
  viewBnt: {
    alignItems: "center",
  },
  bnt: {
    width: '80%',
    height: 60,
    marginVertical: 15,
    borderRadius: 8,
    borderColor: '#008001',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  texto: {
    color: '#008001',
    // fontWeight: "bold",
    fontSize: RFValue(11),
    fontFamily: THEME.FONTS.r900,
    textAlign: "center",
  }
    })