import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={{uri:"https://i.imgur.com/TkIrScD.png"}} style={styles.logo} />
      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>

      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 159,
    marginBottom: 10,
  },
    instructions:{
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
  },
  button: {
    fontSize: 20,
    backgroundColor: '#888',
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});
