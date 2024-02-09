import { StyleSheet, Dimensions } from 'react-native';
import { RecipeCard } from '../../../AppStyles';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const RECIPE_ITEM_MARGIN = 60;

const styles = StyleSheet.create({
  container: RecipeCard.container,
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN - 20),
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  categoryContainer: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default styles;
