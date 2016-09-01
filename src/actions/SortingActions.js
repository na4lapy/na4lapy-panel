export const SET_SORTING = 'SET_SORTING';

export const setSorting = (sortingKey) => {
  return {
    type: SET_SORTING,
    sortingKey
  };
};
