import  { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export enum ShoppingListActions {
  AddIngredient = '[Shopping List] Add Ingredient',
  AddIngredients = '[Shopping List] Add Ingredients',
  UpdateIngredient = '[Shopping List] Update Ingredient',
  DeleteIngredient = '[Shopping List] Delete Ingredient',
  StartEdit = '[Shopping List] Start Edit',
  StopEdit = '[Shopping List] Stop Edit'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActions.AddIngredient;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActions.AddIngredients;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListActions.UpdateIngredient;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActions.DeleteIngredient;
}

export class StartEdit implements Action {
  readonly type = ShoppingListActions.StartEdit;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = ShoppingListActions.StopEdit;
}

export type ShoppingListUnion =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
