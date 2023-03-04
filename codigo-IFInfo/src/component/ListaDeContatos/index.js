import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Linking, Platform, Animated, LayoutAnimation} from 'react-native';
import { Foundation } from '@expo/vector-icons'; 
// import { Zocial } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'

export default function ListaDeContatos({data}) {
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
        
            <TouchableOpacity style={styles.bntContato} onPress={() => alternarItensDalista()} >
                <View style={styles.viewCargo}>
                    <Text style={styles.cargo}>{data.id}</Text>
                    <Animated.View style={{transform: [{rotateZ: mudarSeta}]}}>
                        <MaterialIcons name="keyboard-arrow-down" size={35} color="#008001" />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        
        
        {mostrarConteudo && data.contato.map((contato, index) =>
            <View style={styles.viewContato} key={index}>
                 <Text style={styles.nome} >{contato.nome}</Text>
                <View style={[styles.viewBnt, contato.telefone ? {justifyContent: 'space-between'} : {justifyContent: "center"} ]}>
                    
                    {contato.telefone && 
                        <TouchableOpacity style={styles.bnt}
                        onPress={() => {

                            if (Platform.OS === 'android') {
                                Linking.openURL(`tel:${contato.telefone}`)
                              } else {
                                Linking.openURL(`telprompt:${contato.telefone}`)
                              }   
                        }}>
                            <Foundation name="telephone" size={24} color="#FFFFFF"/>
                            <Text style={styles.textoBnt}>{contato.telefone}</Text>
                        </TouchableOpacity>
                    }

                    {contato.email && 
                        <TouchableOpacity style={styles.bnt} onPress={() => {
                            Linking.openURL(
                                "mailto:" + contato.email
                              );
                        }}>
                            {/* <Zocial name="email" size={22} color="#FFFFFF" /> */}
                            <Entypo name="mail" size={22} color="#FFFFFF" />
                            <Text style={styles.textoBnt}>{contato.email}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
       )}
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
    bntContato:{
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    viewCargo:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    cargo: {
        width: "90%",
        fontSize: RFValue(11),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: "#008001"
    },
    viewContato:{
        flex: 1,
        width: '100%',
    },
    nome: {
        fontSize: RFValue(10),
        fontFamily: THEME.FONTS.r700,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        opacity: .6
    },
    viewBnt:{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
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