import Component from './orders';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrders } from '../../../../redux/actions/orderActions';
import { parserOrderDate } from '../../../../redux/actions/selectors';

export interface StateProps {
  isFetching: any;
  order: any;
  user: any;
}

export interface DispatchProps {
  getOrders: typeof getOrders;
}

const mapStateToProps = (state: any) => ({
  isFetching: state.order.isFetching,
  order: parserOrderDate(state),
  user: state.users.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getOrders,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;