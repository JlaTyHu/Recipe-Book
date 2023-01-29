import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesUnion
) {
  switch (action.type) {
    case RecipesActions.RecipeActions.SetRecipes:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.RecipeActions.AddRecipe:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.RecipeActions.UpdateRecipe:
      const updatedRecipe = {
        ...state.recipes[action.payload.index ],
        ...action.payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.RecipeActions.DeleteRecipe:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
