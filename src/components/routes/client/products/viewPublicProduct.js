import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Product from '../../../shared/product-card/publicProduct'
import { Form, Formik, Field } from 'formik'
import { fetchCategories } from '../../../../redux/actions/categorieActions'
import { setProductCategory } from '../../../../redux/actions/productActions'
import css from './products.module.css';
import Filter from './filterProducts';

const renderProduct = () => <div className={css.containerProduct}><Product /></div>;
const renderFilter = () => <div className={css.containerFilter}><Filter /></div>;

const renderComponents = () => {
  return (
    <div className={css.container}>
      <div className={css.filter}>{renderFilter()}</div>
      <div className={css.product}>{renderProduct()}</div>
    </div>
  );
}
class viewPublicProduct extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  render() {
    return (
      <div className={css.rowProduct}>
        {renderComponents()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    product: state.products.items,
    categories: state.categories.items
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCategories, setProductCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(viewPublicProduct)
