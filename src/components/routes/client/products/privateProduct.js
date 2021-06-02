import '../../styles/productHandler.css'
import React, { Component } from 'react'
import util from '../../helpers/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {
  fetchProductById,
  deleteProduct,
  setProductOnForm
} from '../../redux/actions/productActions'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class privateProduct extends Component {
  componentDidMount() {
    this.props.fetchProductById(this.props.userId)
  }
  render() {
    const productItems = this.props.products.map(product => (
      <Card className='product-card'>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height='140px'
          title="Contemplative Reptile"
        />
        <CardContent className='card-content'>
          <Typography gutterBottom variant="h5" component="h2">
            {product.tittle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {util.formatCurrency(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button color='primary' onClick={()=> {
            if(window.confirm('Desea eliminar el producto?'))
          // {this.props.deleteProduct(product._id)}}} size="small" color="primary">
          Borrar Producto
        </Button> */}
        <Button color='primary'>
          <Link to='modifiedProduct' className='modified-link'>Modificar Producto</Link>
        </Button>
      </CardActions>
    </Card>
    ))
    return <div className='row'>{productItems}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  userId: state.users.userId
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchProductById, deleteProduct, setProductOnForm },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(privateProduct)