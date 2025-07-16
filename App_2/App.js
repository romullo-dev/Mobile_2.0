import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [valor, setValor] = useState();
  const [ parcelas, setParcelas] = useState();

  useEffect (() => {
    alert('fds');
  }, [valor, parcelas]);

  return (
    <View style={styles.container}>
      <Text>Valor compra (R$)</Text>
      <TextInput  
        placeholder="Digite o valor da compra"
        value={valor}
        onChange={setValor}
      />
      <Text>Parcelas</Text>
      <TextInput  
        placeholder="Digite a quantidade de parcelas"
        value={parcelas}
        onChange={setParcelas}
      />
      <Text>Pagamentos</Text>
      <TextInput  
        placeholder="10000"
        value=""
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
