import '../../styles/product.css'
import React, { Component } from 'react'
import util from '../../helpers/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../../redux/actions/productActions'
import { addToCart } from '../../redux/actions/cartActions'

class publicProduct extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const productItems = this.props.products.map(product => (
      <div className='product-container' key={product._id}>
        <div className='thumbnail-text-center'>
          <a 
            className='name-product'
            href={`#${product._id}`}
            onClick={() => this.props.addToCart(this.props.cartItems, product)}
          >
            <img src='https://via.placeholder.com/150' alt='photo' />
            <p id='name-product'>{product.tittle}</p>
          </a>
          <b>{util.formatCurrency(product.price)}</b>
          
          <button
            className='btn btn-primary'
            onClick={()=> {
             {this.props.addToCart(this.props.cartItems, product)}
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    ))
    return <div className='row'>{productItems}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  cartItems: state.cart.items,
  isAuth: state.users.isAuth
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addToCart, fetchProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicProduct)