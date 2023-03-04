import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList,RefreshControl, Platform, View, Text} from 'react-native';
import firebase from '../../server/firebaseConnection.js'
import { format, parse } from 'date-fns'
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';


import HeaderHome from '../../component/Header/HeaderHome.js';
import CardNews from '../../component/CardNews/index.js'
import Loader from '../../component/Loader/index.js';
import BuscaPorData from '../../component/BuscaPorData/index.js';
import { FlashList } from "@shopify/flash-list";

export default function Home(){

  const [noticias, setNoticias] = useState([]);
  const [originalNoticias, setOriginalNoticias] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaderList, setLoaderList] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataHoje, setDataHoje] = useState(new Date());
  const [show, setShow] = useState(false);

  //  const [noticias1, setNoticias1] = useState([
  //   {id: 1, data: "01/01/2022", hora: "22:00", urlFoto: 'https://www.ifnmg.edu.br/arquivos/ARINOS-MATRICULAS-INTEGRADO.png', link: "https://www.ifnmg.edu.br/mais-noticias-arinos/617-arinos-noticias-2022/28151-candkeyatos-classificados-para-matricula-dos-cursos-tecnicos-integrados-ao-ensino-medio-no-campus-arinos", titulo: "Candidatos classificados para matrícula dos Cursos Técnicos Integrados ao Ensino Médio no Campus Arinos", conteudo: ["O IFNMG - Campus Arinos informa que iniciará em 1º/2/2022 as matrículas para os(as) candidatos(as) classificados na chamada regular dos Cursos Técnicos Integrados ao Ensino Médio, processo seletivo 2022.", "A matrícula será realizada mediante preenchimento do formulário online, e inclusão de documentos exigidos no Edital Nº 139/2021, pelos candidatos (as) classificados(as),o qual estará disponível neste site em 1º/2/2022, a partir das 8h no link https://www.ifnmg.edu.br/processoseletivo/266-portal/arinos/arinos-cursos-tecnicos/28103-1-processo-seletivo-2022-cursos-tecnicos-campus-arinos.", "Posteriormente, em data estabelecida e agendada, todos os documentos (fotocópias, legíveis e sem rasuras) exigidos pelo Edital Nº 139, de 1 de outubro de 2021 e legislações pertinentes ao processo de matrícula, serão conferidos com os documentos originais (ou entregues autenticados) na Coordenação de Registros Escolares, campus Arinos."]},
  //   {id: 2, data: "01/01/2022", hora: "22:00", urlFoto: 'https://www.ifnmg.edu.br/arquivos/ARINOS-MATRICULAS-INTEGRADO.png', link: "https://www.ifnmg.edu.br/mais-noticias-arinos/617-arinos-noticias-2022/28151-candidatos-classificados-para-matricula-dos-cursos-tecnicos-integrados-ao-ensino-medio-no-campus-arinos", titulo: "Candidatos classificados para matrícula dos Cursos Técnicos Integrados ao Ensino Médio no Campus Arinos", conteudo: ["O IFNMG - Campus Arinos informa que iniciará em 1º/2/2022 as matrículas para os(as) candidatos(as) classificados na chamada regular dos Cursos Técnicos Integrados ao Ensino Médio, processo seletivo 2022.", "A matrícula será realizada mediante preenchimento do formulário online, e inclusão de documentos exigidos no Edital Nº 139/2021, pelos candidatos (as) classificados(as),o qual estará disponível neste site em 1º/2/2022, a partir das 8h no link https://www.ifnmg.edu.br/processoseletivo/266-portal/arinos/arinos-cursos-tecnicos/28103-1-processo-seletivo-2022-cursos-tecnicos-campus-arinos.", "Posteriormente, em data estabelecida e agendada, todos os documentos (fotocópias, legíveis e sem rasuras) exigidos pelo Edital Nº 139, de 1 de outubro de 2021 e legislações pertinentes ao processo de matrícula, serão conferidos com os documentos originais (ou entregues autenticados) na Coordenação de Registros Escolares, campus Arinos."]},
  //   {id: 3, data: "01/01/2022", hora: "22:00", urlFoto: 'https://www.ifnmg.edu.br/arquivos/ARINOS-MATRICULAS-INTEGRADO.png', link: "https://www.ifnmg.edu.br/mais-noticias-arinos/617-arinos-noticias-2022/28151-candidatos-classificados-para-matricula-dos-cursos-tecnicos-integrados-ao-ensino-medio-no-campus-arinos", titulo: "Candidatos classificados para matrícula dos Cursos Técnicos Integrados ao Ensino Médio no Campus Arinos", conteudo: ["O IFNMG - Campus Arinos informa que iniciará em 1º/2/2022 as matrículas para os(as) candidatos(as) classificados na chamada regular dos Cursos Técnicos Integrados ao Ensino Médio, processo seletivo 2022.", "A matrícula será realizada mediante preenchimento do formulário online, e inclusão de documentos exigidos no Edital Nº 139/2021, pelos candidatos (as) classificados(as),o qual estará disponível neste site em 1º/2/2022, a partir das 8h no link https://www.ifnmg.edu.br/processoseletivo/266-portal/arinos/arinos-cursos-tecnicos/28103-1-processo-seletivo-2022-cursos-tecnicos-campus-arinos.", "Posteriormente, em data estabelecida e agendada, todos os documentos (fotocópias, legíveis e sem rasuras) exigidos pelo Edital Nº 139, de 1 de outubro de 2021 e legislações pertinentes ao processo de matrícula, serão conferidos com os documentos originais (ou entregues autenticados) na Coordenação de Registros Escolares, campus Arinos."]},
  //   {id: 4, data: "01/01/2022", hora: "22:00", urlFoto: 'https://www.ifnmg.edu.br/arquivos/ARINOS-MATRICULAS-INTEGRADO.png', link: "https://www.ifnmg.edu.br/mais-noticias-arinos/617-arinos-noticias-2022/28151-candidatos-classificados-para-matricula-dos-cursos-tecnicos-integrados-ao-ensino-medio-no-campus-arinos", titulo: "Candidatos classificados para matrícula dos Cursos Técnicos Integrados ao Ensino Médio no Campus Arinos", conteudo: ["O IFNMG - Campus Arinos informa que iniciará em 1º/2/2022 as matrículas para os(as) candidatos(as) classificados na chamada regular dos Cursos Técnicos Integrados ao Ensino Médio, processo seletivo 2022.", "A matrícula será realizada mediante preenchimento do formulário online, e inclusão de documentos exigidos no Edital Nº 139/2021, pelos candidatos (as) classificados(as),o qual estará disponível neste site em 1º/2/2022, a partir das 8h no link https://www.ifnmg.edu.br/processoseletivo/266-portal/arinos/arinos-cursos-tecnicos/28103-1-processo-seletivo-2022-cursos-tecnicos-campus-arinos.", "Posteriormente, em data estabelecida e agendada, todos os documentos (fotocópias, legíveis e sem rasuras) exigidos pelo Edital Nº 139, de 1 de outubro de 2021 e legislações pertinentes ao processo de matrícula, serão conferidos com os documentos originais (ou entregues autenticados) na Coordenação de Registros Escolares, campus Arinos."]},
  //   {id: 5, data: "01/01/2022", hora: "22:00", urlFoto: 'https://www.ifnmg.edu.br/arquivos/ARINOS-MATRICULAS-INTEGRADO.png', link: "https://www.ifnmg.edu.br/mais-noticias-arinos/617-arinos-noticias-2022/28151-candidatos-classificados-para-matricula-dos-cursos-tecnicos-integrados-ao-ensino-medio-no-campus-arinos", titulo: "Candidatos classificados para matrícula dos Cursos Técnicos Integrados ao Ensino Médio no Campus Arinos", conteudo: ["O IFNMG - Campus Arinos informa que iniciará em 1º/2/2022 as matrículas para os(as) candidatos(as) classificados na chamada regular dos Cursos Técnicos Integrados ao Ensino Médio, processo seletivo 2022.", "A matrícula será realizada mediante preenchimento do formulário online, e inclusão de documentos exigidos no Edital Nº 139/2021, pelos candidatos (as) classificados(as),o qual estará disponível neste site em 1º/2/2022, a partir das 8h no link https://www.ifnmg.edu.br/processoseletivo/266-portal/arinos/arinos-cursos-tecnicos/28103-1-processo-seletivo-2022-cursos-tecnicos-campus-arinos.", "Posteriormente, em data estabelecida e agendada, todos os documentos (fotocópias, legíveis e sem rasuras) exigidos pelo Edital Nº 139, de 1 de outubro de 2021 e legislações pertinentes ao processo de matrícula, serão conferidos com os documentos originais (ou entregues autenticados) na Coordenação de Registros Escolares, campus Arinos."]},
  // ])

  async function carregarDados() {
    firebase.firestore().collection('noticias').orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        let lista = [];
        snapshot.forEach(doc => {
          lista.push({ ...doc.data() });
        });
        if(lista.length > 0){
          setNoticias(lista);
          setOriginalNoticias(lista);
          setLoader(false)
          setLoaderList(true)
          console.log("dados carregados");
        }
      }, (error) => {
        Toast.show({
          type: 'error',
          text2: error.message
          // text2: "Erro ao acessar o banco de dados!",
          })
        setLoader(true)
      })
  }

  async function unsubscribe(){
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        Toast.show({
          type: 'error',
          text1: "Atenção",
          text2: 'Você não esta conectado a internet'
          })
          
          {!loaderList &&
            setLoader(true)
          }
      }
    });
  }

    useEffect(()=>{
      setLoader(true)
      setLoaderList(false)
      unsubscribe()
      carregarDados()
      // console.log("DENTRO DO USEEFECT")
    },[])


    function showCalendario(boolean){
      setShow(boolean);
    }
  
    function pegaDataDoPicker(data){
      setShow(Platform.OS === 'ios')
      if( data != null){
      pesquisaData(format(data, 'dd/MM/yy'))
      }
    }
   
    function handleClose(){
      setShow(false)
    }
  
    function atualizaHome(){
      unsubscribe()
      setNoticias(originalNoticias)
    }
  
    function pesquisaData(data){
      const noticiasPorDatas = noticias
      // console.log(noticiasPorDatas.filter(dado => dado.data.includes(data)).length)   
      setNoticias(noticiasPorDatas.filter(dado => dado.data.includes(data)))
      if(noticiasPorDatas.filter(dado => dado.data.includes(data)).length === 0){
        Toast.show({
          type: 'error',
          text1: "Alerta",
          text2: "Nenhuma noticia foi encontrada na data " + data,
          onPress: () =>{ atualizaHome(), Toast.hide()}
        })
      }
    }

    function dataInicial(){
      let data = noticias.map(valor => valor.data)
      let dataAlterada = parse(data[data.length -1], "dd/MM/yy", new Date());
      return dataAlterada
    }

 return (
   <SafeAreaView style={styles.container}>
        <HeaderHome data={"Últimas Notícias"} showCalendario={showCalendario} atualizaHome={atualizaHome}/>
        { loader && <Loader /> }

        { loaderList && 
        <FlashList
          data={noticias}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardNews data={item} />}
          estimatedItemSize={250}
          // ListEmptyComponent={<View style={styles.ViewListaVazia}><Text style={styles.listaVazia}>Nenhuma noticia foi encontrada</Text></View>}
          refreshControl={
            <RefreshControl 
              refreshing={loading}
              onRefresh={atualizaHome}
              tintColor= {'#008001'}
              colors={['#008001', 'blue']}
              size= {'large'}
            /> 
          }
        
        />}

        {show && (
          <BuscaPorData
            onClose={handleClose}
            date={dataHoje}
            onChange={pegaDataDoPicker}
            dataInicial={dataInicial()}
          />
        )}

  

   </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: "#CED3E8",
    backgroundColor: '#FFF'
    // paddingTop: StatusBar.currentHeight,
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
  }
});