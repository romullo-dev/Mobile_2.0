import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { useState } from 'react';
import { ModalTelecena } from "../components/modal";
import useStorage from './useStorage';

export default function App() {
  const { saveItem } = useStorage();
  const [numbers, setNumbers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function gerarNumero() {
    const numeroGerado = new Set();
    while (numeroGerado.size < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      numeroGerado.add(num);
    }
    const numerosArray = [...numeroGerado].sort((a, b) => a - b);
    setNumbers(numerosArray);

    await saveItem("@telecena_numeros", numerosArray);
    setModalVisible(true);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/hfDbW8n/gradient-bg.jpg' }} // fundo elegante
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>🎰 Mega Sena</Text>
        <Text style={styles.subtitle}>Seu gerador de números da sorte</Text>

        <TouchableOpacity style={styles.button} onPress={gerarNumero}>
          <Text style={styles.button_text}>🎯 Gerar números</Text>
        </TouchableOpacity>
      </View>

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

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
    opacity: 0.85,
  },
  button: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  button_text: {
    color: '#121212',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
