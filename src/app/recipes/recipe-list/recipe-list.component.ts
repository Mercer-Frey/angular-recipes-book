import { Subscription } from 'rxjs'
import { RecipeService } from '../recipe.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Recipe } from '../../models/recipe.model'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  subscription: Subscription
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
  }
  onRecipeNew() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
