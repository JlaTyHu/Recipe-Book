import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Pizza',
  //     'It is a very tasty Pizza!',
  //     'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/' +
  //     'attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
  //     [
  //       new Ingredient('Meat', 5),
  //       new Ingredient('Mushroom', 10),
  //       new Ingredient('Cheese', 3)
  //     ]),
  //   new Recipe(
  //     'Burger',
  //     'It is a very tasty Burger!',
  //     'https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0001_Hamburger_Alt' +
  //     '_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off',
  //     [
  //       new Ingredient('Meat', 2),
  //       new Ingredient('Cheese', 2),
  //       new Ingredient('Ketchup', 1)
  //     ]),
  // ];
  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
