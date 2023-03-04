import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import PDFReader from '@bildau/rn-pdf-reader'

export default function VerPdf({route}){
    return (
      <PDFReader
        source={{
          base64: route.params.link,
        }}
        style={styles.pdf}
      />
    )
}
const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  pdf:{
    width: width,
    height: height,
    flex: 1
  },

})