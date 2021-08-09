import React, { Component } from 'react'
import util from '../../../helpers/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addToCart } from '../../../redux/actions/cartActions'
import { fetchProducts } from '../../../redux/actions/productActions'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import css from './product.module.css'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

class publicProduct extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const filterProducts = this.props.categoryName !== 'TODOS' ?
      this.props.products.filter(product => (product.category_name === this.props.categoryName)) :
      this.props.products;
    const productItems = filterProducts.map(product => (
      <Card className={css.productCard}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`http://localhost:5000/${product.img}`}
            alt={product.title}
            height='170px'
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="body2" component="p">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {util.formatCurrency(product.price)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => this.props.addToCart(this.props.cartItems, product)}
            size="small"
            color="primary">
            Agregar al carrito
          </Button>
        </CardActions>
      </Card>
    ))
    return <div className={css.productPaper}>{productItems}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  cartItems: state.cart.items,
  isAuth: state.users.isAuth,
  categoryName: state.products.categoryName
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addToCart, fetchProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicProduct)