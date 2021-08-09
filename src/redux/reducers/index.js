import { combineReducers } from 'redux'
import { reducer as form, FormStateMap } from 'redux-form';
import productReducer from './productReducer'
import loginReducer from './loginReducer'
import categorieReducer from './categorieReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'

export default combineReducers({
    products: productReducer,
    users: loginReducer,
    categories: categorieReducer,
    cart: cartReducer,
    order: orderReducer,
    form,
})