import {
    FETCH_PRODUCTS,
    ADD_PRODUCT_PENDING,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    SET_SELECTED_PRODUCT_ID,
    ORDER_PRODUCTS_BY_PRICE
 } from '../actions/types'

const initialState = {
    items: [],
    filteredItems: [],
    error: null,
    isLoading: false,
    message: undefined
}

export default function ( state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS:
        return {
            ...state,
            items: action.payload,
            filteredItems: action.payload,
            adminActions: false
        }
        case ADD_PRODUCT_PENDING:
        return {
            ...state,
            isLoading: true
        }
        case ADD_PRODUCT_SUCCESS: {
        const newProduct = action.payload.product.data
        const products = [...state.items, newProduct]
            return {
                ...state,
                isLoading: false,
                items: products
            }
        }
        case ADD_PRODUCT_ERROR:
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