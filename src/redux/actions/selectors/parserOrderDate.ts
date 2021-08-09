import moment from 'moment';
import { createSelector } from 'reselect';

const getOrders = (state: any) => state.order.items || [];

export const parserOrderDate = createSelector(
  [getOrders], (orders,): any | undefined => {
    return orders.map((order: any) => (
      {
        ...order,
        date: moment(order.date).format('DD-MM-YYYY')
      }
    ))
  },
);