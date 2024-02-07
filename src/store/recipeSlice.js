import { createSlice } from '@reduxjs/toolkit';
import { recipes } from '../../src/data/dataArrays';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: { recipes: recipes },
  reducers: {
    addRecipe: (state, action) => {
      console.log('new recipe' + action.payload);
      state.recipes.push(action.payload);
    },
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;