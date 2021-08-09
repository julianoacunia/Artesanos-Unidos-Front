import React from 'react';
import MaterialTable, {
  Column,
  Action,
  Components,
  Localization,
  MTableBodyRow,
  MTableEditRow,
  MaterialTableProps,
} from 'material-table';
import moment from 'moment';
import { getColor } from '../../../helpers/utils';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { ColumnTypes } from '.';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

type MyLocalization = Localization & {
  body: {
    bulkEditTooltip?: React.ReactNode;
    bulkEditApprove?: React.ReactNode;
    bulkEditCancel?: React.ReactNode;
  }
};

type RowData = any;

export interface CustomColumn {
  title: string | React.ReactElement<any>;
  hidden?: boolean;
  export?: boolean;
  field: string;
  type?: ColumnTypes;
  formatDate?: string;
  customSort?: (a: RowData, b: RowData) => number;
  cellStyle?: React.CSSProperties;
  fieldImage?: React.ReactNode;
}

interface Props {
  columns: CustomColumn[];
  data: RowData[];
  loading: boolean;
  onRowClick?: (event?: React.MouseEvent, rowData?: RowData, toggleDetailPanel?: (panelIndex?: number) => void) => void;
  actions?: Array<Action<any> | ((rowData: any) => Action<any>)>;
  showActions?: boolean;
  editable?: MaterialTableProps<RowData>['editable'];
  options?: MaterialTableProps<RowData>['options'];
  localization?: MyLocalization;
  components?: Components;
}

const defaultLocalization = {
  body: {
    emptyDataSourceMessage: 'No hay datos para mostrar',
  },
  toolbar: {
    searchPlaceholder: 'Buscar',
    searchTooltip: 'Buscar'
  },
  header: {
    actions: 'Acciones'
  },
  pagination: {
    labelRowsSelect: 'Filas',
    firstTooltip: 'Página inicial',
    previousTooltip: 'Página Anterior',
    nextTooltip: 'Página Siguiente',
    lastTooltip: 'Página final',
    labelDisplayedRows: '{from}-{to} de {count}'
  }
};

const defaultOptions = {
  headerStyle: {
    backgroundColor: getColor('--color-white'),
    fontWeight: 600,
  },
  actionsCellStyle: {
    paddingRight: 30,
  },
  paginationType: 'normal',
  pageSize: 10,
  paging: true,
  pageSizeOptions: [],
  actionsColumnIndex: -1,
  rowStyle: (rowData: RowData) => ({
    backgroundColor: (rowData.hasOwnProperty('isActive') && !rowData.isActive)
      ? getColor('--color-lightgrey')
      : getColor('--color-white')
  }),
};

export const Table: React.FC<Props> = (props) => {
  /*
    Be sure to set a formatDate for each date value in the columns.
    Otherwise, the sortable function will not work correctly.
  */
  const columns: Array<Column<any>> = React.useMemo(() => props.columns.map(col => {
    const { title, formatDate, field, type, cellStyle, ...rest } = col;
    let { customSort } = col;
    switch (type) {
      case ColumnTypes.DATE:
        if (formatDate) {
          customSort = (a: any, b: any) => {
            return moment(moment(a[field], [formatDate]))
              .isBefore(moment(b[field], [formatDate]))
              ? 1
              : -1;
          };
        }
        break;
      case ColumnTypes.MONEY:
        customSort = (a: any, b: any) =>
          parseInt(a[field].replace(/\D/g, ''), 10) > parseInt(b[field].replace(/\D/g, ''), 10) ? 1 : -1;
        break;
    }
    return {
      title,
      field,
      customSort,
      headerStyle: { whiteSpace: 'nowrap' },
      cellStyle: {
        whiteSpace: 'nowrap',
        ...cellStyle,
      },
      ...rest,
    };
  }), [props.columns]);

  return (
    <div test-id="table">
      <MaterialTable
        // https://github.com/mbrn/material-table/issues/1480#issuecomment-603815777
        key={props.data.length}
        isLoading={props.loading}
        columns={columns}
        // https://github.com/mbrn/material-table/issues/414#issuecomment-480328589
        data={props.data.map(x => ({ ...x }))}
        onRowClick={props.onRowClick}
        title={' '}
        // make a copy of defaultOptions to prevent mutations
        options={merge({ ...defaultOptions }, props.options)}

        actions={props.showActions ? props.actions : undefined}
        editable={props.showActions ? props.editable : undefined}
        components={{
          // https://github.com/mbrn/material-table/issues/2304#issuecomment-672054239
          EditRow: (tableProps) => {
            return (
              <MTableEditRow
                {...{
                  ...tableProps,
                  onBulkEditRowChanged:
                    typeof tableProps.onBulkEditRowChanged === 'function'
                      ? tableProps.onBulkEditRowChanged : () => ({}),
                }}
              />
            );
          },
          // ---
          Row: (props) => (
            <MTableBodyRow
              {...props}
              test-id={get(props, 'data.id', `row-${props.index}`)}
            />),
          ...props.components
        }}
        localization={merge({ ...defaultLocalization }, props.localization)}
      />
    </div>
  );
};

export default Table;