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
        case ADD_CATEGORIE_PENDING:
        return {
            ...state,
            isLoading: true
        }
        case ADD_CATEGORIE_SUCCESS: {
        const newCategorie = action.payload.categorie.data
        const categories = [...state.items, newCategorie]
            return {
                ...state,
                isLoading: false,
                items: categories
            }
        }
        case ADD_CATEGORIE_ERROR:
        return {
            ...state,
            isLoading: false,
            error: action.error,
            message: action.payload.message
        }
        default:
        return state
    }
}