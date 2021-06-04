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

class publicProduct extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    // const verifyAuth = (items, product) => {
    //   if (this.props.isAuth) {
    //     this.props.addToCart(this.props.cartItems, product)
    //   } else {
    //   }
    // }

    const filterProducts = this.props.categoryName !== 'TODOS' ?
      this.props.products.filter(product => (product.category_name === this.props.categoryName)) :
      this.props.products
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
          {/* <img src={`http://localhost:5000/${product.img}`} /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
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
            Add to Cart
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