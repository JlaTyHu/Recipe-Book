import { Action } from "@ngrx/store";

import { Recipe } from "../recipe.model";

export enum RecipeActions {
  SetRecipes = '[Recipes] Set Recipes',
  FetchRecipes = '[Recipes] Fetch Recipes',
  AddRecipe = '[Recipe] Add Recipe',
  UpdateRecipe = '[Recipe] Update Recipe',
  DeleteRecipe = '[Recipe] Delete Recipe',
  StoreRecipes = '[Recipes] Store Recipes'
}

export class SetRecipes implements Action {
  readonly type = RecipeActions.SetRecipes;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipeActions.FetchRecipes;
}

export class AddRecipe implements Action {
  readonly type = RecipeActions.AddRecipe;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActions.UpdateRecipe;

  constructor(public  payload: { index: number, newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActions.DeleteRecipe;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipeActions.StoreRecipes;
}

export type RecipesUnion =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
