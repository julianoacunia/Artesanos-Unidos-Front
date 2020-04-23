import { combineReducers } from 'redux'
import productReducer from './productReducer'
import loginReducer from './loginReducer'
import categorieReducer from './categorieReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    products: productReducer,
    users: loginReducer,
    categories: categorieReducer,
    cart: cartReducer
})