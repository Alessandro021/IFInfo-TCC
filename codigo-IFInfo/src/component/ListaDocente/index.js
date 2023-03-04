import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Linking, Platform, Animated, LayoutAnimation} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
// import { Zocial } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'



export default function ListaDocente({data}) {
    const navigation = useNavigation()
    const [mostrarConteudo, setMostrarConteudo] = useState(false)
    const controlaAnimacao = useRef(new Animated.Value(0)).current;

    const alternarItensDalista = () => {
        const config ={
            duration: 200,
            toValue: mostrarConteudo ? 0 : 1,
            useNativeDriver: true,
        }
        Animated.timing(controlaAnimacao, config).start();

        //NÃO É MUITO NECESSARIO
        LayoutAnimation.configureNext({
            duration: 300,
            update:{
                duration: 300,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.easeInEaseOut
            },
            delete:{
                duration: 200,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.easeInEaseOut
            }
        })
        setMostrarConteudo(!mostrarConteudo)
    }

    const mudarSeta = controlaAnimacao.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    })
 return (
   <SafeAreaView style={styles.container} >

                <TouchableOpacity style={styles.bntDocente} onPress={() => alternarItensDalista()} >
                    <View style={styles.viewBnt}>
                        <View style={styles.viewNome}>
                            {/* <FontAwesome style={{marginHorizontal: 10}} name="user-circle-o" size={35} color="#008009" /> */}
                            <Text style={styles.nome}>{data.nome}</Text>
                        </View>
                        <Animated.View style={[styles.viewIcon, {transform: [{ rotateZ: mudarSeta }]} ]}>
                            <MaterialIcons name="keyboard-arrow-down" size={35} color="#008001" />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
                
                { mostrarConteudo &&
                <View style={styles.conteudo}>
                        <Text style={styles.area} >ÁREA DE ENSINO: {data.area}</Text>
                    <View style={styles.viewEmailCurriculo}>

                        {data.curriculo && 
                        <TouchableOpacity style={styles.bnt}
                        onPress={() => navigation.push('Web curriculo', { link: data?.curriculo, titulo: data.nome })}
                        >
                            {/* <FontAwesome5 name="file-alt" size={26} color="#FFFFFF"/> */}
                            <AntDesign name="solution1" size={22} color="#FFFFFF" />
                            <Text style={styles.textoBnt}>curriculo</Text>
                        </TouchableOpacity>
                        }

                        {data.email && 
                        <TouchableOpacity style={styles.bnt} onPress={() => {
                            Linking.openURL(
                                "mailto:" + data.email
                              );
                        }}>
                            {/* <Zocial name="email" size={22} color="#FFFFFF" /> */}
                            <Entypo name="mail" size={24} color="#FFFFFF" />
                            <Text style={styles.textoBnt}>{data.email}</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                }
 
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,1)',
         shadowOffset:{
             width: 0,
             height: 2
         },
        borderBottomWidth: 2,
        borderStartWidth: 2,
        borderStartColor: '#008001',
        borderBottomColor: '#008001',
       shadowOpacity: 0.5,
       shadowOpacity: 0.26,
       shadowRadius: 8,
       borderRadius: 10,
       elevation: 5,
       overflow: 'hidden',
    },
    bntDocente:{
        paddingVertical: 10,
    },
    viewBnt:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    viewNome:{
        width: "90%",
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    viewIcon:{
        alignItems: 'center',
        justifyContent: "center",
        width: "10%",
    },
    nome: {
        fontSize: RFValue(12),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: "#008001"
    },
    area: {
        fontSize: RFValue(10),
        fontFamily: THEME.FONTS.r700,
        textAlign: 'left',
        marginTop: 10,
        opacity: .7,
        paddingLeft: 15

    },
    conteudo:{
    },
    viewEmailCurriculo:{
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        paddingHorizontal: 10
    },
    bnt:{
        backgroundColor: '#008001',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
        //sombra
        shadowColor: "#003001",
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 4
    },
    textoBnt:{
        marginLeft: 5,
        fontSize: RFValue(10),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: "900",
        color: "#FFFFFF"
    }
});