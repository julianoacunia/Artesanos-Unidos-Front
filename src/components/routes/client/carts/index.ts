import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from './cart';
import { removeFromCart } from '../../../../redux/actions/cartActions'
import { setMercadoPagoPreferences } from '../../../../redux/actions/mercadoPagoActions'

export interface StateProps {
  cartItems: any;
}

const mapStateToProps = (state: any) => {
  return {
    cartItems: state.cart.items,
  }
}

export interface DispatchProps {
  removeFromCart: typeof removeFromCart;
  setMercadoPagoPreferences: typeof setMercadoPagoPreferences;
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    removeFromCart,
    setMercadoPagoPreferences,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
export type ReduxProps = StateProps & DispatchProps;