import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Input from '../../components/Input/Input';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../../store/recipeSlice';
import Button from '../../components/CommonButton/CommonButton';
import TakePhoto from '../../components/TakePhoto/TakePhoto';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import Category from '../../components/Category/Category';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

export default function AddRecipeScreen({ navigation }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlArray, setPhotoUrlArray] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
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

  const takePhotoUrl = (url) => {
    setPhotoUrl(url);
  };

  const uploadPhotoUrl = (urls) => {
    setPhotoUrlArray(urls);
    setPhotoUrl(urls[0]);
  };

  const setCategoryId = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  async function onSubmit(recipeData) {
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
      <Category setCategory={setCategoryId}>
        <Button>Select Category</Button>
      </Category>
      <TakePhoto setPhotoUrl={takePhotoUrl}>
        <Button>Take a photo</Button>
      </TakePhoto>
      <UploadPhoto setPhotoUrls={uploadPhotoUrl}>
        <Button>Upload photo</Button>
      </UploadPhoto>
      {photoUrl && <PhotoPreview uri={photoUrl}></PhotoPreview>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={cancelHandler}>
          <Button mode='flat'>Cancel</Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitHandler}>
          <Button>Submit</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
