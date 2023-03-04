import React,{useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native'
import CusosOfertados from '../../component/CusosOfertados';
import firebase from '../../server/firebaseConnection'

export default function Superior() {

    const [cursosSuperiores, setCursosSuperiores] = useState([]);
    const [loading, setLoading] = useState(false);

    const LoadingIndicator = () => {
        return (
          <ActivityIndicator
            color="#008001"
            size= {70}
            style={styles.ActivityIndicatorStyle}
          />
        );
      }

    async function buscaCursosSuperiores(){
        let superior = firebase.firestore().collection('cursosSuperiores')
        let snapshot = await superior.get();
        let lista = []
        snapshot.forEach(doc => {
          lista.push(doc.data().superior);
        });
        setLoading(false)
        setCursosSuperiores(lista)

      }

    useEffect(() => {
        setLoading(true)
        buscaCursosSuperiores();
      },[])
 return (
    loading ? LoadingIndicator() : <CusosOfertados data={cursosSuperiores}/>
  );
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: "center",
      }
})