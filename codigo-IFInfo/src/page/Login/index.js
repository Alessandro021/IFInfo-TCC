import React, {useContext, useState} from 'react';
import { View, 
  Text,  
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, // esse componente faz com que o teclado nao fique por cima do input
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { Authcontext } from '../../contextos/dados.js';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes.js'


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [visivel, setVisivel] = useState(true);
  const {esqueciSenha, login, loadingAuth } = useContext(Authcontext)
  function fazerLogin(email, senha){
    if(email === "" || senha ===""){
      return Toast.show({
          type: 'error',
          text1: 'Alerta',
          text2: 'O campo email ou senha não pode estar vazio!'
        })
    }
    login(email, senha, limparTextImput )
  }

  function redefinirSenha(email){
    if(email === ""){
      return Toast.show({
          type: 'error',
          text1: 'Alerta',
          text2: 'O campo email não pode estar vazio!'
        })
    }
    esqueciSenha(email)
  }
  function limparTextImput(){
    setEmail(null)
    setSenha(null)
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
        <View style={styles.areaInput}>
          <TextInput style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#000"
          autoCorrect={false}
          autoCapitalize='none' // nao começa com a primeira letra maiuscula
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType='email-address'
          />
        </View>

        <View style={styles.areaInputSenha}>
          <TextInput style={styles.inputSenhaVisivel}
          placeholder='Senha'
          placeholderTextColor="#000"
          autoCorrect={false}
          autoCapitalize='none' // nao começa com a primeira letra maiuscula
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
          secureTextEntry={visivel} //esconde os caracteres das senha digitada
          />
          <TouchableOpacity style={styles.icon} onPress={() =>setVisivel(!visivel)}>
            {visivel ? <Ionicons name="eye" size={30} color="green" /> : <Ionicons name="eye-off" size={30} color="green" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnsubmit}
        onPress={() => fazerLogin(email, senha)}
        >
          {
            loadingAuth ? (
              < ActivityIndicator size={20} color='#FFF'/>
            ) : (
          <Text style={styles.btnText}>Acessar</Text>

            )
          }
        </TouchableOpacity>

        <View style={styles.viewBntlink}>
          

          <TouchableOpacity style={styles.btnLink}
          onPress={() => redefinirSenha(email)}
          >
            <Text style={[styles.linkText, {color: "#008001"}]}>Esqueci minha senha!</Text>
          </TouchableOpacity>

        </View>
        
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
  areaInput:{
      flexDirection: "row",
  },
  input:{
      backgroundColor: '#FFF',
      width: "90%",
      height: 70,
      fontSize: RFValue(14),
      fontFamily: THEME.FONTS.r400,
      color: '#000',
      marginBottom: 20,
      paddingLeft: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#008001",
  },
  areaInputSenha:{
    width: "90%",
    flexDirection: "row",
    height: 70,
    marginBottom: RFValue(14),
    fontFamily: THEME.FONTS.r400,
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
  },
  viewBntlink:{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly"
  },
  btnLink:{
      // marginTop: RFValue(16),
      marginTop: 20
  },
  linkText:{
      color: "#000",
      fontSize: RFValue(13),
      fontFamily: THEME.FONTS.r500
  }

})