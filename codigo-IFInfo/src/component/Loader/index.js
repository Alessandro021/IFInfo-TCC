import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform} from 'react-native';

export default function Loader() {
 return (
   <View style={styles.container}>
    <ActivityIndicator  size={Platform.OS == 'ios' ? 'large' : 70} color="green" />
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})