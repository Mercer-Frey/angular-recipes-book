import { Ingridient } from './../../models/ingridient.model'
import { Action } from '@ngrx/store'

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT'
export const ADD_INGRIDIENTS = 'ADD_INGRIDIENTS'
export const UPDATE_INGRIDIENT = 'UPDATE_INGRIDIENT'
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT'

export class AddIngridient implements Action {
  readonly type = ADD_INGRIDIENT
  constructor(public payload: Ingridient) {}
}
export class AddIngridients implements Action {
  readonly type = ADD_INGRIDIENTS
  constructor(public payload: Ingridient[]) {}
}
export class UpdateIngridient implements Action {
  readonly type = UPDATE_INGRIDIENT
  constructor(public payload: { index: number; ingridient: Ingridient }) {}
}
export class DeleteIngridient implements Action {
  readonly type = DELETE_INGRIDIENT
  constructor(public payload: { index: number }) {}
}
export type ShoppingListActions =
  | AddIngridient
  | AddIngridients
  | UpdateIngridient
  | DeleteIngridient
