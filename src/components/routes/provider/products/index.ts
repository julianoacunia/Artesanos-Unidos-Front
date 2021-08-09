import Component from './products';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// import { DVPState, RootAction } from 'src/redux/modules';
// import { showModal } from 'src/redux/modules/ui/actions';
// import { getPermissionsByModule } from 'src/redux/modules/admin/selectors';
// import { getBrands, logicDeleteBrand } from 'src/redux/modules/brand/thunks';
// import { ModulePermissions } from 'src/redux/modules/admin/types';
// import { AdminPermissions } from 'src/enums';
import { fetchProducts, getProductByProviderId, deleteProduct } from '../../../../redux/actions/productActions';

export interface StateProps {
  isFetching: any;
  products: any;
  user: any;
}

export interface DispatchProps {
  getProductByProviderId: typeof getProductByProviderId;
  deleteProduct: typeof deleteProduct;
  fetchProducts: typeof fetchProducts;
  //showModal
}

const mapStateToProps = (state: any) => ({
  isFetching: state.products.isLoading,
  products: state.products.items,
  user: state.users.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getProductByProviderId,
    deleteProduct,
    fetchProducts,
    // showModal,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;