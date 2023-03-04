import React,{useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native'
import CusosOfertados from '../../component/CusosOfertados';
import firebase from '../../server/firebaseConnection'

export default function Tecnico() {

    const [cursosTecnicos, setCursosTecnicos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function buscaCursosTecnicos() {

        let tecnico = firebase.firestore().collection('cursosTecnicos')
        let snapshot = await tecnico.get();
        let lista = []
        snapshot.forEach(doc => {
            lista.push(doc.data().tecnico);
        });
        setLoading(false)
        setCursosTecnicos(lista)
      }

      const LoadingIndicator = () => {
        return (
          <ActivityIndicator
            color="#008001"
            size= {70}
            style={styles.ActivityIndicatorStyle}
          />
        );
      }

    useEffect(() => {
        setLoading(true)

        buscaCursosTecnicos();
      },[])

 return (
    loading ? LoadingIndicator() : <CusosOfertados data={cursosTecnicos}/>
  );
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: "center",
      }
})