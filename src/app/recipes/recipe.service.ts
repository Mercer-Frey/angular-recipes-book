import { Subject } from 'rxjs'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Ingridient } from './../models/ingridient.model'
import { Recipe } from '../models/recipe.model'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = []
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice()
  }
  getRecipe(id: number) {
    return this.recipes[id]
  }
  addIngridientsToShoppingList(ingridients: Ingridient[]) {
    console.log(ingridients)

    this.store.dispatch(new ShoppingListActions.AddIngridients(ingridients))
    // this.slService.addIngridients(ingridients)
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(i: number, newRecipe: Recipe) {
    this.recipes[i] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }
  deleteRecipe(i: number) {
    this.recipes.splice(i, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
