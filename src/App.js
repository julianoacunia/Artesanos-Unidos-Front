import './App.css'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Routes from './routes/view'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
export default App

