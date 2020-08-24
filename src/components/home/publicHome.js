import '../../styles/home.css'
import '../../styles/menu.css'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { CSSTransition } from 'react-transition-group'
import { makeStyles } from '@material-ui/core'

class publicHome extends Component {
  render() {
    console.log(this.props.numberCart)
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
            <div>
            </div>
          </div>
          <div className='buttonSession'>
            <div className='basketMenu'>
              <Link to='/cart' className='basket'><ShoppingCartOutlinedIcon/></Link>
              <div className='basket-number'>{this.props.numberCart}</div>
            </div>
            <div className='loginMenu'>
              <Link to='/login'><PersonOutlineSharpIcon/></Link>
            </div>
          </div>
        </div>
        <div className='main'>
          <div className='body'>
            <h1 className='title-welcome'>Bienvenido a Artesanos Unidos</h1>
            <p className='p-title'>El mejor sitio para crear tu artesania.</p>
          </div>
          <div className='buttons-body'>
            <div className='btn-body'>
              <Link to='/publicProduct'>Empezar</Link>
            </div>
            <div className='btn-body-r'>
              <Link to='/register'>Registrarse</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function NavBar(props) {
  return(
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}
function NavItem(props) {
  const [open, setOpen] = useState(false)
  return(
    <li className='nav-item'>
      <a className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}
function DropDownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeigth, setMenuHeight] = useState(null)
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  function DropDownItem(props) { 
    return(
      <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
    <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }
  return(
    <div className='dropdown' style={{ height: menuHeigth}}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} className='menu-primary' onEnter={calcHeight}>
        <div className='menu'>
          <DropDownItem>My Profile</DropDownItem>
          <DropDownItem leftIcon={<ShoppingCartOutlinedIcon/>} rightIcon={<ShoppingCartOutlinedIcon/>} goToMenu='settings'>Mis Productos</DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} className='menu-secondary'>
        <div className='menu'>
          <DropDownItem leftIcon={<ShoppingCartOutlinedIcon/>} goToMenu='main'>Mi perfil</DropDownItem>
          <DropDownItem>Cuenta</DropDownItem>
          <DropDownItem>contraseña</DropDownItem>
          <DropDownItem>blablabla</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  )
  
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    numberCart: state.cart.lenght
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicHome)
