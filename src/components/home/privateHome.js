import '../../styles/home.css'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postProduct, updateProduct } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom'
import { isAuth, logOut} from '../../redux/actions/loginActions'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import { CSSTransition } from 'react-transition-group'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


class privateHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      setAnchorEl: null
    }
  }
  handleClick = (event) => {
    this.setState({
      setAnchorEl: event.currentTarget
    })
  }
  handleClose = () => {
    this.setState({
      setAnchorEl:null
    })
  }
  capturarDatos() {
    const productToUpdate = this.props.products.find(
      product => product._id === this.props.productSelected
    )
    return {
      tittle: productToUpdate.tittle,
      description: productToUpdate.description,
      availableSize: productToUpdate.availableSize,
      price: productToUpdate.price
    }
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
          open={Boolean(this.anchorEl)}
          onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
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
        <hr />
        <div className='row'>
          <div className='categoriesPrivate'>
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
          <DropDownItem  goToMenu='products'>Mis Productos</DropDownItem>
          <DropDownItem>Cerrar Sesión</DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'products'} unmountOnExit timeout={500} className='menu-secondary'>
        <div className='menu'>
          <DropDownItem leftIcon={<ArrowBackOutlinedIcon/>}  goToMenu='main'>Volver</DropDownItem>
          <DropDownItem>Agregar Product</DropDownItem>
          <DropDownItem>Modificar Producto</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  )
  
}

const mapStateToProps = state => {
  return {
    products: state.products.items,
    name: state.users.user,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    productSelected: state.products.productSelected,
    isAdmin: state.users.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, updateProduct, isAuth, logOut },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(privateHome)
