import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions, ActivityIndicator} from 'react-native';
import ListaDeContatos from '../../component/ListaDeContatos';
import firebase from "../../server/firebaseConnection.js"

export default function Contatos() {

  const [contatos, setContatos] = useState([])
  const [loading, setLoading] = useState(false);

  // const contatos = [
  //   {id: "Diretor", contato: [{nome: "Marcelo Oliveira", email: "marcelo@gmail.com", whatsapp: "38 99999-9999"}]},
  //   {id: "Chefe de gabinete",  contato: [{nome: "Laura Ramos Silva", email: "laura.silva@gmail.com", whatsapp: "38 99988-8888"}]},
  //   {id: "Cordenador de extenção",  contato: [{nome: "Pedro Castro Mendonça", email: "castro.p@gmail.com", whatsapp: "38 99777-7777"}]},
  //   {id: "Nucleo Pedagogico", contato: [{nome: "Debora Barbosa da Mata", email: "debora342@gmail.com", whatsapp: "38 99766-6666"},
  //   {nome: "Lucas Souza Lima", email: "lima.lucas@gmail.com", whatsapp: "38 99955-5555"}]},
  // ]

  const LoadingIndicator = () => {
    return (
      <ActivityIndicator
        color="#008001"
        size= {70}
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  async function buscaContatos(){
    let contato = firebase.firestore().collection('contatos')
    let snapshot = await contato.get();
    let lista = []
    snapshot.forEach(doc => {
      lista.push({...doc.data()});
    });
    setLoading(false)
    setContatos(lista)
  }


  useEffect(() => {
    setLoading(true)
    buscaContatos();
  },[])

 return (
  
   <SafeAreaView style={styles.container}>

    {loading ? LoadingIndicator() :

    <FlatList style={styles.ListaContatos}
      data={contatos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <ListaDeContatos  data={item}/>}
      contentContainerStyle={{}}
    />
  }
   </SafeAreaView>
  );
}

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  ListaContatos:{
    width: width,    
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
})