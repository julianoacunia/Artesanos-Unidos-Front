import '../../styles/productPrivate.css'
import '../../styles/addProduct.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { isAuth, logOut } from '../../redux/actions/loginActions'
import Product from './privateProduct'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class viewProductPrivate extends Component {
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
                                <AccountCircleOutlinedIcon className='log-user' />
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
                <div className='row-private-product'>
                    <div className='col-md-8'>
                        <Product />
                    </div>
                    <div className='col-md-4'>
                        <Tooltip title="Add" aria-label="add" className='container-add'>
                            <Fab color="primary">
                                <Link to='/formProduct' className='btn-add'>+</Link>
                            </Fab>
                        </Tooltip>
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
        name: state.users.user,
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ isAuth, logOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(viewProductPrivate)
