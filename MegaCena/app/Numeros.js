import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
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
      const jogos = (await getItem("@telecena_numeros")) || [];
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
    <ImageBackground
      source={{ uri: "https://i.ibb.co/hfDbW8n/gradient-bg.jpg" }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>🎲 Meus números</Text>
          {listaJogos.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={limparHistorico}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>🧹 Limpar</Text>
            </TouchableOpacity>
          )}
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
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ff88",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyText: {
    color: "#ccc",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    fontStyle: "italic",
  },
  jogoContainer: {
    marginBottom: 25,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#00ff88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  jogoTitulo: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#00ff88",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  numerosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  numberCircle: {
    backgroundColor: "#00ff88",
    width: 52,
    height: 52,
    borderRadius: 26,
    marginHorizontal: 6,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00ff88",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 6,
  },
  numberText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 20,
  },
  contador: {
    fontSize: 18,
    color: "#00ff88",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  clearButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#ff4d4d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,

    width : 60
  },
});
