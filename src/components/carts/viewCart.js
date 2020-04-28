import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import { postProduct } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom'
import { isAuth, logOut } from '../../redux/actions/loginActions'
import Cart from './cart'


class formProduct extends Component {
  render() {
    return (
      <div className='container'>
        <div className='header'>
          <div className='title'>
            <h1>Artesanos Unidos</h1>
          </div>
          <div className='publicity'>
            <div className='publicity-mr'>
            </div>
          </div>
        </div>
        {this.props.isAuth ? (
        <div className='logged'>
          <div className='options'>
            <div className='homeMenu'>
              <Link to='/privateHome'>Home</Link>
            </div>
            <div className='productMenu'>
              <Link to='/privateProduct'>Product</Link>
            </div>
            <div className='categorieMenu'>
              <Link to='categoriePrivate'>Categorie</Link>
            </div>
            <div className='basketMenu'>
              <Link to='basket'>Basket</Link>
            </div>
          </div>
          <div className='buttonSession'>
            <div className='adminsession'>{this.props.name}</div>
            <div className='my-product'>
              <Link to='/privateProduct'>Mis Productos</Link>
            </div>
            <div className='buttonmenu'>
              <Link to='/login' onClick={this.props.logOut}>Logout</Link>
            </div>
          </div>
        </div>
        ) : (
          <div id='login2'>
            <div className='buttonmenu'>
              <Link to='/register'>Sign up</Link>
            </div>
            <div className='buttonmenu'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
        )}
        <hr />
        <div className='row'>
            <Cart/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    productSelected: state.products.productSelected,
    CartItem: state.Cart.CartItem
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, isAuth, logOut },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(formProduct)
