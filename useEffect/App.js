import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (number === 10) {
      alert('🎉 O VALOR CHEGOU NO 10! 🎉');
    }
  }, [number]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>

      <Text style={styles.counter}>{number}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => setNumber(number - 1)}>
          <Text style={styles.btnText}>➖</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => setNumber(number + 1)}>
          <Text style={styles.btnText}>➕</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00f2ff',
    marginBottom: 40,
  },
  counter: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    backgroundColor: '#00f2ff',
    padding: 20,
    borderRadius: 100,
    elevation: 5,
  },
  btnText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
});
