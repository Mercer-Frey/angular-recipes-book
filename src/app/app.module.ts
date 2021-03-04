import { DataStorageService } from './services/data-storage.service'
import { RecipeResolverService } from './recipes/recipe-resolver.service'
import { RecipeService } from './recipes/recipe.service'
import { ShoppingListService } from './shopping-list/shopping-list.service'
import { AuthService } from './auth/auth.service'
import { CoreModule } from './core.module'
import { SharedModule } from './shared/shared.module'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { AlertComponent } from './shared/alert/alert.component'
import { StoreModule } from '@ngrx/store'
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    CoreModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
  providers: [
    AuthService,
    ShoppingListService,
    RecipeService,
    RecipeResolverService,
    DataStorageService,
  ],
})
export class AppModule {}
