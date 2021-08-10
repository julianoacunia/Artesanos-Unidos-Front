import Component from './forgot-password';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrderById } from '../../../../redux/actions/orderActions';
import { getSelectedOrderById } from '../../../../redux/actions/selectors';
import { forgotPassword } from '../../../../redux/actions/loginActions';
import get from 'lodash/get';
import { FormNames } from '../../../../enums';
import {
  reduxForm,
  SubmissionError,
  InjectedFormProps,
} from 'redux-form';
import { RouteComponentProps } from 'react-router-dom';
import {
  FORGOT_PASSWORD_FETCHING,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_REJECTED,
} from '../../../../redux/actions/types';

export interface ForgotPassword {
  dni: string
}

export interface StateProps {
  user: any;
  initialValues?: any;
  selectedOrder: any;
}

export interface DispatchProps {
  getOrderById: typeof getOrderById;
  forgotPassword: typeof forgotPassword;
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
    forgotPassword,
  }, dispatch);

const onSubmit = async (values: ForgotPassword, dispatch: any, props: ReduxProps) => {
  try {
    let response: any;

    const addPayload = {
      dni: values.dni,
    };
    // console.log('ADD PAYLOAD', addPayload);
    // if (props.isEditing) {
    //   const changedValues: Partial<ProductValues> = diff(props.initialValues, values);
    //   const payload = {
    //     _id: props.selectedProduct && props.selectedProduct._id,
    //     ...changedValues,
    //   };

    response = await props.forgotPassword(addPayload);

    // } else {
    //   response = await props.postProduct(addPayload);
    // }
    // if (props.isEditing) {
    //   switch (response.type) {
    //     case UPDATE_PRODUCT_ERROR:
    //       throw Error('Hubo un error al editar el producto');
    //     case UPDATE_PRODUCT_SUCCESS:
    //       return props.history.push('/admin/products');
    //   }
    // } else {
    switch (response.type) {
      case FORGOT_PASSWORD_REJECTED:
        throw Error('Hubo un error al enviar el email');
      case FORGOT_PASSWORD_FULFILLED:
        return props.history.push('/login');
    }
    // }
  }

  catch (error) {
    throw new SubmissionError({
      _error: error ? error.toString().slice(6) : 'Hubo un error',
    });
  };
};


export const reduxFormConfig = {
  form: FormNames.FORGOT_PASSWORD,
  onSubmit,
};


export default connect(mapStateToProps, (mapDispatchToProps as any))(reduxForm(reduxFormConfig)(Component as any) as any);
type Props = StateProps & DispatchProps & RouteComponentProps;
export type ReduxProps = Props & InjectedFormProps<ForgotPassword, Props>;