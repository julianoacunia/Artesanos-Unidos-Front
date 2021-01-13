import '../../styles/home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { postCategories } from '../../redux/actions/categorieActions'

class viewCategorie extends Component {
  render() {
    return (
      <div className='container'>
        <div className='header'>
          <div className='title'>
            <h1 className='text1'>Artesanos</h1>
            <h1 className='text3'>Unidos</h1>
          </div>
          <div className='publicity'>
            <div className='publicity-mr'>
            </div>
          </div>
        </div>
        <div className='logged'>
          <div className='options'>
            <div className='homeMenu'>
              <Link to='/publicHome'>Inicio</Link>
            </div>
            <div className='productMenu'>
              <Link to='/publicProduct'>Productos</Link>
            </div>
            <div className='categorieMenu'>
              <Link to='/categorie'>Categorias</Link>
            </div>
            <div>
            <div className='basketMenu'>
              <Link to='/cart'>Carrito</Link>
            </div>
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
        <div className='row-categorie'>
          <div className='col-md-8'>
          </div>
          <div id='col-md-4'>
              <div className='form-categorie'>
              <Formik
                initialValues={{
                  photo: 'https://via.placeholder.com/150',
                  name: '',
                  description: ''
                }}
                onSubmit={values => {
                  this.props.postCategories(values)
                }}
              >
                {({ values,handleSubmit }) => (
                  <Form 
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column'}}>
                    <div className='container-form'>
                    <Field id='categorie-name' type='text' name='name' placeholder='Nombre'/>
                    <Field id='categorie-description' type='text' name='description' placeholder='Descripción'/>
                    </div>
                    <button id='btn-form' type='submit'>Submit</button>
                    <pre>{JSON.stringify(values,null,2)}</pre>
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
    categories: state.categories.items,
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postCategories }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(viewCategorie)
