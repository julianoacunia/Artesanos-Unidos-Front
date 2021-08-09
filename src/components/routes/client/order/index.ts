import Component from './order';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setMercadoPagoPreferences } from '../../../../redux/actions/mercadoPagoActions';
import { postOrder } from '../../../../redux/actions/orderActions';
import { removeAllFromCart } from '../../../../redux/actions/cartActions';

export interface StateProps {
  user: any;
  isAuth: boolean;
  cartItems: any;
}

export interface DispatchProps {
  setMercadoPagoPreferences: typeof setMercadoPagoPreferences;
  postOrder: typeof postOrder;
  removeAllFromCart: typeof removeAllFromCart;
}

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  isAuth: state.users.isAuth,
  cartItems: state.cart.items,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setMercadoPagoPreferences,
    postOrder,
    removeAllFromCart,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;