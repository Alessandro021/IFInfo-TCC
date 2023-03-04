import React, { useContext, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Authcontext } from "../../contextos/dados.js";
import AreaDoAlunoComponentes from "../../component/AreaDoAlunoComponentes/index.js"
import ModalHorarios from '../../component/Modal/ModalHorarios.js';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native'
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


function AreaDoAluno() {
  const { sairDaConta, dadosDoUsuario } = useContext(Authcontext)
  const navigation = useNavigation();
  const bottomsheetRef = useRef(null);
  const {height} = Dimensions.get("window");
  const snapPoints = useMemo(() => [1, height-110], []);

  let horas = new Date().getHours()
  
  const imgCajui = "https://firebasestorage.googleapis.com/v0/b/ifinfo-c5837.appspot.com/o/imagens_componentes_area_do_aluno%2Fcajui.png?alt=media&token=968511aa-7940-4bfe-8b4a-7c6408c3bcef"
  const imgBiblioteca = "https://firebasestorage.googleapis.com/v0/b/ifinfo-c5837.appspot.com/o/imagens_componentes_area_do_aluno%2Fbiblioteca_virtual.png?alt=media&token=70f42080-f787-4016-917b-1c1bab87b1fb"
  const imgHorario = "https://firebasestorage.googleapis.com/v0/b/ifinfo-c5837.appspot.com/o/imagens_componentes_area_do_aluno%2Fhorario-aula.png?alt=media&token=d22231e4-0483-4dec-bafb-9316e3c06ce0"
  const imgAlterarSenha = "https://firebasestorage.googleapis.com/v0/b/ifinfo-c5837.appspot.com/o/imagens_componentes_area_do_aluno%2Falterar-senha.png?alt=media&token=2fcd9db2-46b1-49db-a6b7-60049f5202bb"
  const biblioteca = "https://plataforma.bvirtual.com.br/";
  const cajui = "https://cajui.ifnmg.edu.br/cajui/login"


  const data = [
    { nome: "Cajui", img: imgCajui, titulo: "Acesse o cajui", descricao: "Clique aqui e veja suas notas presenças e faltas", link: cajui },
    { nome: "Biblioteca Virtual", img: imgBiblioteca, titulo: "Biblioteca Virtual", descricao: "Clique aqui e acesse a biblioteca virtual", link: biblioteca },
  ]

  function abrirModal() {
    bottomsheetRef.current?.expand();
  };

  return (
     
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.viewTitulo}>
          {horas < 12 ?
            <Text style={styles.titulo}> Bom dia, {dadosDoUsuario?.nome}</Text> : horas >= 12 && horas < 18 ?
              <Text style={styles.titulo}> Boa Tarde, {dadosDoUsuario?.nome} </Text> :
              <Text style={styles.titulo}> Boa Noite, {dadosDoUsuario?.nome}</Text>
          }
        </View>
        <View style={styles.viewComponentes}>
          <View style={{ alignItems: 'center' }}>
            <AreaDoAlunoComponentes data={data} />
          </View>

          <TouchableOpacity style={styles.componente}  onPress={abrirModal} >
            <Image resizeMode="contain" style={styles.imageCajui} source={{ uri: imgHorario }} />
            <View style={{ width: "70%" }}>
              <Text style={styles.tituloComponente}>Horário das aulas</Text>
              <Text style={styles.descricaoComponente}>Clique aqui e veja o horário das diciplinas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.componente} onPress={() => navigation.navigate("Alterar Senha")}>
            <Image resizeMode="contain" style={styles.imageCajui} source={{ uri: imgAlterarSenha }} />
            <View style={{ width: "70%" }}>
              <Text style={styles.tituloComponente}>Alterar senha</Text>
              <Text style={styles.descricaoComponente}>Clique aqui e faça a alteração da sua senha de login</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity style={styles.btnsubmit} onPress={sairDaConta}>
            <Text style={styles.btnText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
        
        </ScrollView>

          <BottomSheet
            ref={bottomsheetRef}
            snapPoints={snapPoints}
            // index={0}
            handleIndicatorStyle={{backgroundColor: "#008001"}}
          >
              <BottomSheetScrollView >
                <ModalHorarios />
              </BottomSheetScrollView>
          </BottomSheet>

      </View>

    
  );
}
export default gestureHandlerRootHOC(AreaDoAluno);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  viewTitulo: {
    marginVertical: 15,
    marginBottom: 50
  },
  titulo: {
    paddingLeft: 20,
    fontSize: RFValue(17),
    fontFamily: THEME.FONTS.r700
    // fontWeight: "600",
  },
  viewComponentes: {
    alignItems: 'center',
  },
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
    // shadowColor: "#00b94a",
    // elevation: 4,
  },
  tituloComponente: {
    // fontWeight: "900",
    fontFamily: THEME.FONTS.r900,
    fontSize: RFValue(14),
    color: "#008001",
  },
  descricaoComponente: {
    fontSize: RFValue(10),
    fontFamily: THEME.FONTS.r300,
    // fontWeight: "300",
    color: "#008001",
  },
  imageCajui: {
    width: 100,
    height: 60,
    tintColor: "#008001"
  },
  btnsubmit: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#008001',
    width: '95%',
    height: 55,
    borderRadius: 10,
    marginTop: 10
  },
  btnText: {
    fontSize: RFValue(16),
    fontFamily: THEME.FONTS.r900,
    color: '#FFFFFF'
  },
});