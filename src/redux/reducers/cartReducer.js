import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

const initialState = { items: [], lenght: 0}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
        return {
            items: action.payload.cartItems,
            length: action.payload.cartItems.lenght
        }
        case REMOVE_FROM_CART:
        return {
            items: action.payload.cartItems
        }
      default:
        return state
    }
}
  