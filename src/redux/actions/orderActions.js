import {
  GET_ORDER_FULFILLED,
  POST_ORDER_FETCHING,
  POST_ORDER_FULFILLED,
  POST_ORDER_REJECTED,
  ORDER_CANCEL_REJECTED,
  ORDER_CANCEL_FETCHING,
  ORDER_CANCEL_FULFILLED,
} from './types';
import store from '../store';

export const getOrders = () => dispatch => {
  fetch('http://localhost:5000/api/order')
    .then(res => res.json())
    .then(data => {
      return dispatch({ type: GET_ORDER_FULFILLED, payload: data })
    })
}


export const getOrderById = (providerId) => dispatch => {
  fetch(`http://localhost:5000/api/order/${providerId}`)
    .then(res => res.json())
    .then(data => {
      return dispatch({ type: GET_ORDER_FULFILLED, payload: data })
    })
}

export const postOrder = order => {
  return dispatch => {
    dispatch({
      type: POST_ORDER_FETCHING
    })
    const {
      users: { token }
    } = store.getState()
    const options = {
      timeout: 25000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BEARER ${token}`
      },
      body: JSON.stringify(order)
    }
    return fetch('http://localhost:5000/api/order', options)
      .then(res => res.json())
      .then(data => {
        if (!Object.entries(data).length) {
          return Promise.reject(data)
        }
        return dispatch({
          type: POST_ORDER_FULFILLED,
          payload: {
            order: data
          }
        })
      })
      .catch(error => {
        return dispatch({
          type: POST_ORDER_REJECTED,
          payload: error
        })
      })
  }
}

// CANCEL ORDER
export const cancelOrder = (orderId) => {
  return dispatch => {
    dispatch({
      type: ORDER_CANCEL_FETCHING
    })
    const {
      users: { token }
    } = store.getState()
    const options = {
      timeout: 25000,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BEARER ${token}`
      },
    }
    return fetch(`http://localhost:5000/api/order/cancel-order/${orderId}`, options)
      .then(res => res.json())
      .then(data => {
        if (!Object.entries(data).length) {
          return Promise.reject(data)
        }
        return dispatch({
          type: ORDER_CANCEL_FULFILLED,
          payload: data
        })
      })
      .catch(error => {
        return dispatch({
          type: ORDER_CANCEL_REJECTED,
          payload: error
        })
      })
  }
}