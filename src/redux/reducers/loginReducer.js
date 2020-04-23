import {
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    IS_AUTH,
    USER_LOGOUT,
    ADD_USER_PENDING,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    FETCH_USERS
} from '../actions/types'

const initialState = {
    isAuth: false,
    users: [],
    name: undefined,
    error: null,
    isLoading: false,
    message: undefined,
    logged: false,
    token: '',
    failedLogin: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                token: action.payload.token
            }
        case USER_LOGOUT:
            return {
              state: initialState
            }
            case LOGIN_USER_PENDING:
                return {
                  ...state,
                  isLoading: true,
                  failedLogin: false
                }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                isAuth: true,
                user: action.payload.user.name
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                failedLogin: true
            }
        case FETCH_USERS:
        return {
          ...state,
          users: action.payload
        }
        default:
            return state
    }
}