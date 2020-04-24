import '../../styles/register.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postUser } from '../../redux/actions/loginActions'

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
            initialValues={{ name: '', email: '', password: '', address: '' }}
            onSubmit={values => {
              this.props.postUser(values)
            }}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Field
                  type='text'
                  name='name'
                  id='inputUser'
                  placeholder='name'
                />
                <Field
                  type='text'
                  name='email'
                  id='inputEmail'
                  placeholder='email'
                />
                <Field
                  type='password'
                  name='password'
                  id='inputPassword'
                  placeholder='password'
                />
                <Field
                  type='text'
                  name='address'
                  id='inputAddress'
                  placeholder='address'
                />
                <button id='submitButton' type='submit'>
                  Submit
                </button>
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
  isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(register)
