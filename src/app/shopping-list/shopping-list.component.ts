import { ShoppingListService } from './shopping-list.service'
import { Ingridient } from '../models/ingridient.model'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromShoppingList from './store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Observable<{ ingridients: Ingridient[] }>
  // private igChangeSub: Subscription
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingridients = this.store.select('shoppingList')
    // this.ingridients = this.slService.getIngridients()
    // this.igChangeSub = this.slService.ingridientsChange.subscribe(
    //   (updateIngridients: Ingridient[]) => {
    //     this.ingridients = updateIngridients
    //   }
    // )
  }
  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe()
  }
  onEditItem(i: number) {
    this.slService.startedEditing.next(i)
  }
}
