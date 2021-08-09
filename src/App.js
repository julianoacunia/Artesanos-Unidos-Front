import './App.css'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import Routes from './components/routes'
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    )
  }
}
export default App

