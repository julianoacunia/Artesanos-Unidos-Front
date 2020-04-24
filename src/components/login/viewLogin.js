import '../../styles/login.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { loginAccount } from '../../redux/actions/loginActions'
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
