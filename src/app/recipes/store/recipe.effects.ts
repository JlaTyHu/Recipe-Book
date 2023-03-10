import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map, switchMap, withLatestFrom } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.RecipeActions.FetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://angular-course-recipe-bo-34bdb-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    );
  });

  storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.RecipeActions.StoreRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put(
          'https://angular-course-recipe-bo-34bdb-default-rtdb.firebaseio.com/recipes.json',
          recipesState.recipes
        )
      })
    );
  },
    { dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
