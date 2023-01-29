import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListUnion
) {
  switch (action.type) {
    case ShoppingListActions.ShoppingListActions.AddIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ShoppingListActions.AddIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.ShoppingListActions.UpdateIngredient:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.ShoppingListActions.DeleteIngredient:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient,index) => {
          return index !== state.editedIngredientIndex;
        })
      };
    case ShoppingListActions.ShoppingListActions.StartEdit:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.ShoppingListActions.StopEdit:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
