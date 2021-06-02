import {
  FETCH_CATEGORIES,
  ADD_CATEGORIE_PENDING,
  ADD_CATEGORIE_SUCCESS,
  ADD_CATEGORIE_ERROR,
  DELETE_CATEGORIE_PENDING,
  DELETE_CATEGORIE_SUCCESS,
  DELETE_CATEGORIE_ERROR
} from './types'
import store from '../store'

// FETCH ACTIONS
export const fetchCategories = () => dispatch => {
  fetch('http://localhost:5000/api/categories')
    .then(res => res.json())
    .then(data => {
      return dispatch({ type: FETCH_CATEGORIES, payload: data })
    })
}

// POST CATEGORIES 
export const postCategories = categorie => {
  return dispatch => {
    dispatch({
      type: ADD_CATEGORIE_PENDING
    })
    const options = {
      timeout: 25000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categorie)
    }
    return fetch('http://localhost:5000/api/categories', options)
      .then(res => res.json())
      .then(data => {
        if (!Object.entries(data).length) {
          return Promise.reject(data)
        }
        return dispatch({
          type: ADD_CATEGORIE_SUCCESS,
          payload: {
            categorie: data
          }
        })
      })
      .catch(error => {
        return dispatch({
          type: ADD_CATEGORIE_ERROR,
          payload: error
        })
      })
  }
}

// DELETE THE CATEGORIES
export const deleteCategorie = code => {
  return dispatch => {
    dispatch({
      type: DELETE_CATEGORIE_PENDING
    })
    const {
      users: { token }
    } = store.getState()
    const options = {
      timeout: 25000,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BEARER ${token}`
      }
    }
    return fetch(`http://localhost:5000/api/categories/${code}`, options)
      .then(res => res.json())
      .then(data => {
        if (!Object.entries(data).length) {
          return Promise.reject(data)
        }
        return dispatch({
          type: DELETE_CATEGORIE_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        return dispatch({
          type: DELETE_CATEGORIE_ERROR,
          payload: error
        })
      })
  }
}