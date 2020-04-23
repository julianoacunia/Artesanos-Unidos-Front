import {
    FETCH_CATEGORIES,
    ADD_CATEGORIE_PENDING,
    ADD_CATEGORIE_SUCCESS,
    ADD_CATEGORIE_ERROR,
    DELETE_CATEGORIE_PENDING,
    DELETE_CATEGORIE_SUCCESS,
    DELETE_CATEGORIE_ERROR
} from '../actions/types'

const initialState = {
    items: [],
    error: null,
    isLoading: false,
    message: undefined
}

export default function ( state = initialState, action) {
    switch(action.type) {
        case FETCH_CATEGORIES:
        return {
            ...state,
            items: action.payload,
            adminActions: false
        }
        default:
        return state
    }
}