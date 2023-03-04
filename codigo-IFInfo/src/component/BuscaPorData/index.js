import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'


export default function BuscaPorData({date, onChange, onClose, dataInicial}) {

 return (
    <View style={styles.container}>
        { Platform.OS === 'ios' && (
            <View style={styles.header}>
                 <TouchableOpacity onPress={onClose}> {/*Tester depois */}
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </View>
        )}
        <DateTimePicker 
            value={new Date()}
            maximumDate={new Date()}
            minimumDate ={ dataInicial}
            mode="date"
            positiveButtonLabel="selecionar"
            display='default'
            themeVariant="dark"
            onChange={(evento, dataSelecionada) =>{
                const data = dataSelecionada || date
                if (evento?.type === 'dismissed') { //CASO O USUARIO CLICK  EM 'CANCELAR' OU CLIQUE FORA DO MODAL SERA ENVIADO PARA A FUNÇÃO O VALOR NULL
                    onChange(null)
                    return;
                }
                onChange(data) //SO SERA CHAMADO ESSA FUNÇÃO SE O USUARIO CLICAR EM SELECIONAR
            }}
        />
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? '#00000066' : 'trasparent',
        position: "absolute",
        justifyContent: 'flex-end',
        width: "100%",
        height: "100%"
    },
    header:{
        width: "100%",
        padding: 16,
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: 'grey'
    }
})
