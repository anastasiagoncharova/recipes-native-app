import { createSlice } from '@reduxjs/toolkit';
import { recipes } from '../../src/data/dataArrays';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: { recipes: recipes },
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
  },
});

export const { addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;