import { Ingridient } from '../models/ingridient.model'
import { Injectable, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingridientsChange = new Subject<Ingridient[]>()
  startedEditing = new Subject<number>()

  public ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10),
  ]
  constructor() {}

  getIngridients() {
    return this.ingridients.slice()
  }
  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient)
    this.ingridientsChange.next(this.ingridients.slice())
  }
  addIngridients(ingridients: Ingridient[]) {
    this.ingridients.push(...ingridients)
    this.ingridientsChange.next(this.ingridients.slice())
  }
  getIngridint(i: number) {
    return this.ingridients[i]
  }
  updateIngridient(i: number, newIngridient: Ingridient) {
    this.ingridients[i] = newIngridient
    this.ingridientsChange.next(this.ingridients.slice())
  }
  deleteIngridient(i) {
    this.ingridients.splice(i, 1)
    this.ingridientsChange.next(this.ingridients.slice())
  }
}
