import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from './cart';
import { removeFromCart } from '../../../../redux/actions/cartActions'
import { setMercadoPagoPreferences } from '../../../../redux/actions/mercadoPagoActions'
import { postOrder } from '../../../../redux/actions/orderActions';

export interface StateProps {
  cartItems: any;
  isAuth: boolean;
  user: any;
}

const mapStateToProps = (state: any) => {
  return {
    cartItems: state.cart.items,
    isAuth: state.users.isAuth,
    user: state.users.user,
  }
}

export interface DispatchProps {
  removeFromCart: typeof removeFromCart;
  setMercadoPagoPreferences: typeof setMercadoPagoPreferences;
  postOrder: typeof postOrder;
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    removeFromCart,
    setMercadoPagoPreferences,
    postOrder,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
export type ReduxProps = StateProps & DispatchProps;