import React from 'react';
import { Image, StyleSheet, Platform, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async ()=>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(pickerResult.cancelled == true) {
      return;
    }

    if(Platform.OS === 'web'){
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri});
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null});
    }
  };

  let openShareDialogAsync = async () => {
    if(!(await Sharing.isAvailableAsync())) {
      alert(`the image is available for sharing at: ${selectedImgae.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={({uri: selectedImage.localUri})}
          style={styles.thumbnail} />
          <TouchableOpacity
            onPress={openShareDialogAsync}
            style={styles.button}>
              <Text style={styles.buttonText}>Share this photo!</Text>
          </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image source={{uri:"https://i.imgur.com/TkIrScD.png"}} style={styles.logo} />
      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
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
  },
  thumbnail: {
    width:300,
    height: 300,
    resizeMode: 'contain'
  }
});
