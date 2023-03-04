import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions, ActivityIndicator, TextInput} from 'react-native';
import ListaAdministrativos from '../../component/ListaAdministrativos/index.js';
import firebase from "../../server/firebaseConnection.js"
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function Administrativos() { 

  const [administrativos, setAdministrativos] = useState([])
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [loading, setLoading] = useState(false);

//   const servidores = [
//     {nome: "Adailton Cardoso da Silva", cargo: "Técnico em Assuntos Educacionais"},
//     {nome: "Adélia Karina Carneiro Batista", cargo: "Técnico em Assuntos Educacionais"},
//     {nome: "Adenilson Teixeira de Moura", cargo: "Engenheiro Agrônomo"},
//     {nome: "Andrea da Conceição Pires Franca", cargo: "Técnica em Assuntos Educacionais"},
//     {nome: "Carlos de Freitas Júnior", cargo: "Auxiliar de Biblioteca"},
//     {nome: "Césane Faustino Pereira", cargo: "Assistente em Administração"},
//     {nome: "Clarissa Gabriela Giraldi Cleto", cargo: "Assistente em Administração"},
//     {nome: "Crispiniano Viana da Silva", cargo: "Técnico de Tecnologia da Informação"},
//     {nome: "Cyrlene Rita dos Santos", cargo: "Assistente de Alunos"},
//     {nome: "Daiane Aparecida Ribeiro Queiroz", cargo: "Assistente Social"},
//     {nome: "Elica Correia Santos", cargo: "Administradora"},
//     {nome: "Elis Marina Fonseca Almeida", cargo: "Técnico de laboratório/Química"},
//     {nome: "Elissandro Dias Costa", cargo: "Assistente em Administração"},
//     {nome: "Ellen Krystine Mota Lima", cargo: "Odontólogo"},
//     {nome: "Evandro Barbosa dos Anjos", cargo: "Médico"},
//   ]


  const LoadingIndicator = () => {
    return (
      <ActivityIndicator
        color="#008001"
        size= {70}
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  async function buscaServidores(){
    let contato = firebase.firestore().collection('administrativos')
    let snapshot = await contato.get();
    let lista = []
    snapshot.forEach(doc => {
      lista.push({...doc.data()});
    });
    setLoading(false)
    setAdministrativos(lista)
    setDadosOriginais(lista)

  }

  useEffect(() => {
    setLoading(true)
    buscaServidores();
  },[])

  function pesquisa(texto){
    //EXPRESSÃO REGULAR COM TOLOWERCASE PRA DEIXAR AS STRINGS EM CAIXA BAIXA E UM JOIN PRA DEIXAR O ARRAY DE CONTEUDO COMO STRING
    setAdministrativos(dadosOriginais.filter( dado => dado.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    || dado.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))))
  }

 return (
  
   <SafeAreaView style={styles.container}>
    <TextInput style={styles.input}
        placeholder='Pesquise por nome ou cargo'
        placeholderTextColor='green'
        onChangeText={(text)=> pesquisa(text)}
    />

    {loading ? LoadingIndicator() :

    <FlatList style={styles.ListaServidores}
      data={administrativos}
      keyExtractor={(item) => String(item.nome)}
      renderItem={({item}) => <ListaAdministrativos  data={item}/>}
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
    alignItems: 'center'
  },
  ListaServidores:{
    width: width,    
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  input:{
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    width: "95%",
    height: 60,
    borderColor: "#008001",
    fontFamily: THEME.FONTS.r500,
    fontSize: RFValue(12),
    paddingHorizontal: 20
},
})