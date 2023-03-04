import firebase from "../server/firebase.js";

//A FUNÇAÕ DESSE CODIGO É MANTER NO BANCO DE DADOS SOMENTE 20 NOTICIAS

let ids = []
async function deleta_noticia() {
    await firebase.firestore().collection('noticias').orderBy("id", "desc").get()
      .then(snapshot => {
         ids = snapshot.docs.map(doc => doc.id);
      })

      if(ids.length > 20){
        let i = 20
        while(i <= ids.length-1){
            await firebase.firestore().collection('noticias').doc(ids[i]).delete()
            i++;
        }
      }
}
export default deleta_noticia;
