import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '../../../shared/table';
import { ModalKey, FormMode } from '../../../../enums';
import RefreshButton from '../../../shared/form/refresh-button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { ReduxProps } from '.';
import css from './products.module.css';
import {
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from '../../../../redux/actions/types';

const ellipsisStyles: React.CSSProperties = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '12ch'
};

const cols: any[] = [
  {
    title: 'Nombre',
    field: 'title',
    cellStyle: ellipsisStyles,
  },
  {
    title: 'Descripción',
    field: 'description',
    cellStyle: ellipsisStyles,
  },
  {
    title: 'Precio',
    field: 'price',
    cellStyle: ellipsisStyles,
    render: (rowData: any) => `$${rowData.price}`
  },
];

const Product: React.FC<ReduxProps> = (props) => {

  const {
    // showModal,
    getProductByProviderId,
    deleteProduct,
    fetchProducts,
    user,
  } = props;

  const history = useHistory();

  useEffect(() => {
    getProductByProviderId(user._id);
  }, [getProductByProviderId]);

  const getProducts = useCallback(() => {
    getProductByProviderId(user._id);
  }, [getProductByProviderId]);

  const handleDeleteBrand = async (productId: string) => {
    const response: any = await deleteProduct(productId);
    if (response.type === DELETE_PRODUCT_ERROR) {
      if (response.payload.subCode) {
        // return props.showModal(ModalKey.ERROR, {
        //   title: 'Error',
        //   message: response.payload.message,
        // });
      }
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.mainTitle}>
          <div test-id="title-brand-page">
            Productos
		      </div>
          <RefreshButton
            onClick={() => getProducts}
            disabled={props.isFetching}
          />
        </div>
        <div className={css.pageDivider} />
        <div className={css.containerPaper}>
          <div className={css.paper}>
            <Paper>
              <Table
                columns={cols}
                data={props.products}
                loading={props.isFetching}
                options={{
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: `Brands ${moment().format('YYYY-MM-DD')}`,
                }}
                onRowClick={(event, rowData: any) => {
                  history.push(`/admin/product/${rowData._id}`, {
                    mode: FormMode.VIEW,
                    title: 'Detalle Marca'
                  });
                }}
                actions={
                  [
                    (rowData: any) => {
                      return {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData: any) => {
                          history.push(`/admin/product/${rowData.id}`, {
                            mode: FormMode.EDIT,
                            title: 'Editar Marca',
                          });
                        }
                      };
                    },
                    (rowData: any) => {
                      return {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData: any) => {
                          // showModal(
                          //   ModalKey.CONFIRM_MODAL,
                          //   {
                          //     onConfirmCallback: () => { handleDeleteBrand(rowData.id); },
                          //     message: `¿Estás seguro que deseas eliminar la marca "${rowData.name}"?`
                          //   });
                        }
                      };
                    }
                  ]
                }
              />
            </Paper>
          </div>
        </div>
        <div className={css.fabButtonContainer} >
          <Fab
            test-id="btn-add-brand"
            onClick={() => {
              history.push('/admin/product/new', {
                mode: FormMode.ADD,
                title: 'Agregar Marca'
              });
            }}
            className={css.fabButton}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default Product;
