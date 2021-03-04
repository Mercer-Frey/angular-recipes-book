import { map, tap } from 'rxjs/operators'
import { RecipeService } from '../recipes/recipe.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes()
    return this.http
      .put('https://recipes-5005f.firebaseio.com/recipes.json', recipes)
      .subscribe((response) => console.log(response))
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://recipes-5005f.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              ingridients: recipe.ingridients ? recipe.ingridients : [],
            }
          })
        ),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes)
        })
      )
  }
}
