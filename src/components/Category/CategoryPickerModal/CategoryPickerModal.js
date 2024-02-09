import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import { categories } from '../../../data/dataArrays';

export default function CategoryPickerModal({ onSelectCategory, visible, onClose }) {
  function handleCategoryPress(category) {
    onSelectCategory(category.id);
    onClose();
  }

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a category</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => `${item.id}`}
          />
          <TouchableHighlight onPress={onClose} underlayColor='#ffffff'>
            <Text style={styles.closeButton}>Close Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
