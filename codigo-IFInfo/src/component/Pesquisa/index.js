import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from '../../server/firebaseConnection.js'
import CardNews from '../CardNews/index.js'

export default function Pesquisa() {

    const [noticias, setNoticias] = useState([]);
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        (async () => {  
            await firebase.firestore().collection('noticias').orderBy("id","desc").get()
            .then(snapshot => {
              let lista = [];
              snapshot.forEach(doc => {
                lista.push({...doc.data()});
              });
              setNoticias(lista)
              setLoading(false)
              setDadosOriginais(lista)
            })   
          })()
       setLoading(true)
    },[])

    const LoadingIndicator = () => {
      return (
        <ActivityIndicator
          color="#008001"
          size= {70}
          style={styles.ActivityIndicatorStyle}
        />
      );
    }

  
  function pesquisa(texto){
    //EXPRESSÃO REGULAR COM TOLOWERCASE PRA DEIXAR AS STRINGS EM CAIXA BAIXA E UM JOIN PRA DEIXAR O ARRAY DE CONTEUDO COMO STRING
    setNoticias(dadosOriginais.filter( dado => dado.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) || 
    dado.conteudo.join().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))))
  }
 return (
   <View style={styles.container}>

    <TextInput style={styles.input}
        placeholder='Faça sua pesquisa...'
        placeholderTextColor='green'
        onChangeText={(text)=> pesquisa(text)}
    />

    {loading ? LoadingIndicator() :
        <FlatList style={styles.viewCard}
        data={noticias}
        // ListEmptyComponent={<View style={styles.ViewListaVazia}><Text style={styles.listaVazia}>Noticia não encontrada</Text></View>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardNews data={item} />} 
        />
    }


   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    input:{
        marginVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        width: '95%',
        height: 60,
        borderColor: "#008001",
        // backgroundColor: '#FF3',
        fontSize: 18,
        paddingHorizontal: 20
    },
    viewCard:{
        width: '100%',
    },
    ViewListaVazia:{
      marginTop: 250,
      alignItems: 'center',
    },
    listaVazia:{
      fontSize: 20,
      fontWeight: '700'
    },
    ActivityIndicatorStyle: {
      flex: 1,
      justifyContent: "center",
    },
})