import '../styles/login.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { loginAccount } from '../redux/actions/loginActions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

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
        this.props.history.push('/home')
      }
    })
  }
  render() {
    return (
      <div className='login-container'>
        <div className='tittle-login'>
          <h1>E-commerce-Acuña</h1>
        </div>
        <a className='Back-to-catalog'>
        <Link className='Back-to-catalog-link' to='/catalog'>Back to catalog</Link>
        </a>
        <Formik
          initialValues={{ name: '', password: '' }}
          onSubmit={this.getLogin}
        >
          {({ handleSubmit }) => (
            <Form 
              id='form-login'
              onSubmit={handleSubmit}
            >
              <div className='container-form'>
                <div id='login'>
                  <Field
                    type='text'
                    id='inputName'
                    name='name'
                    placeholder='name'
                  />
                  <Field
                    type='password'
                    id='inputPassword'
                    name='password'
                    placeholder='password'
                  />
                </div>
                <div id='buttonsLoginContainer'>
                  <div className='createAccount'>
                    <Link
                      id='buttonCreateAccount'
                      className='buttonLogin'
                      to='/register'
                    >
                      Create Account
                    </Link>
                  </div>
                  {!this.props.isLoading ? (
                      <button
                        type='submit'
                        id='buttonLogin'
                        className='buttonLogin'
                      >
                        Log In
                      </button>
                  ) : (
                    <ClipLoader size={75} color={'black'} loading />
                  )}
                  <div className='bad-credentials-1'>
                    {this.props.failedLogin ? (
                      <div id='bad-credentials'>Bad Credentials</div>
                    ) : null}
                  </div>
                </div>
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
    failedLogin: state.users.failedLogin
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
