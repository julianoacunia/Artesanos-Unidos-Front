import '../../styles/home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import { postProduct, fetchProducts } from '../../redux/actions/productActions'
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
                  id: '',
                  photo: 'https://via.placeholder.com/150',
                  tittle: '',
                  description: '',
                  price: 0,
                  stock: 0,
                  img:''
                }}
                onSubmit={values => {
                  this.props.postProduct(values)
                  this.props.fetchProducts()
                }}
              >
                {({ values,handleSubmit }) => (
                  <Form 
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column'}}>
                    <Field type='text' name='id' placeholder='Codigo' />
                    <Field type='text' name='tittle' placeholder='Titulo'/>
                    <Field type='text' name='description' placeholder='Descripción'/>
                    <Field type='number' name='price' placeholder='Precio' />
                    <Field type='number' name='stock' placeholder='Stock' />
                    <Field type='text' name='img' placeholder='Imagen' />
                    <button id='btn-form' type='submit'>Submit</button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
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
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, isAuth, logOut, fetchProducts },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(formProduct)
