import React, {useRef, useState} from 'react';
import { Text, Modal, TouchableOpacity, SafeAreaView, StyleSheet, View, Animated, Easing, Share} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes'


export default function DotsMenu({ link, titulo }) {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const scale = useRef(new Animated.Value(0)).current

    const compartilhar = async () => {
       await Share.share({message: titulo +' - Link da noticia: ' + link}).then((result) => console.log(result))
      };

    function abrirModal(valor){
        valor === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: valor,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => valor === 0 && setVisible(false))
    }
    return (
        <View>
            <TouchableOpacity onPress={() => abrirModal(1)}>
                <MaterialCommunityIcons name="dots-vertical" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <Modal transparent visible={visible} >
                <SafeAreaView onTouchStart={() => abrirModal(0)} style={styles.container}>
                    <Animated.View style={styles.viewMenu}>
                        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Web', { link: link })}  >
                            {/* <Ionicons name="arrow-forward" size={22} color="black" /> */}
                            <Text style={styles.texto}>Ir para o site da notícia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} onPress={() => compartilhar() }  >
                            {/* <Ionicons name="md-share-social-sharp" size={22} color="black" /> */}
                            <Text style={styles.texto}>Compartilhar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} onPress={() => setVisible(false)}>
                            {/* <Ionicons name="close" size={22} color="black" /> */}
                            <Text style={styles.texto}>Fechar</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    viewMenu:{

        padding: 8,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,

        position: 'absolute',
        top: 60,
        right: 18,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset:{
            width: 0,
            height: 2
        },
        elevation: 10,
        shadowOpacity: 0.40,
        shadowRadius: 4,        
    },
    texto:{
        paddingHorizontal: 10,
        fontSize: RFValue(11),
        fontFamily: THEME.FONTS.r700,
        // fontWeight: '900',
        paddingVertical: 10,
    },
    botao:{
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start"
    }
})
      