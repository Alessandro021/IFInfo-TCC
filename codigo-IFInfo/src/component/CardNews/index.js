import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function CardNews({data}){

    const [loading, setLoading] = useState(false)
    // const numeroAleatorio = Math.floor(Math.random() * 5)
    const navigation = useNavigation()
    const urlImgAlternativa = 'http://3asolucoes.com/wp-content/uploads/2017/05/NOTICIAS-768x312.png';
    // const urlImgAlternativa = [
    //   {id:'0', img: "https://firebasestorage.googleapis.com/v0/b/noticias-ifnmg.appspot.com/o/imagens-aleatorias-card%2Fnoticias-1.png?alt=media&token=3ea5f9ee-31ac-4776-87a9-b5f6a4662fbd"},
    //   {id: '1', img: "https://firebasestorage.googleapis.com/v0/b/noticias-ifnmg.appspot.com/o/imagens-aleatorias-card%2Fnoticias-2.png?alt=media&token=48501293-ca23-4233-b4db-059d1e90d21d"},
    //   {id: '2', img: "https://firebasestorage.googleapis.com/v0/b/noticias-ifnmg.appspot.com/o/imagens-aleatorias-card%2Fnoticias-3.png?alt=media&token=a1bf7953-391f-43ae-a562-302cdf9f9ea9"},
    //   {id: '3', img: "https://firebasestorage.googleapis.com/v0/b/noticias-ifnmg.appspot.com/o/imagens-aleatorias-card%2FNot%C3%ADcias-4.png?alt=media&token=a0e74256-efbc-4440-a7e5-b7a698016770"},
    //   {id: '4', img: "https://firebasestorage.googleapis.com/v0/b/noticias-ifnmg.appspot.com/o/imagens-aleatorias-card%2Fimagem-5.png?alt=media&token=a86265eb-3f65-4af3-b5a7-0f635d76e280"},

    // ]


    function estaCarregando(valor){
      setLoading(valor)
    }
    return(
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Noticia', {
            titulo: data.titulo, conteudo: data.conteudo, 
            imagem: data.urlFoto, link: data.link, data: data.data, hora: data.hora
            })}
        >

        <View style={styles.viewcard}>
            {/* <View style={styles.viewImage}> */}

            {loading && 
              <View style={[styles.img,{justifyContent: 'center', zIndex: 0, width: "100%", position: "absolute" }]}>
              <ActivityIndicator color= "#008001" size="large" />
            </View>
            }
            
            {<Image style={styles.img}
                // source={{uri: data.urlFoto ? data.urlFoto : urlImgAlternativa[Math.floor(Math.random() * 5)].img }}
                source={{uri: data.urlFoto ? data.urlFoto : urlImgAlternativa}}
                resizeMode= "contain"
                onLoadStart={() => estaCarregando(true)}
                onLoadEnd={() => estaCarregando(false)}
            />}
            {/* </View> */}
            

            <View style={styles.horaEData}>
                <Text style={styles.textoPublicacao}>Publicado: {data.data}</Text>
                <Text style={styles.textoPublicacao}>Horario: {data.hora}</Text>
            </View>
       
            <Text style={styles.titulo}>{data.titulo}</Text>



        </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    viewcard: {
       margin: 10,
       backgroundColor: '#FFF',
       marginBottom: 15,
       marginTop: 10,
       // lineHeight: 0,
       shadowColor: 'rgba(0,0,0,1)',
         shadowOffset:{
             width: 0,
             height: 2
         },
       shadowOpacity: 0.5,
       shadowOpacity: 0.26,
       shadowRadius: 8,
       borderRadius: 10,
       elevation: 5,
    },
    img: {
      // width: "100%",
      height: 150,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      // borderRadius: 10,

    },
    horaEData:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    textoPublicacao:{
      color:'#13141a',
       fontSize: RFValue(10),
       fontFamily: THEME.FONTS.r500i,
      //  fontWeight: "500",
       textAlign: "justify",
       padding: 10,
       paddingLeft: 15,
       opacity: .6
    },
    titulo: {
      color:'#13141a',
      fontSize: RFValue(14),
      textAlign: 'justify',
      padding: 14,
      fontFamily: THEME.FONTS.r900,
      // fontWeight: '900',
      opacity: 0.7
   } 
    
  });