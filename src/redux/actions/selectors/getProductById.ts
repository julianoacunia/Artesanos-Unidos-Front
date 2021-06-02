import { createSelector } from 'reselect';

const getProductFromParam = (state: any, id: any) => id;
const getProducts = (state: any) => state.products.items || [];

export const getSelectedProductById = createSelector(
  [
    getProducts,
    getProductFromParam,
  ],
  (
    list,
    selected,
  ): any | undefined => {
    return list.find((i: any) => i._id === selected);
  },
);