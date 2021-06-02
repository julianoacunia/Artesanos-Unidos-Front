import '../../styles/home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Category from './category'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

class viewPublicCategory extends Component {
  render() {
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
            <Link to='/cart'><ShoppingCartOutlinedIcon/></Link>
          </div>
          <div className='loginMenu'>
            <Link to='/login'><PersonOutlineSharpIcon/></Link>
          </div>
        </div>
      </div>
        <div className='row'>
          <div className='col-md-8'>
              <Category/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(viewPublicCategory)
