import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";

export function Numeros() {
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>

      <View style={styles.container}>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 50,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
