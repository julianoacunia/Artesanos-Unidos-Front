import { combineReducers } from 'redux'
import productReducer from './productReducer'
import loginReducer from './loginReducer'
import categorieReducer from './categorieReducer'

export default combineReducers({
    products: productReducer,
    users: loginReducer,
    categories: categorieReducer
})