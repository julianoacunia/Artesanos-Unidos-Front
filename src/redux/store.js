import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'cart'],
  stateReconciler: autoMergeLevel2,
};

const middleware = [thunk]

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store);

export default store;