import Component from './my-orders';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrderById, cancelOrder } from '../../../../redux/actions/orderActions';
import { parserOrderDate } from '../../../../redux/actions/selectors';

export interface StateProps {
  user: any;
  orderList: any;
  isFetching: boolean;
}

export interface DispatchProps {
  getOrderById: typeof getOrderById;
  cancelOrder: typeof cancelOrder;
}

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  orderList: parserOrderDate(state),
  isFetching: state.order.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getOrderById,
    cancelOrder,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;