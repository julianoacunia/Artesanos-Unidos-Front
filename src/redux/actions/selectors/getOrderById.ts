import { createSelector } from 'reselect';

const getOrdersFromParam = (state: any, id: any) => id;
const getOrders = (state: any) => state.order.items || [];

export const getSelectedOrderById = createSelector(
  [
    getOrders,
    getOrdersFromParam,
  ],
  (
    list,
    selected,
  ): any | undefined => {
    return list.find((i: any) => i._id === selected);
  },
);