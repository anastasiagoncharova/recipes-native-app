import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SaveImage } from '../../../src/utils/SaveImage';

export default function UploadPhoto({ children, setPhotoUrls }) {
  async function uploadPhoto() {
    try {
      const cameraResp = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
        base64: false,
      });

      if (!cameraResp.canceled) {
        const photoUrls = [];
        for (const asset of cameraResp.assets) {
          try {
            const url = await SaveImage.saveAndAddImage(asset.uri);
            photoUrls.push(url);
          } catch (error) {
            console.error('Error saving image:', error);
          }
        }
        setPhotoUrls(photoUrls);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  return <TouchableOpacity onPress={uploadPhoto}>{children}</TouchableOpacity>;
}
