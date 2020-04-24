import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Product from './publicProduct'

class viewProducts extends Component {
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
            <div className='logged'>
              <div className='options'>
                <div className='homeMenu'>
                  <Link to='home'>Home</Link>
                </div>
                <div className='productMenu'>
                  <Link to='/publicProduct'>Product</Link>
                </div>
                <div className='categorieMenu'>
                  <Link to='/categorie'>Categorie</Link>
                </div>
                <div className='basketMenu'>
                  <Link to='/cart'>Cart</Link>
                </div>
              </div>
              <div className='buttonSession'>
                <div className='loginMenu'>
                  <Link to='/login'>Login</Link>
                </div>
                <div className='registerMenu'> 
                  <Link to='/register'>Register</Link>
                </div>
              </div>
            </div>
        <div className='row'>
          <div className='col-md-8'>
            <Product/>
          </div>
        </div>
      </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      cart: state.cart,
      isLoading: state.isLoading,
      isAuth: state.isAuth
    }
  }
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(viewProducts)
  