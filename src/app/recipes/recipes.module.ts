import { CommonModule } from '@angular/common'
import { SharedModule } from './../shared/shared.module'
import { RecipesRoutingModule } from './recipes-routing.module'
import { NgModule } from '@angular/core'

import { RecipeService } from './recipe.service'
import { RecipeResolverService } from './recipe-resolver.service'

import { RecipesComponent } from './recipes.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule {}
