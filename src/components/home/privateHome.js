import '../../styles/home.css'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postProduct, updateProduct } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom'
import { isAuth, logOut} from '../../redux/actions/loginActions'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


class privateHome extends Component {
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
              <MenuItem><Link className='menu-myprofile' to='/profile'>Mi Perfil</Link></MenuItem>
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
        <hr />
        <div className='row-privateHome'>
          <div className='categoriesPrivate'>
          </div>
        </div>
      </div>
    )
  }
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
