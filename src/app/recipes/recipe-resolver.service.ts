import { RecipeService } from './recipe.service'
import { Recipe } from 'src/app/models/recipe.model'
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { DataStorageService } from '../services/data-storage.service'

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes
    }
  }
}
