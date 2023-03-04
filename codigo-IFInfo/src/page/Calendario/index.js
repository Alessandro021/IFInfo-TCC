import React, {useState, useEffect} from 'react';
import { View,Text,StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "../../server/firebaseConnection.js"
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'

export default function Calendario() {

  const navigation = useNavigation()
  const [calendario, setCalendario] = useState([])
  const [loading, setLoading] = useState(false);
  
  const LoadingIndicator = () => {
    return (
      <ActivityIndicator
        color="#008001"
        size= {70}
        style={styles.ActivityIndicatorStyle}
      />
    );
  }


  // const calendario = [
  //   {id: "Calendario Escolar", pdf: "https://drive.google.com/file/d/1H9Ut7xc1ggmP1COjflEzNUojhv1C8vvG/view?usp=share_link"},
  //   {id: "Calendario Academico", pdf: "https://drive.google.com/file/d/1ADfUTUUS87-AR_p-mg7zhSDmUbg0a7mU/view?usp=sharing"}
  // ]

  async function buscaCalendario(){
    let calendario = firebase.firestore().collection('calendario')
    let snapshot = await calendario.get();
    let lista = []
    snapshot.forEach(doc => {
      lista.push({...doc.data()});
    });
    setLoading(false)
    setCalendario(lista)
  }


  useEffect(() => {
    setLoading(true)
    buscaCalendario();
  },[])

  // console.log(calendario)
 return (
   <View style={styles.container}>
    {/* <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content"/>  */}
     <Text style={styles.title}>Calendários de {new Date().getFullYear()}</Text>

     {loading ? LoadingIndicator() :
        <ScrollView style={{width: "100%"}}>
          <View style={styles.viewBnt}>
            { calendario.map((calendario, index )=> (
                <TouchableOpacity key={index} style={styles.bnt} onPress={() => navigation.navigate('VerPdf', {link: calendario.pdf, titulo: calendario.id })}>
                  <Text  style={styles.texto}>{calendario.id}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
    }

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: "blue",
    alignItems: 'center',
  },
  title:{
    fontSize: RFValue(24),
    fontFamily: THEME.FONTS.r700,
    // fontWeight: 'bold',
    marginTop: 50
  },
  viewBnt:{
    alignItems: 'center',
    marginTop: 60
  },
  bnt:{
    width: '60%',
    height: 50,
    marginVertical: 20,
    borderRadius: 8,
    borderColor: '#008001',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: "center"
  },
  texto:{
    color: '#008001',
    // fontWeight: "bold",
    fontFamily: THEME.FONTS.r700,
    fontSize: RFValue(12)
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
})