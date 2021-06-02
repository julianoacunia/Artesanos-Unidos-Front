import Component from './products';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// import { DVPState, RootAction } from 'src/redux/modules';
// import { showModal } from 'src/redux/modules/ui/actions';
// import { getPermissionsByModule } from 'src/redux/modules/admin/selectors';
// import { getBrands, logicDeleteBrand } from 'src/redux/modules/brand/thunks';
// import { ModulePermissions } from 'src/redux/modules/admin/types';
// import { AdminPermissions } from 'src/enums';
import { fetchProducts, deleteProduct } from '../../../../redux/actions/productActions';

export interface StateProps {
  isFetching: any;
  products: any;
}

export interface DispatchProps {
  fetchProducts: typeof fetchProducts;
  deleteProduct: typeof deleteProduct;
  //showModal
}

const mapStateToProps = (state: any) => ({
  isFetching: state.products.isLoading,
  products: state.products.items,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchProducts,
    deleteProduct,
    // showModal,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component as any);
export type ReduxProps = DispatchProps & StateProps;