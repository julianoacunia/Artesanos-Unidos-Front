import {
  GET_ORDER_FULFILLED,
  POST_ORDER_REJECTED,
  POST_ORDER_FULFILLED,
  POST_ORDER_FETCHING,
  ORDER_CANCEL_FETCHING,
  ORDER_CANCEL_FULFILLED,
  ORDER_CANCEL_REJECTED,
} from '../actions/types'

const initialState = {
  items: [],
  error: null,
  isFetching: false,
  message: undefined,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_FULFILLED:
      return {
        ...state,
        items: action.payload,
      }
    case POST_ORDER_FETCHING:
    case ORDER_CANCEL_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case POST_ORDER_FULFILLED:
      const newOrder = action.payload.order.data
      const orders = [...state.items, newOrder]
      return {
        ...state,
        items: orders,
        isFetching: false
      }
    case ORDER_CANCEL_FULFILLED: {
      const newOrderUpdated = [...state.items]
      const orderToUpdated = newOrderUpdated.findIndex(
        ele => ele._id === action.payload._id
      )
      newOrderUpdated.splice(orderToUpdated, 1, action.payload);
      return {
        ...state,
        isFetching: false,
        items: newOrderUpdated
      }
    }
    case POST_ORDER_REJECTED:
    case ORDER_CANCEL_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        message: action.payload.message
      }
    default:
      return state
  }
}