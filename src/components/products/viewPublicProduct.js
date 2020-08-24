import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Product from '../products/publicProduct'
import { Form, Formik, Field } from 'formik'
import { fetchCategories } from '../../redux/actions/categorieActions'
import { setProductCategory } from '../../redux/actions/productActions'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'


class viewPublicProduct extends Component {
  componentDidMount(){
    this.props.fetchCategories()
  }
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
              </div>
            </div>
            <div className='buttonSession'>
              <div className='basketMenu'>
                <Link to='/cart'><ShoppingCartOutlinedIcon/></Link>
              </div>
              <div className='loginMenu'>
                <Link to='/login'><PersonOutlineSharpIcon/></Link>
              </div>
            </div>
          </div>
        <div className='row'>
          <div className='filter-product'>
              <Formik
              initialValues={{
                    category_name:''
              }}
              onSubmit={values => {
                  this.props.setProductCategory(values.category_name)
                }}
              >
                  {({ values,handleSubmit }) => (
                  <Form 
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column'}}>
                    <div className='container-form'>
                    <Field as="select" name="category_name">
                      <option value='TODOS'>Todos</option>
                    {this.props.categories.map(category => 
                      (<option value={category.category_name}>{category.name}</option>))}
                    </Field>
                    </div>
                    <button id='btn-form' type='submit'>Submit</button>
                  </Form>
                )}
              </Formik>
          </div>
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
      isAuth: state.isAuth,
      product: state.products.items,
      categories: state.categories.items
    }
  }
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchCategories, setProductCategory }, dispatch)
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(viewPublicProduct)
  