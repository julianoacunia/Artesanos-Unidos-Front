import Component from './order-details';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrderById } from '../../../../redux/actions/orderActions';
import { getSelectedOrderById } from '../../../../redux/actions/selectors';
import get from 'lodash/get';

export interface StateProps {
  user: any;
  initialValues?: any;
  selectedOrder: any;
}

export interface DispatchProps {
  getOrderById: typeof getOrderById;
}

interface OwnProps {
  match: {
    params: {
      id: any;
    },
  };
}

const mapStateToProps = (state: any, ownProps: OwnProps) => {
  let initialValues;
  const selectedOrder = getSelectedOrderById(state, get(ownProps.match, 'params.id', ''));
  if (selectedOrder) {
    initialValues = {
      ...selectedOrder
    };
  }
  return {
    selectedOrder,
    initialValues,
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getOrderById,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;