import '../../styles/login.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { loginAccount } from '../../redux/actions/loginActions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import ErrorAlert from '../alerts/errorAlert'
import { BeatLoader } from 'react-spinners'

class login extends Component {
  constructor(props) {
    super(props)
    this.getLogin = this.getLogin.bind(this)
  }
  //COMPARE VALUES WITH DATABASE
  getLogin = values => {
    console.log(this.props)
    this.props.loginAccount(values).then(response => {
      console.log(response)
      if (this.props.isAuth) {
        this.props.history.push('/privateHome')
      }
    })
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
          </div>
        </div>
        {this.props.AlertMessege=='error' ?
        <ErrorAlert/> : null
        }
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.getLogin}
        >
          {({ handleSubmit }) => (
            <Form 
              id='form-login'
              onSubmit={handleSubmit}
            >
              <div className='container-form' role='region' aria-label='Code Example'>
                <div id='form-group'>
                  <label className='lblLogin'>Email</label>
                  <Field
                    type='text'
                    id='inputEmail'
                    name='email'
                    placeholder='Enter email'
                  />
                  <small className='smlEmail'>We'll never share your email with anyone else.</small>
                </div>
                <div id='form-group'>
                  <label className='lblLogin'>Contraseña</label>
                  <Field
                    type='password'
                    id='inputPassword'
                    name='password'
                    placeholder='Password'
                  />
                </div>
                {this.props.isLoading ?  (
                  <button
                  type='submit'
                  id='buttonLogin'
                  className='buttonLogin'
                  disabled
                  >
                  <BeatLoader color={'white'}/> 
                  <span>Loading...</span>
                </button> ) : (
                  <button
                  type='submit'
                  id='buttonLogin'
                  className='buttonLogin'
                >
                  Iniciar
                </button> 
                )}        
                </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    isLoading: state.users.isLoading,
    isAuth: state.users.isAuth,
    isAdmin: state.users.isAdmin,
    failedLogin: state.users.failedLogin,
    AlertMessege: state.users.AlertMessege
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
