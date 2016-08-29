export const SET_FILTER = 'SET_FILTER';

export const setFilter = (name, value) => {
  return {
    type: SET_FILTER,
    name,
    value
  };
};
