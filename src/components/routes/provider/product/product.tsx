import React, { useEffect } from 'react'
// import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
// import { TextField } from 'formik-material-ui'
// import { Select } from 'formik-material-ui'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import css from './products.module.css';
import { ReduxProps } from '.';
import { Field } from 'redux-form';
import TextField from '../../../shared/form/text-field';
import ImageField from '../../../shared/form/image-field';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';
import {
  required,
} from '../../../../helpers/form/validators';

const FormProduct: React.FC<ReduxProps> = (props) => {
  const {
    fetchCategories,
    categoryList,
    handleSubmit,
    selectedProduct,
  } = props;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // componentDidMount() {
  //   this.props.fetchCategories()
  // }
  // fileSelectedHandler = event => {
  //   console.log(event.target.files[0])
  // }
  // handleChange = (event) => {
  //   this.setState({
  //     currency: this.props.category_name
  //   })
  // }

  // const [selectedCategory, setSelectedCategory] = useState()


  // selectCategory = (e) => {
  //     const category = this.props.categories.find(method => method.id === e.target.value);
  //     setSelectedCategory(category);
  // };
  const history = useHistory();

  return (
    <div className={css.container}>
      <div className={css.form}>
        <h4>Agregar nuevo producto</h4>
        <div className={css.formContainer}>
          <div className={css.containerField}>
            <Field
              name="title"
              label="Título"
              component={TextField}
              validate={[required()]}
            />
          </div>
          <div className={css.containerField}>
            <Field
              name="description"
              label="Descripción"
              component={TextField}
              required={true}
            />
          </div>
          <div className={css.containerField}>
            <Field
              name="price"
              label="Precio"
              component={TextField}
              required={true}
            />
          </div>
          <div className={css.containerField}>
            <Field
              name="stock"
              label="Stock"
              component={TextField}
              required={true}
            />
          </div>
          <div className={css.containerField}>
            <FormLabel className={css.imagesLabel}>Imagen *</FormLabel>
            <Field
              name="stock"
              label="Stock"
              component={ImageField}
              required={true}
            />
          </div>
          {/* <div className={css.containerField}>
            <FormLabel className={css.imagesLabel}>Categoría *</FormLabel>
            <Field
              name="categoryName"
              label="Categoría *"
              component={Select}
              required={true}
            />
          </div> */}
          <div className={css.containerButton}>
            <Button className={css.cancelButton} onClick={() => history.push('/admin/products')}>
              Cancelar
            </Button>
            <Button className={css.confirmButton} onClick={handleSubmit}>
              Confirmar
            </Button>
          </div>

          {/* <Field
            name="categoryName"
            label="Categoría"
            component={Select}
            required={true}
          /> */}
          {/* <Formik
            initialValues={{
              title: '',
              description: '',
              price: 0,
              stock: 0,
              img: '',
              category_name: ''
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
            {({ values, handleSubmit, setFieldValue }) => (
              <Form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={css.columns}>
                  <Field component={TextField} name='tittle' className='product-tittle' label="Titulo" placeholder="Titulo" variant='outlined' />
                  <Field component={TextField} name='description' className='product-description' label="Descripción" placeholder="Descripción" variant="outlined" />
                  <Field component={TextField} name='price' className='product-price' label="Precio" placeholder="Precio" variant="outlined" />
                  <Field component={TextField} name='stock' className='product-stock' label="Stock" placeholder="Stock" variant="outlined" />
                  <Field type='file' name='img' onchange={event => { setFieldValue('img', event.currentTarget.files[0]) }}></Field>
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
                      {this.props.categories.map((category: any) => (
                        <MenuItem className='category-select' value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </div>
                <Button variant="contained" color="primary" type='submit'>Guardar</Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik> */}
        </div>
      </div>
    </div >
  )
}

export default FormProduct;

