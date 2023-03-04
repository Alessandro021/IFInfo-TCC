import firebase from "../server/firebase.js";

let tokens= []
async function deleta_Token_repitido() {
  await firebase.firestore().collection('tokensNotifications').get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        tokens.push({id: doc.id, token: doc.data().token})
      });

      let ids = []
      tokens.map(valor => ids.push(valor.token))
      tokens = ids.filter( (token, i, self) => {
        if (self.indexOf(token) != i) { //verifica se o elemento foi encontrado na sua posição, se ele for encontrado em outra posição significa que ha outro elemento igual a ele
          deletar(tokens[i].id)
        }
    }); //VERIFICA SE EXISTE TOKENS DUPICADOS. GERA UM NOVO ARRAY COM ARRAYS UNICOS

    })
    

    async function deletar(id){
      await firebase.firestore().collection('tokensNotifications').doc(id).delete()
       .then(()=>{
       })
   }
}
export default deleta_Token_repitido;
