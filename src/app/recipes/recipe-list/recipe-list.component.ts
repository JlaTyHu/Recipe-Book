import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { map, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => {
        return recipesState.recipes;
    }))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
