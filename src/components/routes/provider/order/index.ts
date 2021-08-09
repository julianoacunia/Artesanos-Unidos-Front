import Component from './order';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrders } from '../../../../redux/actions/orderActions';
import { getSelectedOrderById } from '../../../../redux/actions/selectors';
import get from 'lodash/get';
import { FormNames, FormMode } from '../../../../enums';

export interface StateProps {
  isFetching: any;
  selectedOrder: any;
  user: any;
}

interface OwnProps {
  match: {
    params: {
      id: any;
    },
  };
}

export interface DispatchProps {
  getOrders: typeof getOrders;
}

const mapStateToProps = (state: any, ownProps: OwnProps) => {
  let initialValues;
  const isEditing = get(ownProps, 'history.location.state.mode') === FormMode.EDIT;
  const onlyView = get(ownProps, 'history.location.state.mode') === FormMode.VIEW;
  const selectedOrder = getSelectedOrderById(state, get(ownProps.match, 'params.id', ''));
  if (selectedOrder) {
    initialValues = {
      ...selectedOrder
    };
  }
  return {
    onlyView,
    isEditing,
    selectedOrder,
    initialValues,
    isFetching: state.products.isLoading,
    title: get(ownProps, 'history.location.state.title', ''),
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getOrders,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;