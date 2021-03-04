import { DeleteIngridient } from './../store/shopping-list.actions'
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms'
import { ShoppingListService } from '../shopping-list.service'
import { Ingridient } from '../../models/ingridient.model'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingridient
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((i: number) => {
      this.editedItemIndex = i
      this.editMode = true
      this.editedItem = this.slService.getIngridint(i)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  onSubmit(form: NgForm) {
    const value = form.value
    const newIngridient: Ingridient = new Ingridient(value.name, value.amount)
    if (this.editMode) {
      // this.slService.updateIngridient(this.editedItemIndex, newIngridient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngridient({
          index: this.editedItemIndex,
          ingridient: newIngridient,
        })
      )
    } else {
      // this.slService.addIngridient(newIngridient)
      this.store.dispatch(new ShoppingListActions.AddIngridient(newIngridient))
    }
    this.onClear()
  }
  onClear() {
    this.editMode = false
    this.slForm.reset()
  }
  onDelete() {
    this.slService.deleteIngridient(this.editedItemIndex)
    this.store.dispatch(
      new ShoppingListActions.DeleteIngridient({ index: this.editedItemIndex })
    )

    this.onClear()
  }
}
