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
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'


class publicHome extends Component {
  render() {
    const StyledBadge = withStyles((theme) => ({
      badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }))(Badge);
    const { cartItems } = this.props
    return (
      <div className='container'>
        <div className='header'>
          <div className='tittle'>
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
              <IconButton aria-label="cart" className='cart-library'>
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
                  <Link to='/cart' />
                </StyledBadge>
              </IconButton>
            </div>
            <div className='loginMenu'>
              <Link to='/login'><PersonOutlineSharpIcon /></Link>
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

const mapStateToProps = state => {
  return {
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    cartItems: state.cart.items
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicHome)
