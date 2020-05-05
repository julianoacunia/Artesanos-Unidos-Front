import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PublicHome from '../components/home/publicHome'
import PublicProduct from '../components/products/viewPublicProduct'
import PrivateHome from '../components/home/privateHome'
import PrivateProduct from '../components/products/viewPrivateProduct'
import Payment from '../components/payment/viewPayment'
import FormProduct from '../components/products/formProduct'
import Login from '../components/login/viewLogin'
import Register from '../components/register/viewRegister'
import Categorie from '../components/categories/viewPublicCategory'
import ProductCategory from '../components/products/categoryProduct'
import Cart from '../components/carts/viewCart'
import store from '../redux/store'

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/privateHome' component={PrivateHome} />
          <PrivateRoute exact path='/privateProduct' component={PrivateProduct} />
          <PrivateRoute exact path='/formProduct' component={FormProduct} />
          <PrivateRoute exact path='/payment' component={Payment} />
          <Route exact path='/categorie' component={Categorie}/>
          <Route exact path='/publicHome' component={PublicHome}/>
          <Route exact path='/publicProduct' component={PublicProduct}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/categoryProduct' component={ProductCategory}/>
          <Redirect from='/' to='/publicHome' />
        </Switch>
      </BrowserRouter>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().users.token ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
)

export default connect()(Routes)
