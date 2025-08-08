import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { ModalTelecena } from "../components/modal";

export default function App() {
  const [numbers, setNumbers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function gerarNumero() {
    const numeroGerado = new Set();
    while (numeroGerado.size < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      numeroGerado.add(num);
    }
    const numerosArray = [...numeroGerado].sort((a, b) => a - b);
    setNumbers(numerosArray);
    console.log("Números gerados:", numerosArray);

    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerar Número da Mega Sena</Text>

      <TouchableOpacity style={styles.button} onPress={gerarNumero}>
        <Text style={styles.button_text}>Gerar números</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalTelecena
          numeros={numbers} 
          handleClose={() => setModalVisible(false)}
        />
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#392de9',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  button_text: {
    color: '#fff',
    fontSize: 20,
  },
});
