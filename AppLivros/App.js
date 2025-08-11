import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  return (
    <View style = {styles.container} >
      <WebView
      source={{ uri: 'http://10.0.2.2:81/livros'}}
      style={{ flex: 1, marginTop:60 }}
    />

    </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
