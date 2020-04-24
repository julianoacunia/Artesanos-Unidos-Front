import '../../styles/productPrivate.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {  isAuth, logOut } from '../../redux/actions/loginActions'
import Product from './privateProduct'

class viewProductPrivate extends Component {
    render() {
        return (
            <div className='container'>
                <div className='tittle'>
                    <h1>E-commerce-Acuña</h1>
                </div>
                {this.props.isAuth ? (
                    <div className='logged'>
                        <div className='options'>
                            <div className='homeMenu'>
                                <Link to='home'>Home</Link>
                            </div>
                            <div className='productMenu'>
                                <Link to='/productPrivate'>Product</Link>
                            </div>
                            <div className='categorieMenu'>
                                <Link to='categoriePrivate'>Categorie</Link>
                            </div>
                            <div className='basketMenu'>
                                <Link to='basket'>Cart</Link>
                            </div>
                        </div>
                        <div className='buttonSession'>
                            <div className='adminsession'>{this.props.name}</div>
                            <div className='buttonmenu'>
                                <Link to='/login' onClick={this.props.logOut}>Logout</Link>
                            </div>
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
                <div className='row'>
                    <div className='col-md-8'>
                        <Product />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        cart: state.cart,
        isLoading: state.isLoading,
        name: state.users.user,
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ isAuth, logOut}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(viewProductPrivate)
