import '../../styles/profile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { isAuth } from '../../redux/actions/loginActions'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField'

class viewProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
          anchorEl: false
        }
      }
      handleClick = (event) => {
        this.setState({
          anchorEl: true
        })
      }
      handleClose = () => {
        this.setState({
          anchorEl: false
        })
      }
    render(){
        return (
            <div className='container'>
        <div className='header'>
          <div className='tittle'>
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
          </div>
          <div className='buttonSession'>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
            <AccountCircleOutlinedIcon  className='log-user'/>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.anchorEl}
            keepMounted
            open={this.state.anchorEl}
            onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
              <MenuItem><Link className='menu-product' to='/privateProduct'>Mis Productos</Link></MenuItem>
              <MenuItem><Link className='menu-logout' to='/login' onClick={this.props.logOut}>Logout</Link></MenuItem>
          </Menu>
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
        <div className='row-profile'>
            <div className='tittle-profile'>
                <h1>Mis Datos</h1>
            </div>
            <div className='accordion-email-password'>
                <h2 className='account-data'>Datos de cuenta</h2>
                <Accordion className='style-accordion'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Email</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='option-name-lastName'>
                        <TextField id="outlined-basic" className='email-textField' label="Email" variant="outlined" value={this.props.email}></TextField>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='style-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Contraseña</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='password-accordion'>
                    <div className='option-password'>
                    <TextField id="outlined-basic" className='name-textField' label="Contraseña" variant="outlined" value={this.props.password}></TextField>
                    </div>
                    <div className='option-button-password'>
                      <Button variant="contained" color='primary'>Guardar</Button>
                    </div>
                  </div>
                </AccordionDetails>
            </Accordion>
            </div>
        <div className='accordion-name-lastName'>
            <h2 className='personal-data'>Datos personales</h2>
            <Accordion className='style-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Nombre y Apellido</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='option-name-lastName'>
                    <TextField id="outlined-basic" className='name-textField' label="Nombre" variant="outlined" value={this.props.name}></TextField>
                    <TextField id="outlined-basic" className='lastName-textField' label="Apellido" variant="outlined" value={this.props.lastName}></TextField>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className='style-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Documento</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='option-name-lastName'>
                        <TextField id="outlined-basic" className='name-textField' label="Documento" variant="outlined" value={this.props.dni}></TextField>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
        </div>
      </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        name: state.users.user,
        lastName: state.users.userLastName,
        dni: state.users.userDni,
        email: state.users.userEmail,
        password: state.users.userPassword
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      { isAuth },
      dispatch
    )
  }

export default connect(mapStateToProps, mapDispatchToProps)(viewProfile)