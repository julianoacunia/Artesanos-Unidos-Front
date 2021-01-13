import '../../styles/home.css'
import '../../styles/formProduct.css'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import { postProduct } from '../../redux/actions/productActions'
import { fetchCategories } from '../../redux/actions/categorieActions'
import { Link } from 'react-router-dom'
import { isAuth, logOut } from '../../redux/actions/loginActions'
import { TextField } from 'formik-material-ui'
import { Select } from 'formik-material-ui'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

class formProduct extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  fileSelectedHandler = event => {
    console.log(event.target.files[0])
  }
  handleChange = (event) => {
    this.setState({
      currency: this.props.category_name
    })
  }

  selectCategory = (e) => {
      const category = this.props.categories.find(method => method.id === e.target.value);
      setSelectedCategory(category);
  };

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
              <Link to='/privateHome'>Inicio</Link>
            </div>
            <div className='productMenu'>
              <Link to='/privateProduct'>Productos</Link>
            </div>
            <div className='categorieMenu'>
              <Link to='categoriePrivate'>Categorias</Link>
            </div>
            <div className='basketMenu'>
              <Link to='basket'>Carrito</Link>
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
                  tittle: '',
                  description: '',
                  price: 0,
                  stock: 0,
                  img:'',
                  category_name:''
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
                    <Field component={TextField}  name='tittle' className='product-tittle' label="Titulo" placeholder="Titulo" variant='outlined'/>
                    <Field component={TextField}  name='description' className='product-description' label="Descripción" placeholder="Descripción"  variant="outlined"/>
                    <Field component={TextField}  name='price' className='product-price' label="Precio" placeholder="Precio"  variant="outlined"/>
                    <Field component={TextField}  name='stock' className='product-stock' label="Stock" placeholder="Stock"  variant="outlined"/>
                    <input name='img' accept="image/*" id="contained-button-file" multiple type="file"/>
                    <label name='img' htmlFor="contained-button-file">
                      <Button name='img' variant="contained" color="primary" component="span">
                        Upload
                      </Button>
                    </label>
                    <FormControl>
                    <Field
                      component={Select}
                      className='product-select'
                      label="Categorias"
                      placeholder='Categorias'
                      name='category_name'
                      helperText="Debe seleccionar una categoria"
                      variant="outlined"
                      >
                        {this.props.categories.map((category) => (
                          <MenuItem className='category-select' value={category.category_name}>
                            {category.name}
                          </MenuItem>
                      ))}
                    </Field>
                    </FormControl>
                    </div>
                    <Button variant="contained" color="primary" type='submit'>Guardar</Button>
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

const [selectedCategory, setSelectedCategory] = useState()

const mapStateToProps = state => {
  return {
    products: state.products.items,
    name: state.users.user,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    productSelected: state.products.productSelected,
    userId: state.users.userId,
    categories: state.categories.items,
    category_name: state.categories.category_name
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, isAuth, logOut, fetchCategories },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(formProduct)
