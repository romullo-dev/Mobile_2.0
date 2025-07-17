import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function App() {
  const [user, setUser ] = useState ('');
  const [consulta,setConsulta] = useState ('');

  //salvar usuario
  
try {
    async function userSalve() {
      await AsyncStorage.setItem('@id_user', user);
      alert ('salvo com sucesso')
  }
} catch (error) {
  alert( 'erro ao salvar')
}

    
  
  return (
    <View style={styles.container}>
      <Text>Usuario</Text>
      <TextInput style={styles.input}
      placeholder='digite o nome do usuario'
      value={user}
      onChangeText={setUser}
      />
      <Button
      title='Salvar'
      value={consulta}
      onPress={setConsulta}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    width : 200,
    backgroundColor : '#fefefe',

  }
});
