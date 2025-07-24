import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios'
import { useState } from 'react';

export default function App() {
  const [autor, setAutor] = useState([]);
  const [nomeAutor, setNomeAutor] = useState([]);

 
 async function getAutor() {
    try {
      const resposta = await axios.get('http://10.0.2.2:81/livros/api.php');
      setAutor (resposta.data);
    } catch (error) {
      alert ('erro');
    }
 }

 async function postAutor() {
    try {
      const resposta = await axios.post('http://10.0.2.2:81/livros/api.php', {
      nome:nomeAutor,
      });
      setNomeAutor('')
    } catch (error) {
      alert ('erro');      
    }
 }
 
  return (
    <View style={styles.container}>
      <Text>API Axios</Text>
      <Button title='Mostrar autor' onPress={getAutor} />
       <FlatList style={styles.flat} 
       data={autor}
       keyExtractor={(item)=> item.id}
       renderItem={({ item }) => (
        <View>
          <Text>{item.nome}</Text>
        </View>
      )}
       />
      <StatusBar style="auto" />

      <Text>------------------</Text>
      <Text>Inserir Autor</Text>
      <TextInput
      value='nomeAutor'
      onChange={setNomeAutor}/>

      <Button 
      title='Inserir' onPress={postAutor}
      />
      
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop : 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat : {
    paddingTop : 200,
    flex : 1,
    color: '#fff',



  }
});
