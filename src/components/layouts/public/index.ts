import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from './public';
import { logOut } from '../../../redux/actions/loginActions';

export interface StateProps {
  cartItems: any;
  isAuth: boolean;
  user: any;
}

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.users.isAuth,
    cartItems: state.cart.items,
    user: state.users.user,
  }
}

export interface DispatchProps {
  logOut?: typeof logOut;
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    logOut,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
export type ReduxProps = StateProps & DispatchProps;