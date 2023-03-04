import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import firebase from "../../server/firebaseConnection.js"
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function ModalHorarios() {
    const navigation = useNavigation();
    const [horarios, setHorarios] = useState([])

    // const [horarios, setHorarios] = useState([
    //     {nome: "1º Agropecuária I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-1"},
    //     {nome: "1º Agropecuária II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-2"},
    //     {nome: "2º Agropecuária I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-3"},
    //     {nome: "2º Agropecuária II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-4"},
    //     {nome: "3º Agropecuária", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-5"},
    //     {nome: "1º Informática I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=19&class=-6"},
    // ])

    async function buscaHorarios(){
      let horario = firebase.firestore().collection('horarios')
      let snapshot = await horario.get();
      let lista = []
      snapshot.forEach(doc => {
        lista.push({...doc.data()});
      });
      setHorarios(lista)
    }
  
    useEffect(() => {
      buscaHorarios();
    },[])

 return (
  
   horarios.map((item, index) => {
     return <View key={index} style={styles.container}>
       <TouchableOpacity style={styles.btnsubmit} onPress={() => navigation.navigate("Web Aluno", { link: item.link, titulo: item.nome })} >
         <Text style={styles.btnText}>{item.nome}</Text>
       </TouchableOpacity>
     </View>
   })

  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
  },
  btnsubmit: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#008001',
    width: '97%',
    height: 55,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10
  },
  btnText: {
    fontSize: RFValue(12),
    fontFamily: THEME.FONTS.r900,
    color: '#FFF',
    // fontWeight: "bold",
    textAlign: "center",
  },
});