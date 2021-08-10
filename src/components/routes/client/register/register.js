import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postUser } from '../../../../redux/actions/loginActions'
import { ClipLoader } from 'react-spinners'
import SuccessPopUp from '../modals/successPopUp'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import css from './register.module.css';

class register extends Component {
  constructor() {
    super()
    this.state = {
      isModalOpen: false
    }
  }
  setModalIsOpen() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    return (
      <>
        {/* <SuccessPopUp isModalOpen={this.state.isModalOpen} redirect={() =>
          this.props.history.push('/login')
        } /> */}
        <div className={css.mainRegister}>
          <div className={css.registerContainer}>
            <div className={css.titleRegister}>
              <p className={css.titleP}>Completá tus datos</p>
            </div>
            <Card className={css.registerCard}>
              <Formik
                initialValues={{ name: '', lastName: '', dni: '', email: '', password: '', category: 'client' }}
                onSubmit={values => {
                  this.props.postUser(values).then(res => {
                    if (res.type === 'ADD_USER_SUCCESS') {
                      // this.setModalIsOpen()
                      this.props.history.push('/login')
                    }
                  })
                }}
              >
                {({ values, handleSubmit }) => (
                  <Form onSubmit={handleSubmit} style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px'
                  }}
                  >
                    <div className={css.nameLastName}>
                      <Field type='text' name='name' id={css.inputUser} placeholder='Nombre' />
                      <Field type='text' name='lastName' id={css.inputLastName} placeholder='Apellido' />
                    </div>
                    <div className={css.dni}>
                      <Field type='text' name='dni' id={css.inputDni} placeholder='Dni' />
                    </div>
                    <div className={css.emailPassword}>
                      <Field type='text' name='email' id={css.inputEmailRegister} placeholder='Email' />
                      <Field type='password' name='password' id={css.inputPasswordRegister} placeholder='Contraseña' />
                    </div>
                    <div className={css.rdForm}>
                      <label>Proveedor:</label>
                      <Field type='radio' name='category' id={css.proveedorRadio} value={'admin'} />
                      <label>Artesano:</label>
                      <Field type='radio' name='category' id={css.artesanoRadio} value={'client'} />
                    </div>
                    <div className={css.registerButtons}>
                      {!this.props.isLoading ? (
                        <Button id={css.submitButton} type='submit'>Registrarse ahora</Button>
                      ) : (
                        <ClipLoader size={50} color={'black'} loading />
                      )}
                      <div className={css.badCredentials1}>
                        {this.props.failedRegister ? (
                          <div id={css.badCredentials}>Debe completar el formulario</div>
                        ) : null}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
          <div className={css.link}>
            <p className={css.redirectP}>Usted esta registrado?</p>
            <Link to='/login' id='redirect-login'>Ingresa</Link>
          </div>
        </div>
      </>
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
