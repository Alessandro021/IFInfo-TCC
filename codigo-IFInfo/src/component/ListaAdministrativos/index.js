import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Linking, Platform, Animated, LayoutAnimation} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function ListaAdministrativos({data}) {
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
            {/* <View style={styles.viewServidor}> */}
                <TouchableOpacity style={styles.bntAdministrativos} onPress={() => alternarItensDalista()} >
                    <View style={styles.viewBnt}>
                        <View style={styles.viewNome}>
                            <FontAwesome style={{marginHorizontal: 10}} name="user-circle-o" size={35} color="#008009" />
                            <Text style={styles.nome}>{data.nome}</Text>
                        </View>
                        
                        <Animated.View style={[styles.viewIcon, {transform: [{ rotateZ: mudarSeta }]} ]}>
                            <MaterialIcons name="keyboard-arrow-down" size={35} color="#008001" />
                        </Animated.View>
                    </View>
                    { mostrarConteudo &&  <Text style={styles.cargo} >Cargo: {data.cargo}</Text>}
                </TouchableOpacity>                
            {/* </View> */}
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
       shadowOpacity: 0.5,
       shadowOpacity: 0.26,
       shadowRadius: 8,
       borderRadius: 10,
       elevation: 5,
       overflow: 'hidden',
    },
    bntAdministrativos:{
        // width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    viewBnt:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    viewNome:{
        width: "90%",
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
        // width: "90%",
        fontSize: RFValue(12),
        fontFamily: THEME.FONTS.r900,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: "#008001"
    },
    cargo: {
        fontSize: RFValue(10),
        fontFamily: THEME.FONTS.r700,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        opacity: .6
    },
    
});