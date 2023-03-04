import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

//(2 notificação)
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import firebase from '../../server/firebaseConnection.js'
import { useNavigation } from '@react-navigation/native';

  //(7 notificação) chama a notificação qndo o app esta aberto.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

 
export default function Notificacao() {

   //(3 notificação)
  // const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation()

  //( 5 notificaçaõ)
  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(async (token) =>
    {
      await firebase.firestore().collection('tokensNotifications').where("token", '==', token).get()
        .then(async snapshot => {
          if (!snapshot._delegate._snapshot.docs.size && token != null) { //SE O TOKEN NAO FOR IAGUAL ELE ADICIONA NO FIREBASE
            await firebase.firestore().collection('tokensNotifications').add({
              token: token,
              dataAdicionado: firebase.firestore.FieldValue.serverTimestamp()
            })
          }
        }
        )
    }
    );
    //e chamando quando uma notificação é enviada e o app esta aberto
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
      let data = response?.notification.request.content.data

       // (8 notificação) clica na notificação e abre a noticia q chegou na notificação
      navigation.navigate('Noticia', {
        titulo: data.titulo , conteudo: data.conteudo,
        imagem: data.urlFoto , link: data.link, data: data.data , hora: data.hora
      })
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);
  
  //(4 notificação)
  //REGISTRA O TOKEM DO USUARIO
    async function registerForPushNotificationsAsync() {
      let token;
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = await Notifications.getDevicePushTokenAsync().then(token => {return token.data})
        // await teste((await Notifications.getDevicePushTokenAsync()).data)
        // console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
      return token;
    };
}
