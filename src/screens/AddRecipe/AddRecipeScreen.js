import React, { useState } from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Input from '../../components/Input/Input';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { useDispatch } from 'react-redux';
import CategoryPickerModal from '../CategoryPickerModal/CategoryPickerModal';
import { addRecipe } from '../../store/recipeSlice';
import Button from '../../components/CommonButton/CommonButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function AddRecipeScreen({ navigation }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlArray, setPhotoUrlArray] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: {
      value: '',
      isValid: true,
    },
    time: {
      value: '',
      isValid: true,
    },
    description: {
      value: '',
      isValid: true,
    },
  });

  function inputChangeHandler(identifier, inputValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [identifier]: { value: inputValue, isValid: true },
      };
    });
  }

  async function onSubmit(recipeData) {
    console.log(photoUrl);
    const newRecipe = {
      recipeId: 46,
      categoryId: selectedCategoryId,
      title: recipeData.title,
      photo_url: photoUrl,
      photosArray: photoUrlArray,
      time: recipeData.time,
      ingredients: [
        [0, '200ml'],
        [1, '5g'],
        [2, '300g'],
      ],
      description: recipeData.description,
    };
    dispatch(addRecipe(newRecipe));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler() {
    const recipeData = {
      title: inputs.title.value,
      time: inputs.time.value,
      description: inputs.description.value,
    };

    const titleIsValid = recipeData.title;
    const timeIsValid = recipeData.time;
    const descriptionIsValid = recipeData.description;

    if (titleIsValid && timeIsValid && descriptionIsValid) {
      onSubmit(recipeData);
    } else {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          time: { value: curInputs.time.value, isValid: timeIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  function openCategoryModal() {
    setCategoryModalOpen(true);
  }

  function closeCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function takePhoto() {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        saveImages(cameraResp.assets);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  async function uploadPhoto() {
    try {
      const cameraResp = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
        base64: false,
      });

      if (!cameraResp.canceled) {
        saveImages(cameraResp.assets);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  }

  async function saveImages(assets) {
    console.log('uri - ' + assets[0].uri);
    const url = await saveAndAddImage(assets[0].uri);
    setPhotoUrl(url);
    console.log('photoUrl' + photoUrl);
    const photoUrls = [];
    assets.forEach(async (asset) => {
      const url = await saveAndAddImage(asset.uri);
      photoUrls.push(url);
    });
    setPhotoUrlArray(photoUrls);
  }

  async function saveAndAddImage(imageUri) {
    try {
      const fileName = `${Date.now()}_uploadedImage.jpg`;
      const destinationPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: imageUri,
        to: destinationPath,
      });
      console.log(destinationPath);
      return destinationPath;
    } catch (error) {
      console.error('Error saving image:', error);
      return '';
    }
  }

  function selectCategory(categoryId) {
    console.log(categoryId);
    setSelectedCategoryId(categoryId);
  }

  return (
    <View>
      <View style={styles.inputsRow}>
        <Input
          label='Title'
          invalid={!inputs.title.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'default',
            onChangeText: inputChangeHandler.bind(this, 'title'),
            value: inputs.title.value,
          }}
        />
        <Input
          label='Time'
          invalid={!inputs.time.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'numeric',
            onChangeText: inputChangeHandler.bind(this, 'time'),
            value: inputs.time.value,
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      <CategoryPickerModal
        onSelectCategory={selectCategory}
        visible={isCategoryModalOpen}
        onClose={closeCategoryModal}
      />
      <Button onPress={openCategoryModal}>Select Category</Button>
      <Button onPress={takePhoto}>Take a photo</Button>
      <Button onPress={uploadPhoto}>Upload photo</Button>
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={submitHandler}>Submit</Button>
      </View>
    </View>
  );
}
