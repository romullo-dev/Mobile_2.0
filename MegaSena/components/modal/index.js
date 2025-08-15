import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import useStorage from "../../app/useStorage";
import { SafeAreaView } from "react-native-safe-area-context";


export function ModalTelecena({ numeros, handleClose }) {
  const { getItem, saveItem } = useStorage();

  async function handleCopyNumbers() {
    try {
      const numerosStr = Array.isArray(numeros) ? numeros.join(", ") : String(numeros);
      await Clipboard.setStringAsync(numerosStr);

      const jogosAnteriores = await getItem("@telecena_numeros");
      const historico = Array.isArray(jogosAnteriores) && Array.isArray(jogosAnteriores[0])
        ? jogosAnteriores
        : [];

      await saveItem("@telecena_numeros", [...historico, numeros]);

      alert("Números copiados e salvos");
      handleClose();
    } catch (error) {
      console.log("Erro ao copiar e salvar:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.title}>Números da Telecena</Text>

        <Pressable style={styles.inner} onLongPress={handleCopyNumbers}>
          <Text style={styles.text}>
            {Array.isArray(numeros) ? numeros.join(", ") : numeros}
          </Text>
        </Pressable>

        <View style={styles.area}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleCopyNumbers}
          >
            <Text style={styles.buttonTextSave}>Copiar & Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(24,24,24,0.6)",
    alignItems: "center",
    justifyContent: "flex-start", // coloca no topo
    paddingTop: "20%", // empurra um pouco para baixo
  },
  
  
  cont: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  inner: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
  area: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392DE9",
    borderRadius: 8,
  },
  buttonTextSave: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
