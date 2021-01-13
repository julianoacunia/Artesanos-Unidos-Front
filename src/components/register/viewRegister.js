import '../../styles/register.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postUser } from '../../redux/actions/loginActions'
import { ClipLoader } from 'react-spinners'
import SuccessPopUp  from '../modals/successPopUp'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

class register extends Component {
  constructor () {
    super()
    this.state = {
      isModalOpen: false
    }
  }
  setModalIsOpen(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    console.log(this.state.isModalOpen)
    return (
        <>
        <SuccessPopUp isModalOpen={this.state.isModalOpen} redirect={() =>
        this.props.history.push('/login')
        }/>
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
        <div className='main-register'>
          <div className='register-container'>
            <div className='title-register'>
              <p className='title-p'>Completá tus datos</p>
            </div>
            <Card className='register-card'>
            <Formik
              initialValues={{ name: '', lastName: '', dni:'', email: '', password: '', isAdmin: ''}}
              onSubmit={values => {
                this.props.postUser(values).then(res => {
                  if (res.type === 'ADD_USER_SUCCESS') {
                    this.setModalIsOpen()
                  }
                })
              }}
            >
              {({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px'
                  }}
                >
                  <div className='name-lastname'>
                    <Field type='text' name='name' id='inputUser' placeholder='Nombre'/>
                    <Field type='text' name='lastName' id='inputLastName' placeholder='Apellido'/>
                  </div>
                  <div className='dni'>
                    <Field type='text' name='dni' id='inputUser' placeholder='Dni'/>
                  </div>
                  <div className='email-password'>
                  <Field type='text' name='email' id='inputEmail-register' placeholder='Email'/>
                  <Field type='password' name='password' id='inputPassword-register' placeholder='Contraseña'/>
                  </div>
                  <div className='rd-form'>
                    <label>Proveedor:</label>
                    <Field type= 'radio'name='isAdmin'id='proveedor-radio' value={'true'}/>
                    <label>Artesano:</label>
                    <Field type= 'radio'name='isAdmin'id='artesano-radio' value={'false'}/>
                  </div>
                  <div className='register-buttons'>
                  {!this.props.isLoading ? (
                  <Button id='submitButton' type='submit' variant="contained" color="primary" component="span">Registrarse ahora</Button>
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
            </Card>
          </div>
          <div className='link'>
            <p className='redirect-p'>Usted esta registrado?</p>
            <Link to='/login' id='redirect-login'>Ingresa</Link>
          </div>
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
