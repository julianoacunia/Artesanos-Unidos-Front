import React, { useEffect } from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '../../../shared/table';
import { ModalKey, FormMode } from '../../../../enums';
import RefreshButton from '../../../shared/form/refresh-button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { ReduxProps } from '.';
import css from './orders.module.css';

const ellipsisStyles: React.CSSProperties = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '12ch'
};

const cols: any[] = [
  {
    title: 'Cliente',
    field: 'client.name',
    cellStyle: ellipsisStyles,
  },
  {
    title: 'Total',
    field: 'total',
    cellStyle: ellipsisStyles,
    render: (rowData: any) => `$${rowData.total}`
  },
  {
    title: 'Fecha',
    field: 'date',
    cellStyle: ellipsisStyles,
  },
];

const Orders: React.FC<ReduxProps> = (props) => {
  const {
    getOrders,
    user,
  } = props;

  const history = useHistory();


  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <div className={css.container}>
        <div className={css.mainTitle}>
          <div test-id="title-brand-page">
            Ventas
		      </div>
          <RefreshButton
            onClick={getOrders}
            disabled={props.isFetching}
          />
        </div>
        <div className={css.pageDivider} />
        <div className={css.containerPaper}>
          <div className={css.paper}>
            <Paper>
              <Table
                columns={cols}
                data={props.order}
                loading={props.isFetching}
                options={{
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: `Brands ${moment().format('YYYY-MM-DD')}`,
                }}
                onRowClick={(event, rowData: any) => {
                  history.push(`/admin/order/${rowData._id}`, {
                    mode: FormMode.VIEW,
                    title: 'Detalle de orden'
                  });
                }}
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;