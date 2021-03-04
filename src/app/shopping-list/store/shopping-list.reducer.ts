import * as ShoppingListActions from './shopping-list.actions'
import { Ingridient } from '../../models/ingridient.model'

export interface AppState {
  shoppingList: State
}
export interface State {
  ingridients: Ingridient[]
  aditedIngridient: Ingridient
  aditedIngridientIndex: number
}

const initialState: State = {
  ingridients: [new Ingridient('Apples', 5), new Ingridient('Tomatoes', 10)],
  aditedIngridient: null,
  aditedIngridientIndex: -1,
}
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGRIDIENT:
      return { ...state, ingridients: [...state.ingridients, action.payload] }

    case ShoppingListActions.ADD_INGRIDIENTS:
      return {
        ...state,
        ingridients: [...state.ingridients, ...action.payload],
      }

    case ShoppingListActions.UPDATE_INGRIDIENT:
      const ingrridient = state.ingridients[action.payload.index]
      const updatedIngridient = { ...ingrridient, ...action.payload.ingridient }
      const updatedIngridients = [...state.ingridients]
      updatedIngridients[action.payload.index] = updatedIngridient
      return {
        ...state,
        ingridients: updatedIngridients,
      }

    case ShoppingListActions.DELETE_INGRIDIENT:
      return {
        ...state,
        ingridients: state.ingridients.filter((_, i) => {
          return i !== action.payload.index
        }),
      }

    default:
      return state
  }
}
