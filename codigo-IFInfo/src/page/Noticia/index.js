import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderNoticia from '../../component/Header/HeaderNoticia.js'
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'
import { Feather } from '@expo/vector-icons'; 

export default function Noticia({route}) {

  const navigation = useNavigation()

 return (
   <View style={styles.container}>
    
    <HeaderNoticia link={route.params.link} titulo={"Notícia do Ifnmg"} tituloNoticias={route.params.titulo}/>

    <ScrollView >
    <View style={styles.viewTitulo}>
      <Text style={styles.textoTitulo}>{route.params.titulo}</Text>
    </View>

    <View style={styles.horaEData}>
         <Text style={styles.textoPublicacao}>Publicado: {route.params.data}</Text>
         <Text style={styles.textoPublicacao}>ás {route.params.hora}</Text>
       </View>

    <View style={styles.divImg}>
      {
        !route.params.imagem ? ( <View></View> ): <Image style={styles.img}
        source={{uri: route.params.imagem}}
        resizeMode='contain'
        />
      }

    </View>
    
    {route.params.conteudo.length != 0 && 
      <View style={styles.viewConteudo}>
        {route.params.conteudo.map((conteudo, index) => (
          <Text key={index} style={styles.conteudo}>{conteudo}{"\n"}</Text>
        ))}
    </View>
    }
    
        {/* SE O CONTEUDO DSA NOTICIA NAO VIM COMPLETO */}
      {
        route.params.conteudo.length === 0 &&
          <View style={styles.viewLink}>
            <Feather style={styles.iconAlert} name="alert-triangle" size={60} color="red" />
            <Text style={styles.textoLink}>Conteudo da noticia não foi carregado corretamente, para visualizar a noticia clique no botão abaixo.</Text>
            <TouchableOpacity style={styles.btn}
              onPress={() => navigation.navigate('Web', { link: route.params.link })}
            ><Text style={styles.textBnt}>Ir para o portal de notícias</Text>
            </TouchableOpacity>
          </View>
      }
      
      <View style={styles.viewFutter}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Web', { link: route.params.link })}>
          <Text style={styles.textoFutter}>Notícia retirada do portal de notícias do IFNMG <Text style={{fontStyle: "italic"}}>Campus</Text> Arinos. https://www.ifnmg.edu.br/arinos</Text>
        </TouchableNativeFeedback>
      </View>
   
    

   </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewTitulo:{
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10
  },
  textoTitulo: {
  //  color:'#13141a',
    color: '#00b94a',
    fontFamily: THEME.FONTS.r900,
    fontSize: RFValue(19),
    // fontWeight: "900",
    textAlign: "center",
    padding: 10,
  },
  horaEData:{
    flexDirection: 'row',
    marginLeft: 20
  },
  textoPublicacao:{
    color: '#13141a',
    fontSize: RFValue(10),
    fontFamily: THEME.FONTS.r400i,
    // fontWeight: "400",
    textAlign: "justify",
    padding: 10,
    paddingLeft: 15,
    marginRight: -20
  },
  divImg:{
    alignItems: 'center',
    justifyContent: 'center',
    
   },
   img:{
    width: "100%",
    height: 300,
   },
  viewConteudo:{
    marginBottom: 30,
    marginHorizontal: 10,
    marginTop: 35,
  },
  conteudo: {
    color:'#13141a',
    fontSize: RFValue(13),
    fontFamily: THEME.FONTS.r400,
    // fontWeight: "400" ,
    textAlign: "justify",
    paddingHorizontal: 10
   },
   viewLink:{
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 20
   },
   textoLink:{
    textAlign: "center",
    fontFamily: THEME.FONTS.r500,
    fontSize: RFValue(13)
   },
   iconAlert:{
    marginBottom: 10
   },
   btn:{
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FF3925' ,
    borderRadius: 25
   },
   textBnt:{
    fontFamily: THEME.FONTS.r900,
    color: '#FFE',
    fontSize: RFValue(10)
   },
   viewFutter:{
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    // backgroundColor: "red"
   },
   textoFutter:{
    color: "#114",
    fontSize: RFValue(9),
    fontFamily: THEME.FONTS.r400,
    textAlign: "center",
   }
   
});

