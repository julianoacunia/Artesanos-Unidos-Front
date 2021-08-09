// import '../../styles/login.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { loginAccount } from '../../../../redux/actions/loginActions'
import { bindActionCreators } from 'redux'
import ErrorAlert from '../alerts/errorAlert'
import { BeatLoader } from 'react-spinners'
import css from './login.module.css'

class login extends Component {
  constructor(props) {
    super(props)
    this.getLogin = this.getLogin.bind(this)
  }
  //COMPARE VALUES WITH DATABASE
  getLogin = values => {
    this.props.loginAccount(values).then(response => {
      if (response.payload.user.category === 'admin') {
        console.log('ENTRE AL IF')
        return this.props.history.push('/admin/products');
      } else {
        console.log('ENTRE AL SEGUNDO IF')
        return this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <div className={css.loginContainer}>
        {this.props.AlertMessege === 'error' ?
          <ErrorAlert /> : null
        }
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.getLogin}
        >
          {({ handleSubmit }) => (
            <Form
              className={css.formLogin}
              onSubmit={handleSubmit}
            >
              <div className={css.containerForm} role='region' aria-label='Code Example'>
                <div className={css.formGroup}>
                  <label className={css.lblLogin}>Email</label>
                  <Field
                    type='text'
                    className={css.inputEmail}
                    name='email'
                    placeholder='Enter email'
                  />
                  <small className={css.smlEmail}>We'll never share your email with anyone else.</small>
                </div>
                <div className={css.formGroup}>
                  <label className={css.lblLogin}>Contraseña</label>
                  <Field
                    type='password'
                    className={css.inputPassword}
                    name='password'
                    placeholder='Password'
                  />
                </div>
                {this.props.isLoading ? (
                  <button
                    type='submit'
                    className={css.buttonLogin}
                    disabled
                  >
                    <BeatLoader color={'white'} />
                    <span>Loading...</span>
                  </button>) : (
                  <button
                    type='submit'
                    className={css.buttonLogin}
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
    failedLogin: state.users.failedLogin,
    AlertMessege: state.users.AlertMessege
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
