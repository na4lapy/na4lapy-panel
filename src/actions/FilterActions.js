export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

export const setFilter = (name, value) => {
  return {
    type: SET_FILTER,
    name,
    value
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER
  };
};
