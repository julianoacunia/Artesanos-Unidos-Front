import '../../styles/productHandler.css'
import React, { Component } from 'react'
import util from '../../helpers/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {
  fetchProductById,
  deleteProduct,
  setProductOnForm
} from '../../redux/actions/productActions'

class privateProduct extends Component {
  componentDidMount() {
    this.props.fetchProductById(this.props.userId)
  }
  render() {
    const productItems = this.props.products.map(product => (
      <div className='product-private'>
        <div className='thumbnail-text-center'>
          <a href={`#${product._id}`}>
            <img src='https://via.placeholder.com/150' alt='photo' />
            <p>{product.tittle}</p>
          </a>
          <b>{util.formatCurrency(product.price)}</b>
        </div>
          <div className='btn-product'>
          <button
            className='btn-product-handler'
            onClick={() => {if(window.confirm('Desea eliminar el producto?'))
          {this.props.deleteProduct(product._id)}}} 
          >
            Borrar Producto
          </button>
            <Link className='btn-modified' to='/modifiedProduct'>Modificar Producto</Link>
          </div>
      </div>
    ))
    return <div className='row'>{productItems}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  userId: state.users.userId
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchProductById, deleteProduct, setProductOnForm },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(privateProduct)