import fetch from "node-fetch";
import firebase from "../server/firebase.js";
import dotenv  from "dotenv"
dotenv.config()

//npm install node-fetch

let tokens= []
async function chamaNotificacao(titulo, conteudo, hora, data, link, link_da_foto) {
  await firebase.firestore().collection('tokensNotifications').get()
    .then(snapshot => {
       tokens = snapshot.docs.map(doc => doc.data().token);

    })

async function notificacao(token, titulo){
  
  for (let pushToken of token){

 await fetch('https://fcm.googleapis.com/fcm/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'key='+process.env.AUTTHORIZATION,
  },
  body: JSON.stringify({
    to: pushToken,
    priority: 'high',
    data: {
      experienceId: process.env.EXPERIENCE_ID,
      scopeKey: process.env.SCOPE_KEY,
      title: "Últimas Notícias",
      message: titulo,
      color: '#008001',
      sound: true, 
      body: {titulo, conteudo: conteudo, urlFoto: link_da_foto, link: link, data: data, hora: hora},
      subtitle: "IFNMG Campus Arinos"
    },
  }),
});
}
}
notificacao(tokens,titulo)

}
export default chamaNotificacao;