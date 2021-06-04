import { createSelector } from 'reselect';

const getCategories = (state: any) => state.categories.items || [];

export const getCategoriesAsOptions = createSelector(
  [getCategories],
  (categories) => {
    return categories.map((category: any) => ({
      value: category.name,
      label: category.name
    }));
  },
);