import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CategoryPickerModal from './CategoryPickerModal/CategoryPickerModal';

export default function Category({ children, setCategory }) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  function openCategoryModal() {
    setCategoryModalOpen(true);
  }

  function closeCategoryModal() {
    setCategoryModalOpen(false);
  }

  function selectCategory(categoryId) {
    setCategory(categoryId);
  }

  return (
    <View>
      <CategoryPickerModal
        onSelectCategory={selectCategory}
        visible={isCategoryModalOpen}
        onClose={closeCategoryModal}
      />
      <TouchableOpacity onPress={openCategoryModal}>{children}</TouchableOpacity>
    </View>
  );
}
