import { ADD_TO_CART, REMOVE_FROM_CART, MERCADOPAGO_SUCCESS, MERCADOPAGO_PENDING, MERCADOPAGO_ERROR } from './types'

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

// OTRA ACCION
export const addToPayment = cartItems => {
  return dispatch => {
    dispatch({
      type: MERCADOPAGO_PENDING
    })
    const options = {
      timeout: 25000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }
    return fetch('http://localhost:5000/api/mercadoPago', options)
      .then(res => res.json())
      .then(data => {
        if (!Object.entries(data).length) {
          return Promise.reject(data)
        }
        return dispatch({
          type: MERCADOPAGO_SUCCESS,
          payload: {
            product: data
          }
        })
      })
      .catch(error => {
        return dispatch({
          type: MERCADOPAGO_ERROR,
          payload: error
        })
      })
  }
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
