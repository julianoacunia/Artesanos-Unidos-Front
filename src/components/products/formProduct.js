import '../../styles/home.css'
import '../../styles/formProduct.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import { postProduct } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom'
import { isAuth, logOut } from '../../redux/actions/loginActions'


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
        <div className='form-add'>
            <h4>Agregar nuevo producto</h4>
            <div className='form-container'>
              <Formik
                initialValues={{
                  photo: 'https://via.placeholder.com/150',
                  tittle: '',
                  description: '',
                  price: 0,
                  stock: 0,
                  img:''
                }}
                onSubmit={values => {
                  const id = this.props.userId
                  const newProduct = {
                    ...values,
                    userId: id
                  }
                  this.props.postProduct(newProduct).then(res => {
                    if (res.type === 'ADD_PRODUCT_SUCCESS') {
                      this.props.history.push('/privateProduct')
                    }
                  })
                }}
              >
                {({ values,handleSubmit }) => (
                  <Form 
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column'}}>
                    <div className='container-form'>
                    <Field id='title-register' type='text' name='tittle' placeholder='Titulo'/>
                    <Field id='register-description' type='text' name='description' placeholder='Descripción'/>
                    <Field id='register-price' type='number' name='price' placeholder='Precio' />
                    <Field id='register-stock' type='number' name='stock' placeholder='Stock' />
                    <Field id='register-img' type='text' name='img' placeholder='Imagen' />
                    </div>
                    <button id='btn-form' type='submit'>Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.items,
    name: state.users.user,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    productSelected: state.products.productSelected,
    userId: state.users.userId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, isAuth, logOut },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(formProduct)