import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  reduxForm,
  SubmissionError,
  InjectedFormProps,
} from 'redux-form';
import { FormNames, FormMode } from '../../../../enums';
import { fetchProducts, postProduct, updateProduct } from '../../../../redux/actions/productActions';
import get from 'lodash/get';
import Component from './product';
import diff from 'object-diff';
import { fetchCategories } from '../../../../redux/actions/categorieActions'
import { isAuth, logOut } from '../../../../redux/actions/loginActions'
import { makeFileName } from '../../../../helpers/utils';
import saveFile from '../../../../helpers/form/saveFile';
import { getSelectedProductById, getCategoriesAsOptions } from '../../../../redux/actions/selectors';
import {
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from '../../../../redux/actions/types';

export interface ProductValues {
  title: string;
  description: string;
  price: string;
  stock: string;
  img: NewImage;
  categoryName: string;
}

export interface NewImage {
  name: string;
  type?: string;
  base64?: string;
  preview?: string;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface StateProps {
  readonly title: string;
  readonly onlyView: boolean;
  readonly isEditing: boolean;
  readonly isFetching: boolean;
  readonly initialValues?: ProductValues;
  readonly selectedProduct: any;
  readonly categoryList: any;
}

const mapStateToProps = (state: any, ownProps: OwnProps) => {
  let initialValues;
  const isEditing = get(ownProps, 'history.location.state.mode') === FormMode.EDIT;
  const onlyView = get(ownProps, 'history.location.state.mode') === FormMode.VIEW;
  const selectedProduct = getSelectedProductById(state, get(ownProps.match, 'params.id', ''));
  if (onlyView || isEditing) {
    if (selectedProduct) {
      initialValues = {
        ...selectedProduct
      };
    }
  }
  return {
    onlyView,
    isEditing,
    selectedProduct,
    initialValues,
    isFetching: state.products.isLoading,
    title: get(ownProps, 'history.location.state.title', ''),
    categoryList: getCategoriesAsOptions(state),
  };
};

interface DispatchProps {
  fetchCategories: typeof fetchCategories;
  postProduct: typeof postProduct;
  isAuth: typeof isAuth;
  logOut: typeof logOut;
  updateProduct: typeof updateProduct;
  fetchProducts: typeof fetchProducts;
}

interface OwnProps {
  match: {
    params: {
      id: any;
    },
  };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    fetchCategories,
    postProduct,
    isAuth,
    logOut,
    updateProduct,
    fetchProducts,
  }, dispatch);

const onSubmit = async (values: ProductValues, dispatch: any, props: ReduxProps) => {
  try {
    let response: any;

    const addPayload = {
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
      img: values.img,
      categoryName: values.categoryName,
    };

    if (props.isEditing) {
      const changedValues: Partial<ProductValues> = diff(props.initialValues, values);
      const payload = {
        _id: props.selectedProduct && props.selectedProduct._id,
        ...changedValues,
      };

      response = await props.updateProduct(payload);

    } else {
      response = await props.postProduct(addPayload);
    }
    if (props.isEditing) {
      switch (response.type) {
        case UPDATE_PRODUCT_ERROR:
          throw Error('Hubo un error al editar el producto');
        case UPDATE_PRODUCT_SUCCESS:
          return props.history.push('/admin/products');
      }
    } else {
      switch (response.type) {
        case ADD_PRODUCT_ERROR:
          throw Error('Hubo un error al agregar el producto');
        case ADD_PRODUCT_SUCCESS:
          return props.history.push('/admin/products');
      }
    }
  }

  catch (error) {
    throw new SubmissionError({
      _error: error ? error.toString().slice(6) : 'Hubo un error',
    });
  };
};

export const reduxFormConfig = {
  form: FormNames.ADD_PRODUCT,
  onSubmit,
};

export default connect(mapStateToProps, (mapDispatchToProps as any))(reduxForm(reduxFormConfig)(Component as any) as any);
type Props = StateProps & DispatchProps & RouteComponentProps;
export type ReduxProps = Props & InjectedFormProps<ProductValues, Props>;