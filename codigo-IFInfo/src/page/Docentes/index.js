import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions, ActivityIndicator, TextInput} from 'react-native';
import ListaDeProfessores from '../../component/ListaDocente/index.js';
import firebase from "../../server/firebaseConnection.js"
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function Docentes() {

  const [docente, setDocente] = useState([])
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [loading, setLoading] = useState(false);

//   const professores = [
//     {nome: "Aélcio Vander dos Santos", area: "História", email: "aelcio.santos@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4435066E4" },
//     {nome: "Adriana de Fátima Lima", area: "Física", email: "adriana.lima@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/9346277685006913" },
//     {nome: "Alisson Macendo Amaral", area: "Topografia/Desenho Técnico", email: "alisson.amaral@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4235688H2" },
//     {nome: "Ana Amélia dos Santos Cordeiro", area: "Ciências Agrárias", email: "ana.cordeiro@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4734366D0" },
//     {nome: "Ana Lúcia Ferreira Oliveira de Freitas", area: "Administração/Contabilidade/Economia", email: "ana.freitas@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4357169A2" },
//     {nome: "Antônio Martins de Freitas Junior", area: "Química", email: "antonio.freitas@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4964096J2" },
//     {nome: "Carlos Magno Moreira de Oliveira", area: "Conservação da natureza, manejo florestal, gestão e legislação ambiental e geoprocessamento", email: "carlos.moreira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4477630P0" },
//     {nome: "Carmem Silva Félix Venturi", area: "Língua Espanhola", email: "", curriculo: "" },
//     {nome: "Celso Antônio da Silveira", area: "Química", email: "celso.silveira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4525602H2" },
//     {nome: "Christiane Oliveira Valente", area: "Administração", email: "christiane.valente@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4497675U7" },
//     {nome: "Chrystian Jorge da Mata", area: "Cálculo Diferencial e Integral", email: "chrystian.mata@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4420334J2" },
//     {nome: "Daniela Cotta Bicalho", area: "Matemática", email: "daniela.bicalho@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/2079804659260327" },
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
    let contato = firebase.firestore().collection('docentes')
    let snapshot = await contato.get();
    let lista = []
    snapshot.forEach(doc => {
      lista.push({...doc.data()});
    });
    setLoading(false)
    setDocente(lista)
    setDadosOriginais(lista)

  }

  useEffect(() => {
    setLoading(true)
    buscaServidores();
  },[])

  function pesquisa(texto){
    //EXPRESSÃO REGULAR COM TOLOWERCASE PRA DEIXAR AS STRINGS EM CAIXA BAIXA E UM JOIN PRA DEIXAR O ARRAY DE CONTEUDO COMO STRING
    setDocente(dadosOriginais.filter( dado => dado.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    || dado.area.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))))
  }

 return (
  
   <SafeAreaView style={styles.container}>
    <TextInput style={styles.input}
        placeholder='Pesquise por nome ou área de ensino'
        placeholderTextColor='green'
        onChangeText={(text)=> pesquisa(text)}
    />

    {loading ? LoadingIndicator() :

    <FlatList style={styles.ListaProfessores}
      data={docente}
      keyExtractor={(item) => String(item.nome)}
      renderItem={({item}) => <ListaDeProfessores  data={item}/>}
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
  ListaProfessores:{
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