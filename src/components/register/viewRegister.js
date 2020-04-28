import '../../styles/register.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postUser } from '../../redux/actions/loginActions'
import { ClipLoader } from 'react-spinners'

class register extends Component {
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
              <Link to='/publicHome'>Home</Link>
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
        <div className='register-container'>
          <Formik
            initialValues={{ name: '', lastName: '', email: '', password: '', isAdmin: ''}}
            onSubmit={values => {
              this.props.postUser(values).then(res => {
                if (res.type === 'ADD_USER_SUCCESS') {
                  this.props.history.push('/login')
                }
              })
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px'
                }}
              >
                <label>Nombre:</label>
                <Field type='text' name='name' id='inputUser' placeholder='Ingresa tu nombre'/>
                <label>Apellido:</label>
                <Field type='text' name='lastName' id='inputLastName' placeholder='Ingresa tu apellido'/>
                <label>Email:</label>
                <Field type='text' name='email' id='inputEmail' placeholder='ejemplo@hotmail.com'/>
                <label>Contraseña:</label>
                <Field type='password' name='password' id='inputPassword' placeholder='password'/>
                <label>Proveedor:</label>
                <Field type= 'radio'name='isAdmin'id='proveedor-radio' value={'true'}/>
                 <label>Artesano:</label>
                <Field type= 'radio'name='isAdmin'id='artesano-radio' value={'false'}/>
                <div className='register-buttons'>
                {!this.props.isLoading ? (
                <button id='submitButton' type='submit'>Submit</button>
                ) : (
                  <ClipLoader size={50} color={'black'} loading />
                )}
                <div className='bad-credentials-1'>
                    {this.props.failedRegister ? (
                      <div id='bad-credentials'>Debe completar el formulario</div>
                    ) : null}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  isLoading: state.users.isLoading,
  isAdmin: state.users.isAdmin,
  failedRegister: state.users.failedRegister
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(register)
