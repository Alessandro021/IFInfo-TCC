import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar, View} from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';
import AuthProvider from './src/contextos/dados.js'
import Notificacao from './src/component/Notificacao';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from './src/services/Themes'

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Roboto_100Thin,
          Roboto_100Thin_Italic,
          Roboto_300Light,
          Roboto_300Light_Italic,
          Roboto_400Regular,
          Roboto_400Regular_Italic,
          Roboto_500Medium,
          Roboto_500Medium_Italic,
          Roboto_700Bold,
          Roboto_700Bold_Italic,
          Roboto_900Black,
          Roboto_900Black_Italic,
        })
      } catch (error) {
        
      }
      finally {
        setAppIsReady(true);
      }
    })()
  },[])

  const onLayout = useCallback(() => {
    if(appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if(!appIsReady) {
    return null;
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#008001',  width: "90%", height: 70 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: RFValue(10),
          fontFamily: THEME.FONTS.r400,
        }}
        text2Style={{
          fontSize: RFValue(9),
          fontFamily: THEME.FONTS.r900,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
      style={{ borderLeftColor: '#FF0000', width: "90%", height: 70 }}
        {...props}
        text1Style={{
          fontSize: RFValue(10),
          // fontFamily: THEME.FONTS.r400,
        }}
        text2Style={{
          fontSize: RFValue(9),
          fontFamily: THEME.FONTS.r900,
        }}
        text2NumberOfLines={2}
      />
    ),
  }
  return (
    <View onLayout={onLayout} style={{flex: 1}}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor='#008001' barStyle='default' />
          <Notificacao />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
      <Toast  config={toastConfig}/>
    </View>
  );
}