import React, {useContext, useState, useRef} from 'react';
import { View, 
  Text, 
  Image, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, // esse componente faz com que o teclado nao fique por cima do input
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Authcontext } from '../../contextos/dados.js';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import THEME from '../../services/Themes.js'
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";


export default function AlterarSenha() {
  const navigation = useNavigation();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senha, setSenha] = useState('');
  const [senha1, setSenha1] = useState('');
  

  const {senhaVisivel1,senhaVisivel2, senhaVisivel3, visivel1,visivel2, visivel3, loadingAuth, alterarSenha } = useContext(Authcontext)

  function senhaIgual(senhaAtual,senha, senha1){
    if(senhaAtual == ""){
      return Toast.show({
        type: 'error',
        text1: 'Alerta',
        text2: 'O campo de Senha Atual não podem esta vazio!'
      })
    }else if(senha ==""){
      return Toast.show({
        type: 'error',
        text1: 'Alerta',
        text2: 'O campos de Nova Senha não podem esta vazio!'
      })
    }else if(senha1 == ""){
      return Toast.show({
        type: 'error',
        text1: 'Alerta',
        text2: 'Os campos de Senha Novamente não podem esta vazio!'
      })
    }
    else if (senha.length < 6  || senha1.length < 6){
      return Toast.show({
        type: 'error',
        text1: 'Alerta',
        text2: 'As senhas devem ter mais de 6 digitos.'
      })
    }
    else if (senha.length >= 6  && senha1.length >= 6){
      if(senha.includes(senha1) && senha.length === senha1.length){
          return alterarSenha(senhaAtual, senha)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Alerta',
          text2: 'As senhas digitadas não são iguais!'
        })
      }
  }
    
  }

 return (
   <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding': ''}
        enabled
      > 
        <Image style={styles.logo}
          source={require('../../../assets/icon/logo1.png')}
          resizeMode='center'
        />

        <View style={styles.areaInputSenha}>
          <TextInput style={styles.inputSenhaVisivel}
          placeholder='Digite a senha atual'
          placeholderTextColor="#000"
          autoCorrect={false}
          autoCapitalize='none' // nao começa com a primeira letra maiuscula
          value={senhaAtual}
          onChangeText={(senha) => setSenhaAtual(senha)}
          secureTextEntry={!visivel1} //esconde os caracteres das senha digitada
          />
          <TouchableOpacity style={styles.icon} onPress={() =>senhaVisivel1()}>
            {visivel1 ? <Ionicons name="eye" size={30} color="green" /> : <Ionicons name="eye-off" size={30} color="green" />}
          </TouchableOpacity>
        </View>

        <View style={styles.areaInputSenha}>
          <TextInput style={styles.inputSenhaVisivel}
          placeholder='Digite a nova senha'
          placeholderTextColor="#000"
          autoCorrect={false}
          autoCapitalize='none' // nao começa com a primeira letra maiuscula
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
          secureTextEntry={!visivel2} //esconde os caracteres das senha digitada
          />

          <TouchableOpacity style={styles.icon} onPress={() =>senhaVisivel2()}>
            {visivel2 ? <Ionicons name="eye" size={30} color="green" /> : <Ionicons name="eye-off" size={30} color="green" />}
          </TouchableOpacity>
          
        </View>

        <View style={styles.areaInputSenha}>
          <TextInput style={styles.inputSenhaVisivel}
          placeholder='Digite a senha novamente'
          placeholderTextColor="#000"
          autoCorrect={false}
          autoCapitalize='none' // nao começa com a primeira letra maiuscula
          value={senha1}
          onChangeText={(senha) => setSenha1(senha)}
          secureTextEntry={!visivel3} //esconde os caracteres das senha digitada
          />
          <TouchableOpacity style={styles.icon} onPress={() =>senhaVisivel3()}>
            {visivel3 ? <Ionicons name="eye" size={30} color="green" /> : <Ionicons name="eye-off" size={30} color="green" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnsubmit}
        onPress={() =>senhaIgual(senhaAtual, senha, senha1)}
        >
          {
            loadingAuth ? (
              < ActivityIndicator size={20} color='#FFF'/>
            ) : (
          <Text style={styles.btnText}>Alterar senha</Text>

            )
          }
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
   </View>
  );
}

const styles = StyleSheet.create({
  background:{
      flex: 1,
      backgroundColor: "#FFF"
  },
  container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
  },
  logo:{
      marginBottom: 30,
  },
  areaInputSenha:{
    width: "90%",
    flexDirection: "row",
    height: 70,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#008001",
  },
  inputSenhaVisivel:{
      width: "85%",
      height: 70,
      fontSize: RFValue(14),
      fontFamily: THEME.FONTS.r400,
      paddingLeft: 20,
      color: '#000',
  },
  icon:{
    width: "15%",
    justifyContent: "center",
    alignItems: "center",

  },
  btnsubmit:{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#008001',
      width: '90%',
      height: 55,
      borderRadius: 10,
      marginTop: 10
  },
  btnText:{
      fontSize: RFValue(18),
      fontFamily: THEME.FONTS.r900,
      color: '#FFF'
  }

})