import { ADD_TO_CART, REMOVE_FROM_CART } from './types'

// ADD TO CART METHOD
export const addToCart = (items, product) => dispatch => {
    const cartItems = items.slice()
    let productAlreadyInCart = false
    cartItems.forEach(cp => {
      if (cp._id === product._id) {
        cp.count += 1
        productAlreadyInCart = true
      }
    })
    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    return dispatch({
      type: ADD_TO_CART,
      payload: {
        cartItems
      }
    })
}

//REMOVE FROM CART METHOD
export const removeFromCart = (items, product) => dispatch => {
    const cartItems = items.slice().filter(a => a._id !== product._id)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    return dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        cartItems
      }
    })
}
  