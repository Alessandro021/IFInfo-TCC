import React, {useState, useRef, useContext} from 'react';
import  {WebView}  from 'react-native-webview';
import { ActivityIndicator, StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
// import { Authcontext } from '../../contextos/dados.js';


export default function Web({route}) {

  // const {logado} = useContext(Authcontext)
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanForward] = useState(false);
  const handleBackPress = () => {
    webViewRef.current.goBack();
  }
  const handleForwardPress = () => {
    webViewRef.current.goForward();
  }

  const NavigationView = ({onBackPress, onForwardPress, canGoBack, canGoForward}) => (

    <View style= {([styles.container, !canGoBack && !canGoForward && styles.hide])}>
        {canGoBack && (<TouchableOpacity style={styles.button} onPress={onBackPress}>
            <Text style={styles.buttonTitle}>Voltar</Text>
        </TouchableOpacity>)}
        
        {canGoForward && (<TouchableOpacity style={styles.button} onPress={onForwardPress}>
        <Text style={styles.buttonTitle}>Avançar</Text>
        </TouchableOpacity>)}
    </View>

);
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#008001"
        size= {70}
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
 return (

  <SafeAreaView style={styles.flexContainer}>
    <WebView
      source={{ uri: route.params.link }}
      // incognito={logado}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
      ref= {webViewRef}
      onNavigationStateChange={state => {
        const voltar = state.canGoBack;
        const avancar = state.canGoForward;
        setCanGoBack(voltar);
        setCanForward(avancar)
    }}
    />

     <NavigationView
       onBackPress={handleBackPress}
       onForwardPress={handleForwardPress}
       canGoBack={canGoBack}
       canGoForward={canGoForward}
     />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
  },
  hide:{ 
    display: 'none'
  },
  container:{
    height: 50,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button:{

  },
  buttonTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'800',
  },
});