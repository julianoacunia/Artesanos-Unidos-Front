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
            return dispatch ({ type: FETCH_CATEGORIES, payload: data})
        })
}