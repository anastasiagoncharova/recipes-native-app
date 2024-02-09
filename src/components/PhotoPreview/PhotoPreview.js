import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

export default function PhotoPreview({ uri }) {
  return (
    <View>
      <Image style={styles.categoriesPhoto} source={{ uri: uri }} />
    </View>
  );
}
