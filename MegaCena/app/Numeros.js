import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useStorage from "./useStorage";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

export function Numeros() {
  const [listaJogos, setListaJogos] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    async function loadData() {
      const jogos = await getItem("@telecena_numeros") || [];
      const historico = Array.isArray(jogos[0]) ? jogos : [];
      setListaJogos(historico.reverse()); // mostra o mais recente primeiro
    }
    loadData();
  }, [focused]);

  const renderJogo = ({ item, index }) => (
    <View style={styles.jogoContainer}>
      <Text style={styles.jogoTitulo}>Jogo {listaJogos.length - index}</Text>
      <View style={styles.numerosContainer}>
        {item.map((num, i) => (
          <View key={i} style={styles.numberCircle}>
            <Text style={styles.numberText}>{num}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  async function limparHistorico() {
    await removeItem("@telecena_numeros");
    setListaJogos([]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Meus números</Text>
      </View>

      <View style={styles.container}>
        {listaJogos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum número salvo ainda</Text>
        ) : (
          <>
            <Text style={styles.contador}>
              Total de jogos salvos: {listaJogos.length}
            </Text>

            <FlatList
              data={listaJogos}
              keyExtractor={(item, index) => String(index)}
              renderItem={renderJogo}
              contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity style={styles.clearButton} onPress={limparHistorico}>
              <Text style={styles.clearButtonText}>🧹 Limpar histórico</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#392de9",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#2a24b5",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f3ff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  jogoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  jogoTitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  numerosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  numberCircle: {
    backgroundColor: "#392de9",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 6,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  numberText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  contador: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },
  clearButton: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
