import React from 'react';
import { TouchableOpacity, Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SaveImage } from '../../../src/utils/SaveImage';

export default function TakePhoto({ children, setPhotoUrl }) {
  async function takePhoto() {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const url = await SaveImage.saveAndAddImage(cameraResp.assets[0].uri);
        setPhotoUrl(url);
      }
    } catch (e) { 
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  return <TouchableOpacity onPress={takePhoto}><View>{children}</View></TouchableOpacity>;
}
